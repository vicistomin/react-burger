import { wsSlice } from '../slices/websocket';
import { setCookie } from '../utils';
import { refreshToken } from '../slices/user';
import { USER_ORDERS_WS_URL } from '../constants';

const {
  wsConnectionStart,
  wsConnectionStop,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed
} = wsSlice.actions;

export const wsMiddleware = () => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === wsConnectionStart.type) {
        const wsUrl = payload.token ? (
          `${payload.url}?token=${payload.token}`
        ) : (
          `${payload.url}`
        );
        socket = new WebSocket(wsUrl);
      }
      
      if (type === wsConnectionStop.type) {
        // user has moved to another page
        // 1001 code fires an InvalidAccessError
        socket.close(1000, 'CLOSE_NORMAL');
      }

      if (socket) {
        socket.onopen = event => {
          dispatch(wsConnectionSuccess(event));
        };

        socket.onerror = event => {
          dispatch(wsConnectionError(event));
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          console.log(restParsedData);

          // if accessToken has gone stale we're need to refresh it first
          if (restParsedData.message && restParsedData.message === 'Invalid or missing token') {
            socket.close(1000, 'CLOSE_NORMAL');
            refreshToken()
            .then((refresh_res) => {
              if (!refresh_res.ok && refresh_res.status >= 500) {
                throw Error(refresh_res.statusText);
              }
              return refresh_res.json();
            })
            .then((refresh_data) => {
              if (refresh_data.success === true) {
                console.log(refresh_data);

                setCookie('accessToken', refresh_data.accessToken, { path: '/' });
                setCookie('refreshToken', refresh_data.refreshToken, { path: '/' });
                const wsToken = refresh_data.accessToken.replace('Bearer ', '');
                const wsUrl = `${USER_ORDERS_WS_URL}?token=${wsToken}`;
                socket = new WebSocket(wsUrl);
              }
              else {
                throw Error(refresh_data.message);
              }
            })
            .catch((error) => {
              dispatch(wsConnectionError(event));
              console.log(error);
            });

          }

          // save data with provided dispatch function
          let saveDataDispatch = getState().ws.saveDataDispatch;
          if (saveDataDispatch) {
            dispatch({
              type: saveDataDispatch,
              payload: restParsedData
            });
          }
        };

        socket.onclose = event => {
          dispatch(wsConnectionClosed(event));
        };
      }

      next(action);
    };
  };
};

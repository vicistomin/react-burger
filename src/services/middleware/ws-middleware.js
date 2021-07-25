import { wsSlice } from '../slices/websocket';

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

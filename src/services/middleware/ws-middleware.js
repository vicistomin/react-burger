import { wsSlice } from '../slices/websocket';

const {
  wsConnectionStart,
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
        socket = new WebSocket(`${payload.url}`);
        // socket = new WebSocket(`${payload.url}?token=${payload.token}`);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch(wsConnectionSuccess(event));
        };

        socket.onerror = event => {
          dispatch(wsConnectionError(event));
        };

        socket.onmessage = event => {
          console.log('new message');
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

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

export function getItems() {
  return function(dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    // getting data from API
    fetch(API_URL)  
      .then(res => {
        if (!res.ok) {
          // we don't need to set state vars here as we will do that in catch
          res.reject(res.statusText);
        }
        return res.json();
      })
      .then(({data}) => {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: data
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: GET_ITEMS_FAILED
        });
      })  
  }
}

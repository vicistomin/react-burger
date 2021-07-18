import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
// importing components from project
import Modal from '../components/modal/modal';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import Loader from '../components/loader/loader';
// import slices and their functions
import { getItems } from '../services/slices/items';
import { itemsSlice } from '../services/slices/items';

export const IngredientModalPage = () => {
  const dispatch = useDispatch();
  
  const {
    items,
    itemsRequest,
    itemsSuccess,
    itemsFailed
  } = useSelector(
    state => state.items
  );

  const { request } = itemsSlice.actions;

  // we need to have items from API in store to render ingredient
  useEffect(() => {
    // won't call API if items are already in store
    if (!itemsSuccess) {
      dispatch(getItems());
    }
  }, [dispatch, itemsSuccess]);

  let history = useHistory();

  const currentItemId = useParams().id;
  const currentItem = items.find((item) => item._id === currentItemId);

  const replaceState = useCallback(() => {
    // hiding the content on page before the reload starts
    dispatch(request())
    // remove the background element to show ingredient page instead of a modal
    history.replace({ 
      ...history.location,
      state: { background: undefined }
  });
  }, [history]);

  // return to HomePage if modal is closed
  const closeModal = () => {
    history.replace({
      pathname: `/`
    });
  }

  // handle state cleaning in case of page refresh
  useEffect(() => {
    window.addEventListener("beforeunload", replaceState);
    return () => {
      window.removeEventListener("beforeunload", replaceState);
    };
  }, []);
  
  return (
    <>
      {
        itemsRequest && 
        !itemsFailed && 
        !itemsSuccess && (
          <Loader />
      )}
      {
        itemsFailed && 
        !itemsRequest && 
        !itemsSuccess && (
          <h2 className='fullscreen_message text text_type_main-large text_color_inactive'>
            Ошибка загрузки
          </h2>
      )}
      {
        itemsSuccess && 
        !itemsFailed && 
        !itemsRequest && (
          <Modal 
            header='Детали ингредиента'
            closeModal={closeModal} >
              <IngredientDetails item={currentItem} />
          </Modal> 
      )}
  </>
  );
}

export default IngredientModalPage;

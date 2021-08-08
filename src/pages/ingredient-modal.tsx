import { FC, useEffect, useCallback } from 'react';
// importing typed hooks for Redux Toolkit
import { useAppSelector, useAppDispatch } from '../services/hooks';
import { useParams, useHistory } from 'react-router-dom';
// importing components from project
import Modal from '../components/modal/modal';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import Loader from '../components/loader/loader';
// import slices and their functions
import { itemsSlice } from '../services/slices/items';
import { IIngredient } from '../services/types';

export const IngredientModalPage: FC = () => {
  const dispatch = useAppDispatch();
  
  const {
    items,
    itemsRequest,
    itemsSuccess,
    itemsFailed
  } = useAppSelector(
    state => state.items
  );

  const { request } = itemsSlice.actions;

  const history = useHistory();

  const currentItemId: string = useParams<{ id: string }>().id;
  const currentItem: IIngredient = items.find((item) => item._id === currentItemId) || {};

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
  const closeModal = (): void => {
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
            closeModal={closeModal}
          >
            <IngredientDetails
              item={currentItem} 
            />
          </Modal> 
      )}
  </>
  );
}

export default IngredientModalPage;

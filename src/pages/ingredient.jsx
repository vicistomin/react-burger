import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// importing components from project
import AppHeader from '../components/app-header/app-header';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import Loader from '../components/loader/loader';

export const IngredientPage = () => {
  const {
    items,
    itemsRequest,
    itemsSuccess,
    itemsFailed
  } = useSelector(
    state => state.items
  );

  const currentIngredientId = useParams().id;

  return (
    <>
    <AppHeader />
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
        <div className='fullscreen_message'>
          <p className="text text_type_main-large">
            Детали ингредиента
          </p>
          <IngredientDetails
            item={items.find((item) => item._id === currentIngredientId)}
          />
        </div>
      )}
  </>
  );
}

export default IngredientPage;

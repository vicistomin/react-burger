import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import draggableConstructorElementStyles from './draggable-constructor-element.module.css';
// importing components from library
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { burgerConstructorSlice } from '../../services/slices/burger-constructor';
import { itemsSlice } from '../../services/slices/items';

function DraggableConstructorElement({ item, index }) {
  const dispatch = useDispatch();
  const { increaseQuantityValue, decreaseQuantityValue } = itemsSlice.actions;
  const { addMiddleItem, deleteMiddleItem } = burgerConstructorSlice.actions

  const [{isItemHover}, dropItemTarget] = useDrop({
      accept: ['sauce', 'main'],
      drop(item, monitor) {
          dispatch(addMiddleItem({index: index + 1, item}));
          dispatch(increaseQuantityValue(item._id));
          return ({index});
      },
      collect: monitor => ({
          isItemHover: monitor.isOver()
      })
    });
    
  const [{isFirstItemHover}, dropFirstItemTarget] = useDrop({
      accept: ['sauce', 'main'],
      drop(item, monitor) {
          dispatch(addMiddleItem({index: 0, item}));
          dispatch(increaseQuantityValue(item._id));
          return ({index});
      },
      collect: monitor => ({
          isFirstItemHover: monitor.isOver()
      })
  });

  const [{isItemDragging}, dragItemRef] = useDrag({
      type: item.type,
      item: item,
      collect: monitor => ({
          isItemDragging: monitor.isDragging()
      }),
      end(item, monitor) {
        if(monitor.didDrop()) {
          // comparing target index and source index to remove correct ingredient from array
          monitor.getDropResult().index > index ? (
            handleItemDelete(item._id, index)
          ) : (
            handleItemDelete(item._id, index + 1)
          )
        }
      }
  });

  const handleItemDelete = (itemId, index) => {   
    dispatch(deleteMiddleItem(index));
    dispatch(decreaseQuantityValue(itemId));
};

  return (
      <>
          {index === 0 ? (
              <li 
                  className={
                      `${draggableConstructorElementStyles.dropContainer}
                      ${isFirstItemHover ? draggableConstructorElementStyles.dropContainerPushed : null}`
                  }
                  ref={dropFirstItemTarget}
              >
              </li>
              ) : null
          }

          <li 
              className={
                  `${draggableConstructorElementStyles.draggable_list_item}
                  ${isItemDragging ? draggableConstructorElementStyles.hidden : null}`
                  }
              ref={dragItemRef}
          >
              <span className={draggableConstructorElementStyles.drag_icon}>
                  <DragIcon type='primary' />
              </span>
              <ConstructorElement 
                  text={item.name}
                  thumbnail={item.image}
                  price={item.price}
                  handleClose={() => 
                      handleItemDelete(item._id, index)
                  }
              />
          </li>
          <li 
              className={
                  `${draggableConstructorElementStyles.dropContainer}
                  ${isItemHover ? draggableConstructorElementStyles.dropContainerPushed : null}`
              }
              ref={dropItemTarget}
          >
          </li>
      </>
  )
}

export default DraggableConstructorElement

DraggableConstructorElement.propTypes = {
  item: PropTypes.shape({
      name: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired
};

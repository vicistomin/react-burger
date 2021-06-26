import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import draggableConstructorElementStyles from './draggable-constructor-element.module.css';
// importing components from library
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { burgerConstructorSlice } from '../../services/slices/burger-constructor';
import { itemsSlice } from '../../services/slices/items';

function DraggableConstructorElement({ item, index, handleItemDelete }) {
  const dispatch = useDispatch();
  const { increaseQuantityValue } = itemsSlice.actions;
  const { addMiddleItems } = burgerConstructorSlice.actions

  const [{isItemHover}, dropItemTarget] = useDrop({
      accept: ['sauce', 'main'],
      drop(Item) {
          // MiddleItem.index = getNewMiddleItemIndex;
          dispatch(addMiddleItems(Item));
          dispatch(increaseQuantityValue(Item._id));
      },
      collect: monitor => ({
          isItemHover: monitor.isOver()
      })
    });
    
  const [{isFirstItemHover}, dropFirstItemTarget] = useDrop({
      accept: ['sauce', 'main'],
      drop(Item) {
          // MiddleItem.index = getNewMiddleItemIndex;
          dispatch(addMiddleItems(Item));
          dispatch(increaseQuantityValue(Item._id));
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
      })
  });

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

import { FC, useRef, useEffect, useState } from 'react';
// importing typed hooks for Redux Toolkit
import { useAppDispatch } from '../../services/hooks';
import { useDrag, useDrop } from 'react-dnd';
import draggableConstructorElementStyles from './draggable-constructor-element.module.css';
// importing components from library
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { burgerConstructorSlice } from '../../services/slices/burger-constructor';
import { itemsSlice } from '../../services/slices/items';
import { IIngredient } from '../../services/types';

interface IDraggedItem {
  item: IIngredient,
  index: number
}

const DraggableConstructorElement: FC<IDraggedItem> = ({
  item,
  index
}) => {
  const dispatch = useAppDispatch();
  const { decreaseQuantityValue } = itemsSlice.actions;
  const { moveMiddleItem, deleteMiddleItem } = burgerConstructorSlice.actions

  const dndItemRef = useRef<HTMLLIElement>(null);
  const [isItemHigher, setIsItemHigher] = useState<boolean>(false);
  const [isItemLower, setIsItemLower] = useState<boolean>(false);

  const [{targetId, isItemHover, offset}, dropItemTarget] = useDrop({
      accept: 'sortedIngredient',
      drop() {
          return ({index});
      },
      collect: monitor => ({
          targetId: monitor.getHandlerId(),
          isItemHover: monitor.isOver(),
          offset: monitor.getDifferenceFromInitialOffset()
      })
    });

  const [{sourceId, isItemDragging}, dragItemSource] = useDrag({
      type: 'sortedIngredient',
      item: item,
      collect: monitor => ({
          sourceId: monitor.getHandlerId(),
          isItemDragging: monitor.isDragging()
      }),
      end(item, monitor) {
        // reorder only, not for new ingredients
        if(monitor.didDrop() && monitor.getDropResult<IDraggedItem>() !== null) {            
          dispatch(moveMiddleItem({
            oldIndex: index,
            newIndex: monitor.getDropResult<IDraggedItem>()?.index || 0
          }));
        }
      }
  });

  const handleItemDelete = (itemId: string, index: number) => {   
    dispatch(deleteMiddleItem(index));
    dispatch(decreaseQuantityValue(itemId));
  };

  useEffect(() => {
    if(!!offset) {
      setIsItemHigher(offset.y < 0);
      setIsItemLower(offset.y > 0);    
    }
  }, [offset]);

  dragItemSource(dropItemTarget(dndItemRef))

  return (
      <>
        <li 
            className={
                `${draggableConstructorElementStyles.draggable_list_item}
                ${isItemDragging ? draggableConstructorElementStyles.dragged : null}
                ${isItemHover && isItemHigher ? (
                  draggableConstructorElementStyles.pushedUp
                  ) : isItemHover && isItemLower ? (
                    draggableConstructorElementStyles.pushedDown
                  ) : null }`
                }
            ref={dndItemRef}
            data-source-id={sourceId}
            data-target-id={targetId}
        >
            <span className={draggableConstructorElementStyles.drag_icon}>
                <DragIcon type='primary' />
            </span>
            {
              !!item.name &&
              !!item.image &&
              !!item.price &&
              <ConstructorElement 
                  text={item.name}
                  thumbnail={item.image}
                  price={item.price}
                  handleClose={() => 
                    !!item._id && handleItemDelete(item._id, index)
                  }
              />
            }
        </li>
      </>
  ) 
}

export default DraggableConstructorElement

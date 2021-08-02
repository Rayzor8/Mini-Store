import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const ContentList = ({ items, handleDelete, handlerInputChange }) => {
  return (
    <ul className="items-wrapper">
      {items.map((item) => (
        <li className="item" key={item.id}>
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => handlerInputChange(item.id)}
          />
          <label
            htmlFor="item-name"
            onDoubleClick={() => handlerInputChange(item.id)}
            style={
              item.checked
                ? { color: 'green', textDecoration: 'line-through' }
                : null
            }
          >
            {item.item}
          </label>
          <FaTrashAlt
            role="button"
            tabIndex="0"
            onClick={() => handleDelete(item.id)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ContentList;

import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const AppContent = ({ title, items, handleDelete, handlerInputChange }) => {
  return (
    <main>
      <ul>
        <h1>{title}</h1>
        {items.map((item) => (
          <li key={item.id} className="item">
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
      {!items.length && <h1>Is Empty</h1>}
    </main>
  );
};

AppContent.defaultProps = {
  title: 'Default Title Props',
}; // if pass props null, set default AppContent props

export default AppContent;

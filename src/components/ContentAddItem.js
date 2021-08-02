import React, { useRef } from 'react';
import { FaPlusSquare } from 'react-icons/fa';

const ContentAddItem = ({ newItem, setNewItem, handleSubmitForm }) => {
  const inputRef = useRef();
  return (
    <form className="addForm" onSubmit={handleSubmitForm}>
      <label htmlFor="addItem">Add Item</label>
      <input
        type="text"
        autoFocus
        id="addItem"
        placeholder="Input your needs Here.."
        required
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        ref={inputRef}
      />
      <button
        type="submit"
        aria-label="Add Item"
        onClick={() => inputRef.current.focus()}
      >
        <FaPlusSquare />
      </button>
    </form>
  );
};

export default ContentAddItem;

import React from 'react';
import { FaSearch } from 'react-icons/fa';

const ContentSearchItem = ({ searchItem,setSearchItem}) => {
  return (
    <form className="search-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder="Search Here.."
        onSubmit={(e) => e.preventDefault()}
        role="searchbox"
        value={searchItem}
        onChange={e => setSearchItem(e.target.value)}
      />
      <FaSearch role="button" className="search-btn" />
    </form>
  );
};

export default ContentSearchItem;

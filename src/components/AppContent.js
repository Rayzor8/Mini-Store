import React from 'react';
import ContentList from './ContentList';

const AppContent = ({ title, items, handleDelete, handlerInputChange }) => {
  return (
    <main>
      <h1>{title}</h1>
      {items.length ? (
        <ContentList
          items={items}
          handleDelete={handleDelete}
          handlerInputChange={handlerInputChange}
        />
      ) : (
        <h1>Is Empty.. &#128517;</h1>
      )}
    </main>
  );
};

AppContent.defaultProps = {
  title: 'Default Title Props',
}; // if pass props null, set default AppContent props

export default AppContent;

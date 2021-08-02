import React from 'react';
import ContentList from './ContentList';
import ContentAddItem from './ContentAddItem';
import ContentSearchItem from './ContentSearchItem';

const AppContent = ({
  title,
  items,
  handleDelete,
  handlerInputChange,
  newItem,
  setNewItem,
  handleSubmitForm,
  searchItem,
  setSearchItem,
  setItems
}) => {
  return (
    <main>
      <ContentAddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmitForm={handleSubmitForm}
      />
      <h3>{title}</h3>
      {items.length ? (
        <>
          <ContentList
            items={items}
            handleDelete={handleDelete}
            handlerInputChange={handlerInputChange}
          />
          <ContentSearchItem
            searchItem={searchItem}
            setSearchItem={setSearchItem}
          />
        </>
      ) : (
        <>
          <h1>Is Empty.. &#128517;</h1>
        </>
      )}
      {searchItem && <button onClick={()=> window.location.href="http://localhost:3000/"}>back</button>}
    </main>
  );
};

AppContent.defaultProps = {
  title: 'Default Title Props',
}; // if pass props null, set default AppContent props

export default AppContent;

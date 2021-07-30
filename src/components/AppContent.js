import React from 'react';
import ContentList from './ContentList';
import ContentAddItem from './ContentAddItem';


const AppContent = ({ title, items, handleDelete, handlerInputChange ,newItem,setNewItem ,handleSubmitForm}) => {
  
  return (
    <main>
      <ContentAddItem newItem={newItem} setNewItem={setNewItem} handleSubmitForm={handleSubmitForm}/>
      <h4>{title}</h4>
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

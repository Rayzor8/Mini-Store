import { useState, lazy, Suspense ,useEffect} from 'react';

const [AppHeader, AppContent, AppFooter] = [
  lazy(() => import('./components/AppHeader')),
  lazy(() => import('./components/AppContent')),
  lazy(() => import('./components/AppFooter')),
];

function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shopping-list')) || []); 
  const [newItem, setNewItem] = useState('');
  const [searchItem, setSearchItem] = useState('');
  
  console.log('1st render')
  useEffect(()=>{
    console.log('useEffect Triggered')
  },[items])
  console.log('after useEffect')

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1; // find last Index and Increment by 1
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem]; // spread newItem with the rest items return new array
    setItems(listItems);
    localStorage.setItem('shopping-list', JSON.stringify(listItems));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!newItem) return; // newItem current stat = '' (empty string)
    addItem(newItem);
    setNewItem(''); // clear prev submitted value on input
  };

  const handlerInputChange = (id) => {
    // const listItems = items.map(item => item.id === id ? {...item,checked : !item.checked} : item)
    const checkItemsId = items.map((item) => {
      if (item.id === id) return { ...item, checked: !item.checked };
      return item;
    });
    setItems(checkItemsId); //modify
    localStorage.setItem('shopping-list', JSON.stringify(checkItemsId));
  };

  const handleDelete = (id) => {
    const filterID = items.filter((item) => item.id !== id); //  filter return new array selain item.id yang telah di click ,
    setItems(filterID);
    localStorage.setItem('shopping-list', JSON.stringify(filterID));
  };

  const renderLoader = () => (
    <h1 className="loader">Loading Bro...&#128522;</h1>
  );

  const itemSearch = items.filter((item) =>
    item.item.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <div className="App">
      <Suspense fallback={renderLoader()}>
        <AppHeader title="Ray Store" />
        <AppContent
          title="Item List"
          items={itemSearch}
          handleDelete={handleDelete}
          handlerInputChange={handlerInputChange}
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmitForm={handleSubmitForm}
          searchItem={searchItem}
          setSearchItem={setSearchItem}
          setItems={setItems}
        />
        <AppFooter itemsLength={items.length} />
      </Suspense>
    </div>
  );
}

export default App;

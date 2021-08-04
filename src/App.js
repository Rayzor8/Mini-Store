import { useState, lazy, Suspense, useEffect } from 'react';

const [AppHeader, AppContent, AppFooter] = [
  lazy(() => import('./components/AppHeader')),
  lazy(() => import('./components/AppContent')),
  lazy(() => import('./components/AppFooter')),
];

function App() {
  const API_URL = 'http://localhost:3500/items';
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    console.log('useEffect Triggered');

    const fetchItems = async () => {
      try {
        const getResponse = await fetch(API_URL);
        if (!getResponse.ok) throw Error('failed receive data');
        const getItems = await getResponse.json();
        console.log(getItems);
        setItems(getItems);
        setFetchError(null);
      } catch (err) {
        console.log(err.message);
        setFetchError(err.message);
      }
    };
    fetchItems();
  }, []);

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1; // find last Index and Increment by 1
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem]; // spread newItem with the rest items return new array
    setItems(listItems);
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
  };

  const handleDelete = (id) => {
    const filterID = items.filter((item) => item.id !== id); //  filter return new array selain item.id yang telah di click ,
    setItems(filterID);
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

        {fetchError && <h1 className="fetch-error">{fetchError}</h1>}
        
        {!fetchError && (

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
          
        )}
        <AppFooter itemsLength={items.length} />
      </Suspense>
    </div>
  );
}

export default App;

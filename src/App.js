import { useState, lazy, Suspense, useEffect } from 'react';
import apiRequest from './apiRequest';

const [AppHeader, AppContent, AppFooter] = [
  lazy(() => import('./components/AppHeader')),
  lazy(() => import('./components/AppContent')),
  lazy(() => import('./components/AppFooter')),
];

function App() {
  const API_URL = 'http://localhost:3500/items'; // set to port 3500
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

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1; // find last Index and Increment by 1
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem]; // spread newItem with the rest items return new array
    setItems(listItems);

    const postSettingRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(myNewItem),
    };

    const result = await apiRequest(API_URL, postSettingRequest);
    if (result) setFetchError(result);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!newItem) return; // newItem current stat = '' (empty string)
    addItem(newItem);
    setNewItem(''); // clear prev submitted value on input
  };

  const handlerInputChange = async (id) => {
    const checkItemsId = items.map((item) => {
      if (item.id === id) return { ...item, checked: !item.checked };
      return item;
    });
    setItems(checkItemsId); //modify

    const getItems = checkItemsId.filter((item) => item.id === id); // click checkbox and return filtered id

    const updateSettingRequest = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({checked:getItems[0].checked}), // search data and patch request the checked status.
    };

    const patchURL = `${API_URL}/${id}`;
    const result = await apiRequest(patchURL, updateSettingRequest);
    if (result) setFetchError(result);
  };

  const handleDelete = async (id) => {
    const filterID = items.filter((item) => item.id !== id); //  filter return new array selain item.id yang telah di click ,
    setItems(filterID);

    const deleteRequest = {
      method: 'DELETE'
    }
    const patchURL = `${API_URL}/${id}`;
    const result = await apiRequest(patchURL, deleteRequest);
    if (result) setFetchError(result);
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

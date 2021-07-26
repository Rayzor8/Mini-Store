import { useState, useEffect, lazy, Suspense } from 'react';

const [AppHeader, AppContent, AppFooter] = [
  lazy(() => import('./components/AppHeader')),
  lazy(() => import('./components/AppContent')),
  lazy(() => import('./components/AppFooter')),
];



function App() {
  const [items, setItems] = useState([
    { id: 1, checked: false, item: 'Item 1' },
    { id: 2, checked: false, item: 'Item 2' },
    { id: 3, checked: false, item: 'Item 3' },
    { id: 4, checked: false, item: 'Item 4' },
    { id: 5, checked: false, item: 'Item 5' },
  ]); // default

  useEffect(() => {
    console.log('side Effect');
    if (items.length) {
      return console.log('Length is Greater 0');
    }
    console.log('Length is less than 0');
  }, [items]); // usefull to focus render effect

  console.log('main Effect');

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

  return (
    <div className="App">
      <Suspense fallback={renderLoader()}>
        <AppHeader title="Ray Store" />
        <AppContent
          title="Item List"
          items={items}
          handleDelete={handleDelete}
          handlerInputChange={handlerInputChange}
        />
        <AppFooter />
      </Suspense>
    </div>
  );
}

export default App;

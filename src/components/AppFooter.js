const AppFooter = ({ itemsLength }) => {
  function getTodayhandler() {
    const stringDays = [
      'Sunday',
      'Monday',
      'Thuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return stringDays[new Date().getDay()];
  }

  return (
    <footer className="text-center py-2">
      <div className="footer-wrapper">
        <h1>
          Total {itemsLength <= 1 ? 'Item' : 'Items'} :{' '}
          <span>{itemsLength}</span>
        </h1>
        <p>
          <i>&copy;rayflash on {getTodayhandler()}</i>
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;

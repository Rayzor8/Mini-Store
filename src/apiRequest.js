const apiRequest = async (url = '', option = null, errorMsg = null) => {

  try {
    const response = await fetch(url, option);
    if (!response.ok) throw Error('Refresh page pls');
  } catch (err) {
    errorMsg = err.message;
  } finally {
    return errorMsg;
  }
  
};

export default apiRequest;

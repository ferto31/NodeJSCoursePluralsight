// Services to for example make an thrid party api call

function goodreadService() {
  function getBookById() {
    return new Promise((resolve, reject) => {
      resolve({ description: 'our Description' });
    });
  }
  return {
    getBookById
  }
}
module.exports = goodreadService();

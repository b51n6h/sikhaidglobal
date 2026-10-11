// Load header from header.html and insert it at the top of the page
fetch('header.html')
  .then(response => response.text())
  .then(data => {
    const headerContainer = document.createElement('div');
    headerContainer.innerHTML = data;
    document.body.insertBefore(headerContainer, document.body.firstChild);
  })
  .catch(error => console.error('Error loading header:', error));

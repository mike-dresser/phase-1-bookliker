document.addEventListener("DOMContentLoaded", function() {

    const bookList = document.querySelector('#list');
    const detailsPanel = document.querySelector('#show-panel');

    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(books => createList(books))

    function createList(books) {
        books.forEach(book => {
            let bookListItem = document.createElement('li');
            bookListItem.textContent = book.title;
            bookListItem.addEventListener('click', () => showDetails(book));
            bookList.append(bookListItem);
        })
    }

    function showDetails(book) {
        detailsPanel.innerHTML = `${book.title} \br ${book.subtitle} /br ${book.author}`
    }




});



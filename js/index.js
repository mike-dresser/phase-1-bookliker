document.addEventListener("DOMContentLoaded", function() {

    const bookList = document.querySelector('#list');
    const detailsPanel = document.querySelector('#book-details');

    const detailImage = detailsPanel.querySelector('img');
    const detailTitle = detailsPanel.querySelector('h1');
    const detailSubtitle = detailsPanel.querySelector('h2');
    const detailAuthor = detailsPanel.querySelector('h3');
    const detailDescription = detailsPanel.querySelector('p');
    const userLikeList = detailsPanel.querySelector('ul');

    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(books => {
            createList(books);
            showDetails(books[0]);
        })

    function createList(books) {
        books.forEach(book => {
            let bookListItem = document.createElement('li');
            bookListItem.textContent = book.title;
            bookListItem.addEventListener('click', () => showDetails(book));
            bookList.append(bookListItem);
        })
    }

    function showDetails(book) {
        detailImage.src = book.img_url;
        detailTitle.textContent = book.title;
        detailSubtitle.textContent = book.subtitle;
        detailDescription.textContent = book.description;
        detailAuthor.textContent = book.author;

        displayLikes(book);
    }

    function displayLikes(book) {
        userLikeList.innerHTML = '';
        
        book.users.forEach(user => {
            let userLike = document.createElement('li');
            userLike.textContent = user.username;
            userLikeList.append(userLike);
        })
    }




});



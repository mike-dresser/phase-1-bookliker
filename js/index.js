
// document.addEventListener("DOMContentLoaded", function() {
    
    
    
    const bookList = document.querySelector('#list');
    const detailsPanel = document.querySelector('#book-details');
    
    const detailImage = detailsPanel.querySelector('img');
    const detailTitle = detailsPanel.querySelector('h1');
    const detailSubtitle = detailsPanel.querySelector('h2');
    const detailAuthor = detailsPanel.querySelector('h3');
    const detailDescription = detailsPanel.querySelector('p');
    const userLikeList = detailsPanel.querySelector('ul');
    let likeButton = detailsPanel.querySelector('button');
        
    let currentUser = {};
    const CURRENT_USER_ID = 11; //  My id used for testing
  
    fetch(`http://localhost:3000/users?id=${CURRENT_USER_ID}`)
        .then(response => response.json())
        .then(user => {
            currentUser = user[0];
    });

        
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(books => {
            createList(books);
            showDetails(books[0]); 
            // Show first book by default; change to hidden with some welcome screen?
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
        initLikeButton(book);
    }

    function displayLikes(book) {
        userLikeList.innerHTML = ''; // clear previous list

        book.users.forEach(user => {
            let userLike = document.createElement('li');
            userLike.textContent = user.username;
            userLikeList.append(userLike);
        })
    }

    function initLikeButton(book) {
        likeButton.remove();
        likeButton = document.createElement('button');
        likeButton.textContent = (book.users.find(user => user.id === currentUser.id))
            ? 'Un-Like'
            : 'Like';
        likeButton.addEventListener('click', () => {
            toggleLike(book);
        });
        detailsPanel.append(likeButton);
    }

    function toggleLike(book) {
        likeButton.textContent = (likeButton.textContent === 'Like')
            ? 'Un-like'
            : 'Like';
        let newLikeObj = {users: book.users};
        if (book.users.find(user => user.id === currentUser.id)) {
                book.users.splice(book.users.indexOf(currentUser), 1);
                patchUsers(book, newLikeObj);
            } else {
                book.users.push(currentUser);
                newLikeObj.users = book.users;
                patchUsers(book, newLikeObj);
            }
    }
    
    function patchUsers(book, userObj) {
        fetch(`http://localhost:3000/books/${book.id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userObj),
        })
        .then(response => response.json())
        .then(data => {
            book.users = data.users;
            displayLikes(book);

        })

    }

// });



let bookTitle = document.querySelector(".book-title");
let isBookBorrowed = document.querySelector(".is-book-borrowed");
let showIfBorrowed = document.querySelector(".show-if-borrowed");
let bookList = document.querySelector(".bookList");

function updateBookList() {
    fetch("http://localhost:3000/library")
    .then(res => res.json())
    .then(data => {
        //console.log(data); 
        printBooks(data);
    });
}

updateBookList(); 

function printBooks(books) {

    bookList.innerHTML = "";

    books.map(book => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        const borrowBook = document.createElement("button");
        borrowBook.id = book.id;
        borrowBook.borrowed = book.borrowed;
        button.innerText = "Mer info";
        button.id = book.id;
        button.title = book.title;
        button.author = book.author;
        button.available = book.borrowed;
        button.pages = book.pages
        li.id = book.id;
        li.innerText = book.title;
        bookList.appendChild(li);
        bookList.appendChild(button);
        bookList.appendChild(borrowBook);
        
        checkIfBookIsBorrowed(book);

        button.addEventListener("click", showBookInfo);
        borrowBook.addEventListener("click", changeBookToBorrowed);

        if (book.borrowed) {
            borrowBook.innerText = "Lämna tillbaka boken";
        } else {
            borrowBook.innerText = "Låna boken";
        }
    })
}


function changeBookToBorrowed(e) {
    let bookId = {bookId:e.currentTarget.id};
    console.log(bookId);

        fetch(`http://localhost:3000/library/borrowed`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookId)
    })
    .then(data => {
        updateBookList(data);
    });
}


function checkIfBookIsBorrowed(book) {
    const pElement = document.createElement("p");
    bookList.appendChild(pElement);
    if (book.borrowed) {
        pElement.innerText = "utlånad"
    } else {
        pElement.innerText = "tillgänglig"
    }
}

function showBookInfo(e) {
    let bookId = e.currentTarget.id;
    let bookTitle = e.currentTarget.title;
    let bookAuthor = e.currentTarget.author;
    let bookAvailable = e.currentTarget.borrowed;
    let bookPages = e.currentTarget.pages;

    fetch(`http://localhost:3000/library/${bookId}`)
    .then(res => res.json())
    .then(data => {
    //console.log(data); 
    printBooks(data);
    });

    const container = document.querySelector('.book-information');
    container.innerHTML = `<h2>more information about chosen book</h2>
    <p class="info">Title: ${bookTitle}</p>
    <p class="info">Author: ${bookAuthor}</p>
    <p class="info">Pages: ${bookPages}</p>
    <p class="info">Available: ${bookAvailable}</p>`
    ;
    updateBookList();
}
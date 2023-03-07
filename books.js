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
        borrowBook.innerText = "Låna boken";
        borrowBook.id = book.id;
        borrowBook.borrowed = book.borrowed;
        button.innerText = "Mer info";
        button.id = book.id;
        li.id = book.id;
        li.innerText = book.title;
        bookList.appendChild(li);
        bookList.appendChild(button);
        bookList.appendChild(borrowBook);
        
        checkIfBookIsBorrowed(book);

        button.addEventListener("click", showBookInfo);
        borrowBook.addEventListener("click", changeBookToBorrowed);
    })
}


function changeBookToBorrowed(e) {
    let book = e.currentTarget.borrowed;
    console.log(book);
    book.borrowed === true;
    console.log(book)

        fetch("http://localhost:3000/library/borrowed", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book)
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
    let id = e.currentTarget.id;

    fetch(`http://localhost:3000/library/${id}`)
    .then(res => res.json())
    .then(data => {
    //console.log(data); 
    printBooks(data);
    });

    books.map(book => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        const borrowBook = document.createElement("button");
        borrowBook.innerText = "Låna boken";
        borrowBook.id = book.id;
        borrowBook.borrowed = book.borrowed;
        button.innerText = "Mer info";
        button.id = book.id;
        li.id = book.id;
        li.innerText = book.title;
        bookList.appendChild(li);
        bookList.appendChild(button);
        bookList.appendChild(borrowBook);
        
        checkIfBookIsBorrowed(book);

        button.addEventListener("click", showBookInfo);
        borrowBook.addEventListener("click", changeBookToBorrowed);
    })
}
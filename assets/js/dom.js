/************************** DOM ***************************/ 

/* global variables */
const UNREADED_BOOK = "incompleteBookshelfList";
const READED_BOOK = "completeBookshelfList"; 
const BOOK_ITEM_ID = "bookId";

/********************************* control book data ***********************************/

/* show book in html */
function makeBook(title, author, year, isComplete) {
    const bookTitle = document.createElement("h3");
    bookTitle.innerText = title;

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("author");
    bookAuthor.innerText = author;

    const bookYear = document.createElement("p");
    bookYear.classList.add("year");
    bookYear.innerText = year;

    console.log("*************************************");
    console.log("judul : " + title);
    console.log("penulis : " + author);
    console.log("tahun : " + year);
    console.log("sudah dibaca : " + isComplete);

    const btnAction = document.createElement("div");
    btnAction.classList.add("action");

    if (isComplete) {
        btnAction.append(unreadBook(), deleteBook());
    } else {
        btnAction.append(readedBook(), deleteBook());
    }

    const container = document.createElement("article");
    container.classList.add("book_item");
    container.append(bookTitle, bookAuthor, bookYear, btnAction);

    return container;
}

/* add book to storage */
function addBook() {
    const unreadedBook = document.getElementById(UNREADED_BOOK);
    const readedBook = document.getElementById(READED_BOOK);

    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;
    const isComplete = document.getElementById("inputBookIsComplete").checked;

    console.log("book title : " + bookTitle);
    console.log("book author : " + bookAuthor);
    console.log("year : " + bookYear);
    console.log("isComplete : " + isComplete)

    if (isComplete) {
        const bookList = makeBook(bookTitle, bookAuthor, bookYear, true);
        const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, true);
        bookList[BOOK_ITEM_ID] = bookObject.id;
        books.push(bookObject);
        readedBook.append(bookList);
        updateDataToStorage();
    } else {
        const bookList = makeBook(bookTitle, bookAuthor, bookYear, false);
        const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, false);
        bookList[BOOK_ITEM_ID] = bookObject.id;
        books.push(bookObject);
        unreadedBook.append(bookList);
        updateDataToStorage();
    }
    
}

/*************************** create behavior *****************************/

/* add book to readed shelf */
function addBookToReaded(e) {
    const readedBook = document.getElementById(READED_BOOK);
    const bookTitle = e.querySelector("h3").innerText;
    const bookAuthor = e.querySelector(".author").innerText;
    const bookYear = e.querySelector(".year").innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);

    const book = findBook(e[BOOK_ITEM_ID]);
    book.isCompleted = true;
    newBook[BOOK_ITEM_ID] = book.id;

    readedBook.append(newBook);
    e.remove();

    updateDataToStorage();
}

/* add book to unreaded shelf */
function undoBookFromReaded(e) {
    const unreadBook = document.getElementById(UNREADED_BOOK);
    const bookTitle = e.querySelector("h3").innerText;
    const bookAuthor = e.querySelector(".author").innerText;
    const bookYear = e.querySelector(".year").innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);

    const book = findBook(e[BOOK_ITEM_ID]);
    book.isCompleted = false;
    newBook[BOOK_ITEM_ID] = book.id;

    unreadBook.append(newBook);
    e.remove();

    updateDataToStorage();
}

/* delete book */
function removeBookFromReaded(e) {
    const bookPosition = findBookIndex(e[BOOK_ITEM_ID]);
    books.splice(bookPosition, 1);

    e.remove();
    updateDataToStorage();
}

/* searching book by its title */
function searchBooks(input) {
    const searchedBook = books.filter(book => book["title"].toLowerCase().includes(input.toLowerCase()));

    const unreadedBook = document.getElementById(UNREADED_BOOK);
    const readedBook = document.getElementById(READED_BOOK);
    unreadedBook.innerHTML = "";
    readedBook.innerHTML = "";

    for(book of searchedBook){
        const newBook = makeBook(book.title, book.author, book.year, book.isCompleted);
        newBook[BOOK_ITEM_ID] = book.id;

        if(book.isCompleted){
            readedBook.append(newBook);
        } else {
            unreadedBook.append(newBook);
        }
    }
}

/* keep showing books even after the page being loaded or refresh */
function refreshDataFromBooks() {
    const unreadedBook = document.getElementById(UNREADED_BOOK);
    const readedBook = document.getElementById(READED_BOOK);

    for(book of books) {
        const newBook = makeBook(book.title, book.author, book.year, book.isCompleted);
        newBook[BOOK_ITEM_ID] = book.id;

        if(book.isCompleted){
            readedBook.append(newBook);
        } else {
            unreadedBook.append(newBook);
        }
    }
}

/*************************** button area ***************************/

/* create button */
function createButton(buttonClass, buttonText, eventListener) {
    const btn = document.createElement("button");
    btn.classList.add(buttonClass);

    const btnText = document.createTextNode(buttonText);
    btn.append(btnText);

    btn.addEventListener("click", function (event) {
        eventListener(event);
    });

    return btn;
}

/* button for readed book */
function readedBook() {
    return createButton("green", "Selesai di Baca", function(event) {
        const ask = confirm("Anda yakin sudah membaca buku tersebut?");

        if(ask == true){
            alert("Buku berhasil dipindahkan ke rak sudah dibaca!");
            const readed = event.target.parentElement;
            addBookToReaded(readed.parentElement);
        } else {
            return -1;
        }
    });
}

/* button for unread book */
function unreadBook() {
    return createButton("green", "Belum Selesai di Baca", function(event){
        const ask = confirm("Anda yakin belum selesai membaca buku tersebut?");

        if(ask == true){
            alert("Buku berhasil dipindahkan ke rak belum selesai dibaca!");
            const unread = event.target.parentElement;
            undoBookFromReaded(unread.parentElement);
        } else {
            return -1;
        }
    });
}

/* button for delete book */
function deleteBook() {
    return createButton("red", "Hapus Buku", function(event){
        const ask = confirm("Anda yakin ingin menghapus buku?");

        if(ask == true){
            alert("Buku berhasil dihapus!");
            const deleteBook = event.target.parentElement;
            removeBookFromReaded(deleteBook.parentElement);
        } else {
            return -1;
        }
    });
}



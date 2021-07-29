/******************************* control web storage **********************************/

/* initialize storage key */
const STORAGE_KEY = "BOOKSHELF_APP";

/* global variables */
let books = [];

/* checking storage */
function isStorageExist() {
    if(typeof(Storage) === undefined){
        alert("Maaf, browser tidak mendukung local storage");
        return false
    }
    return true;
}

/* saving data */
function saveData() {
   const parsedData = JSON.stringify(books);
   localStorage.setItem(STORAGE_KEY, parsedData);
   document.dispatchEvent(new Event("ondatasaved"));
}

/* accessing data */
function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null) {
        books = data;
    }
    
    document.dispatchEvent(new Event("ondataloaded"));
}

/* updating data */
function updateDataToStorage() {
    if(isStorageExist())
        saveData();
}

/* composing book object */
function composeBookObject(title, author, year, isCompleted) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isCompleted
    };
}

/* finding id */
function findBook(bookId) {
    for(book of books){
        if(book.id === bookId)
            return book;
    }
    return null;
}

/* finding index */
function findBookIndex(bookId) {
    let index = 0
    for (book of books) {
        if(book.id === bookId)
            return index;
  
        index++;
    }
    return -1;
}
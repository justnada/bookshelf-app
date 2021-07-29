/********************************* main ***************************************/

/* event for loaded page */
document.addEventListener("DOMContentLoaded", function () {
    
    /* event for submitting book */
    const submitBook = document.getElementById("inputBook");
 
    submitBook.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
        alert("Buku berhasil ditambahkan!");
    });

    /* event for searching book */
    const searchBook = document.getElementById("searchBook");

    searchBook.addEventListener("submit", function (event) {
        event.preventDefault();
        const input = searchBook.querySelector("input").value;
        searchBooks(input);
    });

    /* access data if storage exist */
    if(isStorageExist()){
        loadDataFromStorage();
    }

});

/* event for saving data */
document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan!");
});

/* event for reloading or refresh data */
document.addEventListener("ondataloaded", () => {
    console.log("Data dimuat ulang!")
    refreshDataFromBooks();
});
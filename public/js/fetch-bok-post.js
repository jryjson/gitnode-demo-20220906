const elForm = document.getElementById('formBok');
const elBoktitel = document.getElementById('bokTitel');
const elBokforfattare = document.getElementById('bokForfattare');
const elBokisbn = document.getElementById('bokIsbn');
const elBokpris = document.getElementById('bokPris');
const elOutput = document.getElementById('output');

function newBook(event){
    event.preventDefault();
    let bokTitel = elBoktitel.value;
    let bokForfattare = elBokforfattare.value;
    let bokIsbn = elBokisbn.value;
    let bokPris = elBokpris.value;

// Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({bokTitel:bokTitel, bokForfattare:bokForfattare, bokIsbn:bokIsbn, bokPris:bokPris}) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

postData('http://localhost:3000/api/books')
    .then((data) => {
        console.log(data); // JSON data parsed by `response.json()` call
    });

}

elForm.addEventListener('submit', newBook, false);

/*
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
https://dev.to/devamaz/using-fetch-api-to-get-and-post--1g7d
 */
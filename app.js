// Load data
const main = () => {
    const input = document.getElementById('input');
    const inputValue = input.value;
    const link = `https://openlibrary.org/search.json?q=${inputValue}`
    if (inputValue.length < 1){
        return
    }
    spiner('block')
    fetch(link)
    .then (res => res.json())
    .then (data => transfer(data))
    document.getElementById('show').innerHTML = '';
    document.getElementById('author').innerHTML = '';
}

// Tranfer
const transfer = data => {
    console.log(data)
    const total = document.getElementById('total')
    total.innerText = data.numFound;
    const value = data.docs.slice(0,50);
    for (const book of value){
        console.log(book)
        const bookKeys = Object.keys(book);
        correction(bookKeys,book)
    }
}

// Main part
const correction = (data,data2) => {
    if(data.includes('title') && data.includes('author_name') && data.includes('author_key') && data.includes('first_publish_year') && data.includes('cover_i')){
        const title = data2.title;
        const author = data2.author_name[0];
        const authorKey = data2.author_key[0];
        const firstPublished = data2.first_publish_year;
        const cover = data2.cover_i;
        const publisher = data2.publisher;
        const showSection = document.getElementById('show');
        const newDiv = document.createElement('div');
        newDiv.classList.add('col-lg-3','col-md-4','col-sm-12');
        newDiv.innerHTML = `
        <div class="row p-3">
            <img class="col-5 img-fluid" src="https://covers.openlibrary.org/b/id/${cover}-M.jpg" alt="">
            <div class="col-7">
                <h5>Title: ${title}</h5>
                <h6>Author: ${author}</h6>
                <p>Author-Key: ${authorKey}</p>
                <button onclick="details('${authorKey}')">Author/Details</button>
                <p>First-Published: ${firstPublished}</p>
                <h6>Publisher: ${publisher}</h6>
            </div>
        </div>
        `
        
        showSection.appendChild(newDiv);
    }
    spiner('none');
}
// Author Details
const details = data => {
    document.getElementById('author').innerHTML = '';
    const link = `https://openlibrary.org/authors/${data}.json`
    fetch(link)
    .then (res => res.json())
    .then (all => author(all))
}
const author = data => {
    const section = document.getElementById('author');
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
        <h4>Name: ${data.name}</h4>
        <h4>Created: ${data.created.value}</h4>
        <h4>last_modified: ${data.last_modified.value}</h4>
        <h4>latest_revision: ${data.latest_revision}</h4>
    `
    section.appendChild(newDiv)

}
// Spinner
const spiner = value => {
    document.getElementById('spiner').style.display= value;
}
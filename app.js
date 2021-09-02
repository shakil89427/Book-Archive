// Load data
const main = () => {
    const input = document.getElementById('input');
    const inputValue = input.value;
    const link = `https://openlibrary.org/search.json?q=${inputValue}`
    if (inputValue.length < 1){
        notFound('none')
        return
    }
    error('none')
    totalProperty('none')
    spiner('block')
    notFound('none')
    document.getElementById('show').textContent = '';
    document.getElementById('author').textContent = '';
    fetch(link)
    .then (res => res.json())
    .then (data => transfer(data))
}
// Transfer
const transfer = data => {
    const total = document.getElementById('total');
    total.innerText = data.numFound;
    if (total.innerText === '0'){
        document.getElementById('input').value = '';
        spiner('none');
        error('block')
    }
    const value = data.docs.slice(0,50);
    value.forEach(book => {
        const bookKeys = Object.keys(book);
        correction(bookKeys,book)
    });
}
// Correction
const correction = (data,data2) => {
    const showSection = document.getElementById('show');
    if(data.includes('title') && data.includes('author_name') && data.includes('author_key') && data.includes('first_publish_year') && data.includes('cover_i') && data.includes('publisher')){
        const newDiv = document.createElement('div');
        newDiv.classList.add('col-lg-3','col-md-4','col-sm-12');
        newDiv.innerHTML = `
        <div class="row p-3">
            <img class="col-5 img-fluid" src="https://covers.openlibrary.org/b/id/${data2.cover_i}-M.jpg" alt="">
            <div class="col-7">
                <h5>Title: ${data2.title}</h5>
                <h6>Author: ${data2.author_name[0]}</h6>
                <p>Author-Key: ${data2.author_key[0]}</p>
                <button onclick="details('${data2.author_key[0]}')">Author/Details</button>
                <p>First-Published: ${data2.first_publish_year}</p>
                <p>Publisher: ${data2.publisher[0]}</p>
            </div>
        </div>
        `
         showSection.appendChild(newDiv);
    }
    document.getElementById('input').value = '';
    totalProperty('block')
    spiner('none');
}
// Author/Details
const details = data => {
    notFound('none')
    document.getElementById('author').textContent = '';
    const link = `https://openlibrary.org/authors/${data}.json`
    fetch(link)
    .then (res => res.json())
    .then (all => author(all))
}
// Author Transfer
const author = data => {
    const datakey = Object.keys(data)
    const section = document.getElementById('author');
    if (datakey.includes('name') && datakey.includes('created') && datakey.includes('last_modified') && datakey.includes('latest_revision')){
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <h5>Name: ${data.name}</h4>
        <p>Created: ${data.created.value}</p>
        <p>last_modified: ${data.last_modified.value}</p>
        <p>latest_revision: ${data.latest_revision}</p>
    `
    section.appendChild(newDiv)
    }
    else{
        notFound('block')
    }
}
// Short Functions
const spiner = value => {
    document.getElementById('spiner').style.display= value;
}
const totalProperty = value => {
    document.getElementById('totalProperty').style.display= value;
}
const error = value => {
    document.getElementById('error').style.display= value;
}
const notFound = value => {
    document.getElementById('notFound').style.display= value;
}
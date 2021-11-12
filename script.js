const quoteContanier = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const quoteAuthor = document.getElementById('quote-author');
const loader = document.getElementById('loader');

/* NightMode */
const checkboxToggler = document.querySelector('input[type= "checkbox"]');
const span = document.getElementById('span');


function changeTheme(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        span.children[0].classList.replace('fa-sun', 'fa-moon');
        span.children[1].textContent = 'Dark Mode'
        console.log(span.children);
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        span.children[0].classList.replace('fa-moon', 'fa-sun');
        span.children[1].textContent = 'Light Mode';
    }
}

/* Show Loading */
function Loader() {
    loader.hidden = false;
    quoteContanier.hidden = true;
}

/* Hidden Loading */
function Complete() {
    if (!loader.hidden) {
        quoteContanier.hidden = false;
        loader.hidden = true;
    }
}

async function getQuote() {
    /* show loading */
    Loader();
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if (data.quoteAuthor === '') {
            authorText.innerText('Unknown');
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;

        /* Hidden loding */
        Complete();

    } catch (error) {
        console.log('Errooor', error);
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

checkboxToggler.addEventListener('change', changeTheme);
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
getQuote();
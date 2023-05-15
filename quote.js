const quoteContainer = document.getElementById("quoter-con");
const quoteText = document.getElementById("quote");
const autherText = document.getElementById("auther");
const tweeterBtn = document.getElementById("tweeter");
const newQuoteBtn = document.getElementById("new quote");
const loader = document.getElementById("loader");

//show loading
function loadeing() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
//hide loading
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

//get quote from api
async function getQuote() {
  loadeing();
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    //if auther is blank add unknown
    if (data.quoteAuthor.trim === "") {
      autherText.innerText = "unknown";
    } else {
      autherText.innerText = data.quoteAuthor;
    }
    //reduce font size for long quots
    if (data.quoteText.length > 50) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    //stop the loader and get quote
    complete();
  } catch (error) {
    //getQuote();
    console.log("whoops", error);
  }
}

//tweeter quote function
function tweetQuote() {
  const quote = quoteText.innerText;
  const auther = autherText.innerText;
  const tweeterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${auther}`;
  window.open(tweeterUrl, "-blank");
}
//event listners
newQuoteBtn.addEventListener("click", getQuote);
tweeterBtn.addEventListener("click", tweetQuote);

getQuote();

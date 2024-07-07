

/**
 * @returns {Promise<Object>} Quote information
 */
const fetchQuote = async() => {

    //Es un método que pide el input o URL, y regresa una promesa (se puede usar un async y await)
    const response = await fetch('https://api.breakingbadquotes.xyz/v1/quotes');
    const data = await response.json() //promesa

    console.log(data[0]);
    return data[0];

}



/**
 * 
 * @param {HTMLDivElement} element 
 */
export const BreakingbadApp = async( element ) => {

    document.querySelector('#app-title').innerHTML = 'Breaking Bad App';
    element.innerHTML = 'Loading...';
    // await fetchQuote();

    const quoteLabel = document.createElement('blockquote');
    const authorLabel = document.createElement('h3');
    const nexQuoteButton = document.createElement('button');
    nexQuoteButton.innerText = 'Next Quote';

    //Función para insertar los datos que hemos creado anteriormente con las variables
    const renderQuote = ( data ) => {
        quoteLabel.innerHTML = data.quote;
        authorLabel.innerHTML = data.author;
        element.replaceChildren( quoteLabel, authorLabel, nexQuoteButton );
    }

    fetchQuote()
        .then( renderQuote );// .then( (data) => renderQuote(data) ). Como el argumento que mandamos('data') es el mismo que pedimos también en el 
        //RenderQuote, se puede simplificar de esta manera

}
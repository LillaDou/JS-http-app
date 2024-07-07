

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

    const quote =  await fetchQuote();
    element.innerHTML = 'Tenemos data!!';

}
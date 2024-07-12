import './render-buttons.css';
import usersStore from '../../store/users-store';
import { renderTable } from '../render-table/render-table';


/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderButtons = ( element ) => {

    //Creamos botones en memoria interna
    const nextButton = document.createElement('button')
    nextButton.innerText = 'Next >';

    const prevButton = document.createElement('button')
    prevButton.innerText = '< Prev ';

    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page'; //Para poder identificarlo fácilmente
    currentPageLabel.innerText = usersStore.getCurrentPage();

    //Creamos los botones físicos para renderizar 
    element.append( prevButton, currentPageLabel, nextButton );

    nextButton.addEventListener('click', async() => {
        await usersStore.loadNextPage();
        currentPageLabel.innerHTML = usersStore.getCurrentPage();//cual es la página actual
        renderTable( element ); //cambiar la tabla. Pide el elemento de HTML de arriba
    });

    prevButton.addEventListener('click', async() => {
        await usersStore.loadPreviousPage();
        currentPageLabel.innerHTML = usersStore.getCurrentPage();
        renderTable( element );
    });

}
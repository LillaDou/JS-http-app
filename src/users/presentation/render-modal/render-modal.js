//!El MODAL es la ventana que aparece al hacer click en el +

import './render-modal.css';
import modalHtml from './render-modal.html?raw';
//En vite se añade el ?raw al html para que pueda ser leído

let modal;


/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderModal = ( element ) => {

    if ( modal ) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal';

    element.append( modal );
}
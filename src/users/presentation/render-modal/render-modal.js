//!El MODAL es la ventana que aparece al hacer click en el +

import './render-modal.css';
import modalHtml from './render-modal.html?raw';
//En vite se añade el ?raw al html para que pueda ser leído

let modal, form;

//TODO: cargar usuario por id
export const showModal = () => {
    modal?.classList.remove('hide-modal'); //Si existe el modal, quítalo

}

export const hideModal = () => {
    modal?.classList.add('hide-modal');//Si existe el modal, añade el hide-modal
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderModal = ( element ) => {

    if ( modal ) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal';
    form = modal.querySelector('form');

    modal.addEventListener('click', (event) => {
    //Si el lugar donde hacemos click es exactamente igual al modal-container, cierra el modal
        if ( event.target.className === 'modal-container' ) {
            hideModal();
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        console.log('Formulario enviado');
    });

    element.append( modal );
}
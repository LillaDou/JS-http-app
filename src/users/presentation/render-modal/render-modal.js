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
    //Reset del formulario:
    form?.reset();//Si hay un formulario, resetea los valores. 
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

        const formData = new FormData( form );
        const userLike = {};

        for (const [key, value] of formData) {
            if ( key === 'balance' ){
                userLike[key] = +value;//Estamos indicando que, si el key es el balance, 
                //entonces el valor va a ser numérico, y no un string
                continue; //"continúa con el resto del for"
            }

            if ( key === 'isActive' ) {
                userLike[key] = (value === 'on') ? true : false;
                //Si el valor de isActive es on, entonces conviértelo en un 
                //Valor buleano de true. Si es off, es false
                continue;
            }

            userLike[key] = value;
        }

        hideModal();
    });

    element.append( modal );
}
import usersStore from '../../store/users-store';
import { deleteUserById } from '../../use-cases/delete-user-by-id';
import { showModal } from '../render-modal/render-modal';
import './render-table.css';


let table;

//Con esta función creamos la tabla HTML
const createTable = () => {
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML = `
        <tr> 
            <th>#ID</th>
            <th>Balance</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;
    //tr: table row
    //th: table header

    const tableBody = document.createElement('tbody');
    table.append( tableHeaders, tableBody );
    return table;
}

/**
 * 
 * @param {MouseEvent} event 
 */
const tableSelectListener = (event) => {
    const element = event.target.closest('.select-user');
    if ( !element ) return;

    const id = element.getAttribute('data-id');
    showModal(id);
}

/**
 * 
 * @param {MouseEvent} event 
 */
const tableDeleteListener = async(event) => {
    const element = event.target.closest('.delete-user');
    if ( !element ) return;

    const id = element.getAttribute('data-id');

    try {
        await deleteUserById(id);//eliminamos
        await usersStore.reloadPage();//cargamos la página
        document.querySelector('#current-page').innerText = usersStore.getCurrentPage();//cambiamos la página
        renderTable();//Renderizamos la página de nuevo

    } catch (error) {
        console.log(error);
        alert('No se pudo eliminar');
    }
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = ( element ) => {

    const users = usersStore.getUsers();

    if ( !table ) {
        table = createTable();
        element.append( table );//Insertamos la tabla dentro del elemento, que es un DIV de HTML

        //TODO: listeners a la tabla
        table.addEventListener('click', tableSelectListener);
        table.addEventListener('click', tableDeleteListener);

    }

    let tableHTML = '';

    users.forEach( user => {
        tableHTML += `
            <tr>
                <td>${ user.id }</td>
                <td>${ user.balance }</td>
                <td>${ user.firstName }</td>
                <td>${ user.lastName }</td>
                <td>${ user.isActive }</td>
                <td>
                    <a href="#/" class="select-user" data-id=${ user.id }>Select</a>
                    <a href="#/" class="delete-user" data-id=${ user.id }>Delete</a>
                </td>
            </tr>
        `
    });

    table.querySelector('tbody').innerHTML = tableHTML;
    //Con el querySelector buscamos dentro del table el tbody, y a este, le introducimos
    //el innerHTML, que será el contenido definido en tableHTML
    
}
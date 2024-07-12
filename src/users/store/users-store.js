import { User } from "../models/user";
import { loadUsersByPage } from "../use-cases/load-users-by-page";


const state = {
    currentPage: 0,
    users: [],
}

//Métodos
const loadNextPage = async() => {
    const users = await loadUsersByPage( state.currentPage + 1 );
    if ( users.length === 0 ) return;

    state.currentPage += 1;
    state.users = users;
}

const loadPreviousPage = async() => {
    if ( state.currentPage === 1 ) return;
    const users = await loadUsersByPage (state.currentPage - 1 );

    state.currentPage -= 1;
    state.users = users;
}

/**
 * 
 * @param {User} updatedUser 
 */
const onUserChanged = ( updatedUser ) => {

    let wasFound =  false;

    state.users = state.users.map( user => {
        if ( user.id === updatedUser.id ) {
            wasFound = true;
            return updatedUser;
        }
        return user;
    });

    //Si hay menos de 10 usuarios en la página, va a insertar el usuario actualizado
    if ( state.users.length < 10 && !wasFound ) {
        state.users.push( updatedUser );
    }
}

//Cargar la página para que, aunque eliminemos un elemento, que siempre hayan 10
const reloadPage = async() => {
    const users = await loadUsersByPage( state.currentPage );
    if ( users.length === 0 ) {
        await loadPreviousPage();
        return;
    };
    state.users = users;
} 

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,

    /**
     * 
     * @returns {User[]}
     */
    getUsers: () => [...state.users],
    /**
     * 
     * @returns {Number}
     */
    getCurrentPage: () => state.currentPage,
}
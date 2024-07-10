import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { User } from "../models/user";


// Es todo lo que necesitamos para cargar los usuarios de una página

/**
 * 
 * @param {Number} page 
 * @returns {Promise<User[]>}
 */
export const loadUsersByPage = async( page = 1 ) => {

    const url = `${ import.meta.env.VITE_BASE_URL}/users?_page=${ page }`;//url para hacer la petición
    const res = await fetch(url);
    const data = await res.json(); //El data es un arreglo

    // console.log(data);
    //El .map sirve para barrer todo el arreglo de data
    const users = data.map( localhostUserToModel );
    console.log('users', users);
    
    return users;
    

}
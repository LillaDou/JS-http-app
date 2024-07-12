//!Creación y actualización de datos en la tabla
import { localhostUserToModel } from '../mappers/localhost-user.mapper';
import { userModelToLocalhost } from '../mappers/user-to-localhost.mapper';
import {User} from '../models/user';

/**
 * 
 * @param {Like<User>} userLike 
 */
//Lo llamamos save User para poder determinar si tengo un id, si quiero actualizarlo
//o no.
export const saveUser = async( userLike ) => {

    const user = new User( userLike );//Generamos una nueva instancia de User
    
    //Validación: debe haber nombre y apellido en el modal
    if ( !user.firstName || !user.lastName )
        throw 'First & last name required';
    
    const userToSave = userModelToLocalhost( user );
    let userUpdated;

    if ( user.id ) {
        userUpdated = await updateUser( userToSave );
    } else {
        userUpdated = await createUser( userToSave );
    }

    return localhostUserToModel( userUpdated );
  
}

//Usuario que tenemos que mandar al backend
/**
 * @param {Like<User>} user
 */
const createUser = async( user ) => {

    const url = `${ import.meta.env.VITE_BASE_URL }/users`;
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    //Si todo sale bien, creamos el nuevo usuario en el backend
    const newUser = await res.json();
    console.log({newUser});
    return newUser;
}

//Actualización de un usuario en el backend
/**
 * @param {Like<User>} user
 */
const updateUser = async( user ) => {

    const url = `${ import.meta.env.VITE_BASE_URL }/users/${ user.id }`;
    const res = await fetch(url, {
        method: 'PATCH', //update solo lo que hemos pedido en el backend
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const updatedUser = await res.json();
    console.log({updatedUser});
    return updatedUser;
}
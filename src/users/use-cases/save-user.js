//!Creación y actualización de datos en la tabla
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

    if ( user.id ) {
        throw 'No implementada la actualización'
        return;
    } 

    const updatedUser = await createUser( userToSave );
    return updatedUser;
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
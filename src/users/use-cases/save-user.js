//!Creación y actualización de datos en la tabla
import {User} from '../models/user';

/**
 * 
 * @param {Like<User>} userLike 
 */
//Lo llamamos save User para poder determinar si tengo un id, si quiero actualizarlo
//o no.
export const saveUser = async( userLike ) => {

    const user = new User( userLike );//Generamos una nueva instancia de User

    //TODO: aquí falta un mapper

    if ( user.id ) {
        throw 'No implementada la actualización'
        return;
    } 

    const updatedUser = await createUser( user );
    return updatedUser;
}

//!Usuario que tenemos que mandar al backend
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
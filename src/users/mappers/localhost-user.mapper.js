import { User } from "../models/user"

//Cambiar algunos datos del localhost como viene del backend, al modelo que hemos creado en nuestro modelo de User
/**
 * 
 * @param {Like<User>} localhostUser 
 * @returns {User}
 */
export const localhostUserToModel = (localhostUser) => {

    const {
        avatar, 
        balance, 
        first_name,
        gender,
        id,
        isActive,
        last_name,
    } = localhostUser;

    return new User({
        avatar, 
        balance, 
        firstName: first_name,
        gender,
        id,
        isActive,
        lastName: last_name,
    });
}
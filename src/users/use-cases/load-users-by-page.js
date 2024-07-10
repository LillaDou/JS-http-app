

// Es todo lo que necesitamos para cargar los usuarios de una página

/**
 * 
 * @param {Number} page 
 * @returns
 */
export const loadUsersByPage = async( page = 1 ) => {

    const url = `${ import.meta.env.VITE_BASE_URL}/users?_page=${ page }`;//url para hacer la petición
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

}
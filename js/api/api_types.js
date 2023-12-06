const API_URL = "https://s3-4676.nuage-peda.fr/BouchApi/api/types";

async function getTypes(page=1){
    try{
        const response = await fetch(`${API_URL}?page=1&order%5Bdescription%5D=asc`);
        if(!response.ok){
            throw new Error(`Erreur : ${response.statusText}`);
        }
        const data = await response.json();
        return data
    }catch(erreur){
        console.error('Erreur lors de la récupération',erreur);
        throw erreur;
    }
}


export {getTypes}
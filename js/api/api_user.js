const API_URL = "https://s3-4676.nuage-peda.fr/Bijouterie/api/clients";

async function getClientsAsc(page=1){
    try{
        const response = await fetch(`${API_URL}?page=${page}&order%5Bnom%5D=asc&order%5Bprenom%5D=asc`);
        if(!response.ok){
            throw new Error(`Erreur : ${response.statusText}`);
        }
        const data = await response.json();
        return data
    }catch(erreur){
        console.error('Erreur lorsde la récupération',erreur);
        throw erreur;
    }
}

async function getClientsDesc(page=1){
    try{
        const response = await fetch(`${API_URL}?page=${page}&order%5Bnom%5D=desc&order%5Bprenom%5D=desc`);
        if(!response.ok){
            throw new Error(`Erreur : ${response.statusText}`);
        }
        const data = await response.json();
        return data
    }catch(erreur){
        console.error('Erreur lorsde la récupération',erreur);
        throw erreur;
    }
}

async function getClientsByNom(nom){
    try{
        const response = await fetch(`${API_URL}/?page=1`);
        if(!response.ok){
            throw new Error(`Erreur : ${response.statusText}`);
        }
        const data = await response.json();
        return data
    }catch(erreur){
        console.error('Erreur lorsde la récupération',erreur);
        throw erreur;
    }
}

async function getClientsByPrenom(prenom){
    try{
        const response = await fetch(`${API_URL}/?page=1&nom=${prenom}`);
        if(!response.ok){
            throw new Error(`Erreur : ${response.statusText}`);
        }
        const data = await response.json();
        return data
    }catch(erreur){
        console.error('Erreur lorsde la récupération',erreur);
        throw erreur;
    }
}

export {getClientsByNom}
export {getClientsByPrenom}
export {getClientsAsc}
export {getClientsDesc}
   
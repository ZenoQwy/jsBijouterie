const API_URL = "https://s3-4676.nuage-peda.fr/forum/api/messages";

async function getMessages(page=1){
    try{
        const response = await fetch(`${API_URL}?page=${page}&exists%5Bparent%5D=false`);
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

async function getMessage(id){
    try{
        const response = await fetch(`${API_URL}/${id}`);
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

export {getMessages}
export {getMessage}
   
import { getClientsAsc } from "./api/api_clients.js";
import { getClientsDesc } from "./api/api_clients.js";
import { getClientsByNom } from "./api/api_clients.js";
import { getClientsByPrenom} from "./api/api_clients.js";

const buttonOrder = document.getElementById("changeOrder");
const inputNom = document.getElementById("input-nom");
const inputPrenom = document.getElementById("input-prenom");

buttonOrder.addEventListener("click", changeOdreAlpha);

inputNom.addEventListener('input',searcheByNom)
inputPrenom.addEventListener('input',searcheByPrenom)

var ordreAlpha = true

function changeOdreAlpha() {
    ordreAlpha = !ordreAlpha
    purgeOlClient();
    if(ordreAlpha == true){
        afficherClientsASC();
    }else{
        afficherClientsDESC();
    }
    
}

function purgeOlClient() {
    var olClient = document.getElementById('olClient');
    olClient.innerHTML = "";
}


async function afficherClientsASC(){
    try{
        const clients = await getClientsAsc();
        var lesClients = clients["hydra:member"];
        var olClient = document.getElementById('olClient');
        for(let client of lesClients){
            var li = document.createElement("li");
            li.classList.add("list-group-item", "d-flex","justify-content-between","align-items-start")
            
            var div1 = document.createElement("div");
            var div2 = document.createElement("div");
           
            div2.innerHTML = '<span class="material-symbols-outlined"></span>'+client.nom+' '+client.prenom ;
            
            //div2.classList.add('fw-bold');
        
            li.appendChild(div1);
            div1.appendChild(div2);
            olClient.appendChild(li);
        }

    }catch(erreur){
        console.log(`Erreur : ${erreur}`);
    }
}

async function afficherClientsDESC(){
    try{
        const clients = await getClientsDesc();
        var lesClients = clients["hydra:member"];
        var olClient = document.getElementById('olClient');
        for(let client of lesClients){
            var li = document.createElement("li");
            li.classList.add("list-group-item", "d-flex","justify-content-between","align-items-start")
            
            var div1 = document.createElement("div");
            var div2 = document.createElement("div");
           
            div2.innerHTML = '<span class="material-symbols-outlined"></span>'+client.nom+' '+client.prenom ;
            
            //div2.classList.add('fw-bold');
        
            li.appendChild(div1);
            div1.appendChild(div2);
            olClient.appendChild(li);
        }

    }catch(erreur){
        console.log(`Erreur : ${erreur}`);
    }
}

async function searcheByNom(){
    try{
        const client = await getClientsByNom(inputNom.querySelector('input').value);
        var recherche = document.getElementById('recherche');

            var li = document.createElement("li");
            li.classList.add("list-group-item", "d-flex","justify-content-between","align-items-start")
            
            var div1 = document.createElement("div");
            var div2 = document.createElement("div");
           
            div2.innerHTML = '<span class="material-symbols-outlined"></span>'+client.nom+' '+client.prenom ;
            
            //div2.classList.add('fw-bold');
        
            li.appendChild(div1);
            div1.appendChild(div2);
            recherche.appendChild(li);


    }catch(erreur){
        console.log(`Erreur : ${erreur}`);
    }
};

async function searcheByPrenom(){
    try{
        const client = await getClientsByPrenom(inputPrenom.querySelector('input').value);
        var recherche = document.getElementById('recherche');

            var li = document.createElement("li");
            li.classList.add("list-group-item", "d-flex","justify-content-between","align-items-start")
            
            var div1 = document.createElement("div");
            var div2 = document.createElement("div");
           
            div2.innerHTML = '<span class="material-symbols-outlined"></span>'+client.nom+' '+client.prenom ;
            
            //div2.classList.add('fw-bold');
        
            li.appendChild(div1);
            div1.appendChild(div2);
            recherche.appendChild(li);


    }catch(erreur){
        console.log(`Erreur : ${erreur}`);
    }
};

afficherClientsASC();

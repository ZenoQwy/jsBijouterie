import { getProduits } from "./api/api_produits.js";
import { getTypes } from "./api/api_types.js";

const inputEmailConnexion = document.getElementById("input-emailConnexion");
const inputPasswordConnexion = document.getElementById("input-passwordConnexion");
const buttonLogin = document.getElementById("login");
buttonLogin.addEventListener("click", login);


const inputEmailInscription = document.getElementById("input-emailInscription");
const inputPasswordInscription = document.getElementById("input-passwordInscription");
const inputNomInscription = document.getElementById("input-nomInscription");
const inputPrenomInscription = document.getElementById("input-prenomInscription");
const buttonRegister = document.getElementById("register");
buttonRegister.addEventListener("click", register);

async function afficherProduits(){
    try{
        const produits = await getProduits();
        var lesProduits = produits["hydra:member"];
        var olProduits = document.getElementById('olProduits');
        for(let produit of lesProduits){
            var li = document.createElement("li");
            li.classList.add("list-group-item", "d-flex","justify-content-between","align-items-start")
            
            var div1 = document.createElement("div");
            var div2 = document.createElement("div");
           
            div2.innerHTML = '<span class="material-symbols-outlined"></span>'+produit.nom;
            
            //div2.classList.add('fw-bold');
        
            li.appendChild(div1);
            div1.appendChild(div2);
            olProduits.appendChild(li);
        }

    }catch(erreur){
        console.log(`Erreur : ${erreur}`);
    }
}

async function afficherTypes(){
    try{
        const types = await getTypes();
        var lesTypes = types["hydra:member"];
        var olTypes = document.getElementById('olTypes');
        for(let type of lesTypes){
            var li = document.createElement("li");
            li.classList.add("list-group-item", "d-flex","justify-content-between","align-items-start")
            
            const div1 = document.createElement("div");
            const div2 = document.createElement("div");
            const span = document.createElement("span");
            const hr = document.createElement("hr");
           
    
        
            li.appendChild(div1);
            div1.appendChild(div2);
            
            hr.style.height = "5px"; 
            hr.style.width = "250px"; 
            hr.style.backgroundColor = "black"; 
          
            div1.innerText = `${type.description}`;
            div1.classList.add('fw-bold');
        
            div2.classList.add('fw-normal');
          
            li.appendChild(div1);
            div1.appendChild(div2);
          
            if (type.produits.length > 0) {
              span.classList.add("badge", "bg-primary", "rounded-pill");
              span.innerText = type.produits.length;
              const details = document.createElement("details");
              details.innerHTML = `<summary>Détails</summary><ul>${type.produits.map(produits => `<li>Nom : ${produits.nom}<br>Prix unité : ${produits.prixUnite} €<br>Quantité en stock : ${produits.quantiteStock}</li>`).join('')}</ul><hr>`;              
              div1.appendChild(hr);
              li.appendChild(details);
            }
          
            li.appendChild(span);
            olTypes.appendChild(li);
        }

    }catch(erreur){
        console.log(`Erreur : ${erreur}`);
    }
}

function login() {
    var request = $.ajax({
      headers: {
        'Accept': 'application/ld+json',
        'Content-Type': 'application/ld+json',
      },
      url: "https://s3-4676.nuage-peda.fr/BouchApi/api/authentication_token",
      method: "POST",
      data: JSON.stringify({
        email: inputEmailConnexion.value, // Utilisez la valeur de l'input email pour la connexion
        password: inputPasswordConnexion.value, // Utilisez la valeur de l'input password pour la connexion
      }),
      dataType: "json",
      beforeSend: function (xhr) {
        xhr.overrideMimeType("application/ld+json; charset=utf-8");
      }
    });
  
    request.done(function (msg) {
      console.log(msg);
  
      // Enregistrez le token dans le localStorage
      localStorage.setItem('token', msg.token);
      localStorage.setItem('email', inputEmailInscription.value);
      localStorage.setItem('password', inputPasswordInscription.value,);
  
      // Affiche une boîte de dialogue d'alerte
      alert('Connecté !');
    });
  
    request.fail(function (jqXHR, textStatus, errorThrown) {
      //console.log("Request failed:", textStatus, errorThrown);
      //console.log("Response Text:", jqXHR.responseText);
      
      alert('Échec de la connexion. Veuillez vérifier vos informations.');
    });
  }
  
  
  function register() {
    function createUser() {
      var request = $.ajax({
        headers: {
          'Accept': 'application/ld+json',
          'Content-Type': 'application/ld+json',
        },
        url: "https://s3-4676.nuage-peda.fr/BouchApi/api/clients",
        method: "POST",
        data: JSON.stringify({
          email: inputEmailInscription.value, 
          password: inputPasswordInscription.value, 
          nom: inputNomInscription.value, 
          prenom: inputPrenomInscription.value, 
        }),
        dataType: "json",
        beforeSend: function (xhr) {
          xhr.overrideMimeType("application/ld+json; charset=utf-8");
        }
      });
  
      request.fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Request failed:", textStatus, errorThrown);
        console.log("Response Text:", jqXHR.responseText);
      });
    }
  
    createUser();
  }

afficherProduits();
afficherTypes();

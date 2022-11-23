/*FAIRE LE LIEN ENTRE UN PRODUIT DE LA PAGE D'ACCUEIL ET LA PAGE PRODUIT
/* Quand on clique sur un des canapés de la page d'accueil, 
une fiche produit s'ouvre présentant une photo et des infos sur le produit */

// RECUPERATION DE L'ID POUR AFFICHER UN CANAPE

console.log(window.location.href);
//retourne une adresse web personnalisée

//Récupération des paramètres de l'url
const recupUrl = window.location.href;

// Le constructeur URL() renvoie un nouvel objet URL représentant l'URL définie par les paramètres
const url = new URL(recupUrl);

//ON RECUPERE L'ID DU PRODUIT A AFFICHER grâce au constructeur URLSearchParams()
const id = url.searchParams.get("id");

/**
 * ENREGISTRER UN PANIER DANS LOCAL STORAGE
 */
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}
/*On ne peut pas enregistrer tableaux et objets dans LS.
On transforme les données en chaîne de caractères */

/**
 * RECUPERATION DES VALEURS DANS LOCAL STORAGE
 */
function getBasket() {
  let basket = localStorage.getItem("basket");

  if (basket == null) {
    //Si le panier n'existe pas
    return [];
  } else {
    return JSON.parse(basket);
    //On redonne aux valeurs le format objet
  }
}

//INSERER UN PRODUIT ET SES DETAILS DANS LA PAGE PRODUIT

//Sélection des différents éléments du DOM dont on a besoin
let imgItem = document.querySelector(".item__img");
let img = document.createElement("img");
imgItem.appendChild(img);

let titleItem = document.getElementById("title");

let priceItem = document.getElementById("price");

let descriptionItem = document.getElementById("description");

let colorsItem = document.getElementById("colors");

// Récupération des infos pour chaque canapé différent avec l'id via une fonction async/await

/**
 * Affichage d'une fiche produit pour chaque canapé
 */
async function getArticle(idProduct) {
  const reponseJSON = await fetch(
    "http://localhost:3000/api/products/" + idProduct
  );
  const item = await reponseJSON.json();
  img.setAttribute("src", item.imageUrl);
  img.setAttribute("alt", item.altTxt);
  titleItem.innerHTML = item.name;
  priceItem.innerHTML = item.price;
  descriptionItem.innerHTML = item.description;

  // L'instruction for...of crée une boucle Array pour parcourir les valeurs de la propriété colors
  // La boucle parcourt les différents coloris qui sont stockés dans un tableau
  // Création d'un nouveau noeud dans le DOM pour permettre de sélectionner une couleur

  for (const color of item.colors) {
    let colorSelect = document.createElement("option");
    colorSelect.setAttribute("value", color);
    colorSelect.innerHTML = color;
    colorsItem.appendChild(colorSelect);
  }
}

getArticle(id).then(); // Fin de la fonction qui récupère et affiche les infos du canapé

//AJOUTER DES PRODUITS DANS LE PANIER

/* On sélectionne les éléments nécessaires : le bouton 'Ajouter au panier', le nombre d'articles et la couleur choisie */

let btnAddToCart = document.getElementById("addToCart");

//Détection des clics sur le panier
btnAddToCart.addEventListener("click", (e) => {
  e.preventDefault;
  let quantity = document.getElementById("quantity");
  let colorSelected = document.getElementById("colors");

  //AJOUT D'UN PRODUIT AU PANIER SANS SUPPRIMER L'ANCIEN
  // On vérifie que le panier est dispo dans localstorage
  // Si c'est le cas, on ajoute le produit voulu dans localstorage

  function addArticle() {
    // On récupère le panier qui existe dans localStorage
    let basket = getBasket();

    // Stockage des choix du client dans une variable
    const product = {
      id: id,
      color: colorSelected.value,
      quantity: parseInt(quantity.value),
    };

    //Empêcher l'envoi du formulaire s'il n'est pas correctement rempli
    if (
      colorSelected.value == "" ||
      quantity.value <= 0 ||
      quantity.value > 100
    ) {
      alert("Choisissez une couleur et une quantité svp");
      window.history.back(index.html);
    } else {
      //on informe le client que sa commande est ok
      alert("Votre commande a été ajoutée au panier ! ");
    }
    // On gère la quantité ajoutée avec la méthode find
    /* On cherche dans le panier s'il y a un produit (p) dont l'id (p.id) est égal à l'id et à la couleur du produit qu'on veut ajouter (product.id). Si find ne trouve rien, il retourne 'undefined' */

    let foundProduct = basket.find(
      (p) => p.id == product.id && p.color == product.color
    );

    if (foundProduct) {
      foundProduct.quantity = foundProduct.quantity + product.quantity;

      saveBasket(basket);
      return;
    }

    basket.push(product);

    saveBasket(basket); //Enregistrement du panier dans localStorage

    console.log("item ajouté ! ");
  }

  addArticle(); // Fin de la fonction qui ajoute les produits au panier

  window.location.assign("cart.html"); //La méthode location.assign() ouvre la page à l'URL indiquée
}); /////// Fermeture de btnAddToCart.addEventListener
/**
 * Description
 * @returns {any}
 */
 export const loaderProduct = async () => {
  //Ciblage
   const productId = getProductId();

  //Récupération
  const product = await getProduct(productId);

  //Affichage
  displayProduct(product);

  //enregistrement dans localstorage
  saveToLS()
};

loaderProduct();


/**
 * Target products
 * @returns {any}
 */
function getProductId() {
  return new URL(location.href).searchParams.get("id");
}

/**
 * Get Product Id
 * @param {any} productId
 * @returns {any}
 */
function getProduct(productId) {
  return fetch(`http://localhost:3000/api/products/${productId}`)
    .then((response) => response.json())
    .then((products) => {
      return products;
    })
    .catch((err) => console.log(err));
}

/**
 * Display
 * @param {Array<string>} product
 * @returns {any}
 */
function displayProduct(product) {    
  
  // Affichage de l'image
  let displayImage = "";
  displayImage = `<img src=${product.imageUrl} alt="${product.altTxt}">`;
  document
    .querySelector(".item__img")
    .insertAdjacentHTML("beforeend", displayImage);  

  // Affichage du nom
  let title =  document.getElementById("title").textContent = product.name;

  // Affichage du prix
  let price = document.getElementById("price").textContent = product.price;

  // Affichage de la description
  let description = document.getElementById("description").textContent = product.description;

  // Affichage du choix des couleurs
  let optionColors = "";
  for (let i = 0; i < product.colors.length; i++) {
    optionColors += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
  }
  document.querySelector("option").insertAdjacentHTML("afterend", optionColors);
}
  //enregistrement de le localstorage au clic
  function saveToLS () {
      //sélection du button 
      const button = document.getElementById('addToCart')
      button.addEventListener('click', (e) => {
          let color = document.getElementById('colors')
          let quantity = document.getElementById('quantity')
          let image = document.getElementsByTagName('img')[5]
          let description = document.getElementById("description")
          let title = document.getElementById("title")
          let price = document.getElementById("price")            
          
          if (color.value == null || color.value == "" || quantity.value <= 0) {
              console.log('Entrez des valeurs');
          } else {
              let productSave = {
                   name : title.textContent,
                   image: image.src,
                   txtAlt : image.alt,
                   description: description.textContent,
                   color: color.value,
                   price: price.textContent                     
              }
              localStorage.setItem('productsave', JSON.stringify(productSave))
          }       
      })
  }




//enregistrement de le localstorage
//   function saveToLS () {
//     localStorage.setItem("product", JSON.stringify(product))
//   }



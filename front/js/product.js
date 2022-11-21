/**
 * LoaderProduct
 * @returns {any}
 */
export const loaderProduct = async () => {
  //Ciblage
  const productId = getProductId();

  //Récupération
  const product = await getProduct(productId);

  //Affichage
  displayProduct(product);
};

/**
 * Initialisation du LoaderProduct
 */
loaderProduct();
addToCart();

/**
 * Target products
 * @returns {Object}
 */
function getProductId() {
  return new URL(location.href).searchParams.get("id");
}

/**
 * Get Product Id
 * @param {number} productId
 * @returns {object}
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
  let title = (document.getElementById("title").textContent = product.name);

  // Affichage du prix
  let price = (document.getElementById("price").textContent = product.price);

  // Affichage de la description
  let description = (document.getElementById("description").textContent =
    product.description);

  // Affichage du choix des couleurs
  let optionColors = "";
  for (let i = 0; i < product.colors.length; i++) {
    optionColors += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
  }
  document.querySelector("option").insertAdjacentHTML("afterend", optionColors);
}
/**
 * Ajout du produit au panier
 * 
 */
function onClickButton() {
  const listProducts = [];
  //sélection du button
  const button = document.getElementById("addToCart");
  button.addEventListener("click", (e) => {
    let color = document.getElementById("colors");
    let quantity = document.getElementById("quantity");
    const productId = getProductId(); 
    
    addToCart(id, Number(quantity.value), color.value)
    })
  
}

function getCart() {
  let cart = localStorage.getItem('cart')
  if (cart == null) {
    return []
  } else {
    return JSON.parse(cart)
  }
}

function addToCart(id, quantity, color){
  let cart = getCart()
  let product = {id, quantity, color}
  console.log(cart);
  console.log(product);
  console.log({id, quantity, color});
  if (searchForProductInCart(cart, product)){
    console.log('tets2');
      changeQuantity(product, quantity)
    } else {
      console.log('carte');
      cart.push({id, quantity, color})
      saveCart(cart)
  }
}

//vérifie s'il existe déjà dans le panier un produit avec le meme id et la même couleur
function searchForProductInCart(cart, product){
  return cart.some((p) => p.id === product.id && p.color === product.color)
}

//pour changer la quantité depuis la page produit
function changeQuantity(product, quantity) {
  let cart = getCart();
  let foundProduct = cart.find(p => p.id == product.id && p.color == product.color);
  if (foundProduct != undefined) {
      foundProduct.quantity += quantity
     if (foundProduct.quantity <= 0){
          removeFromCart(foundProduct);
      } else {
          saveCart(cart)
      }   
  } 
}

//enregistre le panier sur localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

//supprime du panier
function removeFromCart(product) {
  let cart = getCart();
  cart = cart.filter(p=> p.id != product.id);
  saveCart(cart);
}




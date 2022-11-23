/**
 * Initialisation du LoaderProduct
 */
 loadProduct();
/**
 * Load selected product
 */

async function loadProduct() {
 //Ciblage
 const productId = getProductId();

 //Récupération
 const product = await getProduct(productId);

 //Affichage
 displayProduct(product);
}

/**
 * Target Product
 */
function getProductId() {
  return new URL(location.href).searchParams.get("id");
}

/**
 * Get ProductId
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
* Display selected product
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

/***************************************************
 * 
 **************************************************/

clickedButton()

function clickedButton () {
  const button = document.getElementById('addToCart')
  button.addEventListener('click', () => {
    const productId = getProductId()
    let colors = document.getElementById('colors')
    console.log(colors.value);
    let quantity = document.getElementById('quantity')
    console.log(quantity.value);
    addToCart()
  })
}

function addToCart (id, quantity, color) {
  let cart = getCart();
  if (searchForProductInCart){
      changeQuantity()
    } else {
      cart.push({id, quantity, color})
      saveCart(cart)
  }
  console.log(cart);
}

function getCart(productId,color,quantity) {
  let cart = localStorage.getItem('cart')
  let product = {
    id: productId,
    color,
    quantity
  }
  if (cart == null) {
    return []
  } else {
    return JSON.parse(cart)
  }
  console.log(cart);
}

function searchForProductInCart(cart){
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
          saveCart()
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
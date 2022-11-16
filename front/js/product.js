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
function addToCart() {
  const listProducts = [];
  //sélection du button
  const button = document.getElementById("addToCart");
  button.addEventListener("click", (e) => {
    let color = document.getElementById("colors");
    let quantity = document.getElementById("quantity");

    const productId = getProductId();

    let image = document.getElementsByTagName("img")[5];
    let description = document.getElementById("description");
    let title = document.getElementById("title");
    let price = document.getElementById("price");

    if (color.value == null || color.value == "" || quantity.value < 1) {
      console.log("Choissisez une couleur et/ou une quantité");
      return 
    }

    let productSave = {
        id: productId,
        // name: title.textContent,
        // image: image.src,
        // txtAlt: image.alt,
        // description: description.textContent,
        // price: Number(price.textContent),
        color: color.value,
        quantity: Number(quantity.value)
    };

    // si productId est égal à productSave.id && color.value == ProductSave.color {
      // Alors augmenter la ProductSave.quantity
    //}

    // if localstorage.getitem == null {

    //}
    const getLS = localStorage.getItem(productId)
    if ( getLS !== null || getLS == productSave.id) {  
      JSON.parse(getLS)
      console.log(getLS);
      
      listProducts.map(getLS => getLS.quantity += productSave.quantity)         
      listProducts.push(productSave)
      localStorage.setItem(productId, JSON.stringify(listProducts)); 
    } else {
      listProducts.push(productSave)
      localStorage.setItem(productId, JSON.stringify(listProducts));      
      window.location.href = "cart.html"
    }
  });
}
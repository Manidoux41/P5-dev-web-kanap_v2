/**
 * Description
 * @returns {any}
 */
const loaderProduct = async () => {
  //Ciblage
  const productId = getProductId();

  //Récupération
  const product = await getProduct(productId);

  //Affichage
  displayProduct(product);
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
  //Affichage de l'image
  let displayImage = "";
  displayImage = `<img src=${product.imageUrl} alt="${product.altTxt}">`;
  document.querySelector(".item__img").insertAdjacentHTML("beforeend", displayImage);

  //Affichage du contenu
  document.getElementById("title").textContent = product.name;
  document.getElementById("price").textContent = product.price;
  document.getElementById("description").textContent = product.description;

  //Affichage du choix des couleurs
  let optionColors = "";
  for (let i = 0; i < product.colors.length; i++) {
    optionColors += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
  }
  document.querySelector("option").insertAdjacentHTML("afterend", optionColors);
}
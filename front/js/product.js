 (async function () {
    //ciblage
    const productId = getProductId()
    
    //récupération
    const product = await getProduct(productId)
    
    //Affichage
    displayProduct(product)
})()

//ciblage
function getProductId () {
    return new URL(location.href).searchParams.get('id')
}

//récupération
function getProduct(productId) {
     return fetch(`http://localhost:3000/api/products/${productId}`)
        .then((response) => response.json())
        .then((products) => {
                return products
            })
        .catch(err => console.log(err))
} 

//Affichage
function displayProduct(product) {
    //Affichage de l'image
    let displayImage = ''
    displayImage = `<img src=${product.imageUrl} alt="${product.altTxt}">`
    document.querySelector('.item__img').insertAdjacentHTML("beforeend", displayImage)

    //Affichage du contenu
    document.getElementById('title').textContent = product.name
    document.getElementById('price').textContent = product.price
    document.getElementById('description').textContent = product.description

    //Affichage des checkbox

    // let displayOption = ''
    // for(color in products) {

    // }
}
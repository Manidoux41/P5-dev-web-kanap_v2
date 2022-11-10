 (async function () {
    //ciblage
    const productId = getProductId()
    //récupération
    const product = await getProduct(productId)
    console.log(product)
    //Affichage
    displayProduct(product)
})()

function getProductId () {
    return new URL(location.href).searchParams.get('id')
}

function getProduct(productId) {
     return fetch(`http://localhost:3000/api/products/${productId}`)
        .then((response) => response.json())
        .then((products) => {
                return products
            })
        .catch(err => console.log(err))
} 

function displayProduct(product) {
    let displayImage = ''
    displayImage = `<img src=${product.imageUrl} alt="${product.altTxt}">`
    document.querySelector('.item__img').insertAdjacentHTML("beforeend", displayImage)

    document.getElementById('title').textContent = product.name
    document.getElementById('price').textContent = product.price
    document.getElementById('description').textContent = product.description
}


    


(async function () {
    const productId = getProductId()
    const product = await getProduct(productId)
    console.log(product)
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
    document.getElementById('title').textContent = product.name
    document.getElementById('price').textContent = product.price
}
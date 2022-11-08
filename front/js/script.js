
let url = 'http://localhost:3000/api/products'

fetch(url)
  .then((response) => response.json())
  .then((datas) => {
    console.log(datas);
    let items = document.getElementById('items');
    for(let data of datas) {
      items.innerHTML += `<a href="./product.html?id=${data._id}">
      <article>
        <img src=${data.imageUrl} alt="${data.altTxt}">
        <h3 class="productName">${data.name}</h3>
        <p class="productDescription">${data.description}</p>
      </article>
    </a>`}
  })
  .catch((err) => console.log('serveur indisponible:' + err))


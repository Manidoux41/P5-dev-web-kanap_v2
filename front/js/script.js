export const dataFetch = async() => {
   let url = 'http://localhost:3000/api/products';

  await fetch(url)
  .then(response => response.json())
  .then((products) => {
    console.log(products);

    for(let data of products) {
      let product = {
        id: data._id,
        altTxt: data.altTxt,
        imageUrl: data.imageUrl,
        name: data.name,
        description: data.description
      }

        let display = ''
        display += `<a href="./product.html?id=${product.id}">
                        <article>
                            <img src=${product.imageUrl} alt="${product.altTxt}">
                            <h3 class="productName">${product.name}</h3>
                            <p class="productDescription">${product.description}</p>
                        </article>
                    </a>`
        document.getElementById('items').insertAdjacentHTML("beforeend", display)
    }
})
  .catch((err) => console.log('server unavailable:' + err));
}


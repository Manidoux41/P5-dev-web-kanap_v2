dataFetch();

// Récupération des articles de l'API
async function getArticles() {
    var products = await fetch("http://localhost:3000/api/products")
    return await products.json();
}

    // Répartition des données de l'API dans le DOM
async function dataFetch() {
    var result = await getArticles ()
    .then(function (data){
        const articles = data;
        //console.table(articles);
        for (let article in articles) {

            // Insertion de l'élément "a"
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.href = `product.html?id=${data[article]._id}`;

            // Insertion de l'élément "article"
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            // Insertion de l'image
            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = data[article].imageUrl;
            productImg.alt = data[article].altTxt;

            // Insertion du titre "h3"
            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = data[article].name;

            // Insertion de la description "p"
            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productName");
            productDescription.innerHTML = data[article].description;
        }
    })
    .catch (err => console.log('server unavailable:' + err));
}
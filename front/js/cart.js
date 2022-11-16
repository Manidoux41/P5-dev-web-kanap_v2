// sélection de cart_items 
let cartItems = document.getElementById('cart__items')

// let article = document.createElement('article')
// article.classList.add('cart__item')
// article.setAttribute('data-id', "product-Id")
// article.setAttribute('data-color', "product-color")

// cartItems.appendChild(article)

// const cartImgDiv = document.createElement('div')
// cartImgDiv.classList.add('cart__item__img')
// const imgInDiv = document.createElement('img')
// imgInDiv.src("../images/product01.jpg")
// imgInDiv.alt("Photographie")
// cartImgDiv.append(imgInDiv)
// article.appendChild(cartImgDiv)

let articleDisplay = ''
articleDisplay = `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
<div class="cart__item__img">
  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>Nom du produit</h2>
    <p>Vert</p>
    <p>42,00 €</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>`

cartItems.insertAdjacentHTML("afterbegin", articleDisplay);
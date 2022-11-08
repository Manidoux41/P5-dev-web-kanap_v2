console.log('Ca fonctionne');

let url = 'http://localhost:3000/api/products'

fetch(url)
  .then((response) => {
    response.json()
    .then((data) => {
        console.log(data);
    })    
})
  .catch(err => console.log('Erreur: ' + err)); 

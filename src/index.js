// index.js

// Callbacks
const handleClick = (ramen) => {
  // Add code
  const detailImg = document.getElementById("ramen-detail");
  const detailName = document.querySelector("#ramen-detail .name");
  const detailRestaurant = document.querySelector("#ramen-detail .restaurant");
  const detailsRating = document.getElementById("rating-display");
  const detailsComment = document.getElementById("comment-display");

  detailImg.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailsRating.textContent = ramen.rating;
  detailsComment.textContent = ramen.comment;

};

const addSubmitListener = () => {
  // Add code
  
  // const form = document.querySelector('#new-ramen');


  document.querySelector('#new-ramen').addEventListener('submit', async (event)=>{
    event.preventDefault()

    let name = document.getElementById("new-name").value
    let restaurant = document.getElementById("new-restaurant").value
    let image = document.getElementById("new-image").value
    let rating = parseInt(document.getElementById("new-rating").value)
    let comment = document.getElementById("new-comment").value

    const newRamen = {name, restaurant, image, rating, comment}

    try{
      await fetch("http://localhost:3000/ramens", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRamen)
      });
      displayRamens()
    }catch(error){
      console.error('error when adding ramen:', error)
    }
  })

}

const displayRamens = async () => {
  // Add code
  fetch("http://localhost:3000/ramens")
  .then(response => response.json())
  .then(ramenData => {
    const ramens = ramenData;
    const ramenMenu = document.getElementById('ramen-menu')

    ramens.forEach(ramen => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name
      ramenMenu.appendChild(img)

    });
  })
  .catch(error => {
    console.error('Error:', error)
  })
};
const main = () => {
  // Invoke displayRamens here
  displayRamens()
  // Invoke addSubmitListener here
  addSubmitListener();
  // handleClick()
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
document.addEventListener('DOMContentLoaded', main);


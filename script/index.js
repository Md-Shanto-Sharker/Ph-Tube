function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => {
      displayCategories(data.categories);
    });
}
function displayCategories(categories) {
 const categoryContainer = document.getElementById("category-container");
 for(let cat of categories){
    console.log(cat);
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML=`<button class="btn btn-sm hover:bg-red-600 hover:text-white">${cat.category}</button>`
    categoryContainer.appendChild(categoryDiv)
 }
}
loadCategories();























// const loadData = () => {
//   fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
//     .then((res) => res.json())
//     .then((data) => display(data.categories));
// };

// const display = (users) => {
//   const container = document.getElementById("category-container");
//   for (let cat of users) {
//     const containerDiv = document.createElement("div");
//     containerDiv.innerHTML = `<button class="btn btn-sm hover:bg-red-600 hover:text-white">${cat.category}</button>`;
//     container.appendChild(containerDiv);
//   }
// };

// loadData();

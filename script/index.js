const removeActiveClass= ()=>{
  const activeClass=document.getElementsByClassName('active');
  for(let active of activeClass){
    active.classList.remove('active')
  }
}

function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => {
      displayCategories(data.categories);
    });
}

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
  .then((data) => {
    removeActiveClass();
    document.getElementById('btn-all').classList.add('active')
    displayVideos(data.videos)
  });
}
const loadCategoryVideos = (id) => {
  const url = ` https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then ((data) =>{
      removeActiveClass()
      const clickedButton = document.getElementById(`btn${id}`);
      clickedButton.classList.add('active')
      displayVideos(data.category)
    });
};
const loadVideosDetails =(video)=>{
  const url =(`https://openapi.programming-hero.com/api/phero-tube/video/${video}`)
  fetch(url)
  .then(res=>res.json())
  .then(data=>displayVideoDetails(data.video))
}

const displayVideoDetails = (user)=>{
  document.getElementById('video_details').showModal();
  const detailsContainer = document.getElementById('details-container');
  detailsContainer.innerHTML=`<div class="card bg-base-100 image-full  shadow-sm">
  <figure>
    <img
      src="${user.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>`
}
function displayCategories(categories) {
  const categoryContainer = document.getElementById("category-container");
  for (let cat of categories) {
    // console.log(cat);
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `<button id="btn${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-red-600 hover:text-white">${cat.category}</button>`;
    categoryContainer.appendChild(categoryDiv);
  }
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  if(videos.length ===0){
    videoContainer.innerHTML=`
     <div class="py-20 col-span-full flex flex-col justify-center items-center text-center">
      <img class="w-[120px]" src="./assests/Icon.png" alt=""/>
      <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
    </div>
    `
    return;
  }
  videos.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
     <div class="card bg-base-100 ">
        <figure class="relative">
          <img class='w-full h-[150px] object-cover'
            src="${video.thumbnail}"
            alt="Shoes" />
            <span class="absolute bottom-2 right-2 text-white text-sm rounded bg-black px-2">3hrs 56 min ago</span>
        </figure>

        <div class="flex gap-3 px-0 py-5">
          <div class="profile">
            <div class="avatar">
              <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                <img src="${video.authors[0].profile_picture}" />
              </div>
            </div>
          </div>

          <div class="intro">
            <h2  class="text-sm font-semibold">Midnight Serenade</h2>
            <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name}
              ${video.authors[0].verified === true?`<img class='w-4 h-4' src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">`:``}
              </p>
            <p class="text-sm text-gray-400">${video.others.views}</p>
          </div>
        </div>
        <button onclick="loadVideosDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
      </div>`;
    videoContainer.append(videoCard);
  });
};

document.getElementById('search-input').addEventListener('keyup',(event)=>{
  const input = event.target.value;
  console.log(input);
})
loadCategories();

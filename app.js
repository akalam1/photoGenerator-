//authtication code copied from online acnt signup for now thefofe cant genrate code 
const auth = "563492ad6f91700001000001ee22167b972f463aa1774618449c85b4";

//all the tages 
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitButton = document.querySelector(".submit-btn");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");

let searchValue;
let page = 1;
let fetchLink;
let currentInput;

//evemt listener 
// setting an event lister to the inout of what we are typing and then grabbing it using a function

searchInput.addEventListener("input", updateInput);

// and then adding another event lister to the firm, once form is submitted, we passed that inputted data to the 
//search photo fynction to get the photis of the inputted valies 
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    currentInput = searchValue;
    searchPhotos(searchValue);
});

more.addEventListener("click", loadMore);


function updateInput(e){
    searchValue = e.target.value;
    // console.log(e.target.value);
    }


async function fetchApi(url){
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers:{
            accept: 'application/json',
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    return data;
}



function generatePicture(data){

    data.photos.forEach((photo) => {
        console.log(photo);
        //lets create a div and now the photo has access to all individiul 15 photos 
        const galleryImg = document.createElement("div");

        galleryImg.classList.add("gallery-img");

        galleryImg.innerHTML = 
        
        `
        
        <div class="gallery-info">
        <p> ${photo.photographer}</p>
        <a href="${photo.src.original}">Download</a>
        </div>
        <img src= ${photo.src.large}></img>


        `;

        gallery.appendChild(galleryImg);
            });
            
}


//curated photos api link
async function curatedPhotos() {
    // fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchLink);
    // so the data has all of the 15 pictures that we genarted from the api get request
    // now lets loop over all and get them ine by one 
    //and dispay it to the webkitURL, well be crating a dynamically div and adding img 
generatePicture(data);
  }




  async function searchPhotos(query) {
    clear();
    //https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`
        // so the data has all of the 15 pictures that we genarted from the api get request
    // now lets loop over all and get them ine by one 
    //and dispay it to the webkitURL, well be crating a dynamically div and adding img 
    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
    const data = await fetchApi(fetchLink);
  
    generatePicture(data);
      }



      function clear() {
        gallery.innerHTML = "";
        searchInput.value = "";
      }


      async function loadMore() {

        page++;
        if (currentInput) {
            fetchLink = `https://api.pexels.com/v1/search?query=${currentInput}&per_page=15&page=${page}`;
          } else {
            fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
          }

          const data = await fetchApi(fetchLink);
        generatePicture(data);
        
      }


  curatedPhotos();
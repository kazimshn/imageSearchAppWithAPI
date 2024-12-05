const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const input = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#cleanButton");
const imageListWrapper = document.querySelector(".imageList-wrapper")

runEventListeners();

function runEventListeners(){
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clean);
}

function clean(e){
    searchInput.value="";
   // Array.from(imageListWrapper.children).forEach((child)=>child.remove()); // veya;
   imageListWrapper.innerHTML =""
}

function search (e){
    
    const value = input.value.trim();

    // '?' bu url adresine parametre vermek için kullanılır.
    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
        //2. parametreyi dolduruyoruz.
        method : "GET",
        headers :{
            Authorization : "Client-ID kv0mouO-Ta6dl-vVOiLPaNQ1lA1ZsM13U7o5kEMKbEg"
        }
    })
    .then((res)=> res.json())
    .then((data)=>{//data'nın içindeki results verilerini alacağız.
        Array.from(data.results).forEach((image)=>addImageToUI(image.urls.small))
        })
    .catch((err)=> console.log("Sayfa temizlendi."))

    e.preventDefault();
}

function addImageToUI(url){
    const div = document.createElement("div");
    div.className="card";

    const img = document.createElement("img");
    img.setAttribute("src", url);
    img.height='300';
    img.width='300';

    div.appendChild(img);
    imageListWrapper.appendChild(div);
}
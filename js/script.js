// PreLoader

window.addEventListener("load",function(){
    document.querySelector(".preloader").classList.add("opacity-0");
    setTimeout(function(){
    document.querySelector(".preloader").style.display = "none";
    },1000)
});



// Portfolio Item Code
let filterContainer = document.querySelector(".portfolio-filter"),
    filterBtns = filterContainer.children,
    totalFilterBtn = filterBtns.length,
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    totalPortfolioItem = portfolioItems.length;

for(var i = 0; i < totalFilterBtn; i++){
    filterBtns[i].addEventListener("click",function(){
        filterContainer.querySelector(".active").classList.remove("active")
        this.classList.add("active");

        let filterValue = this.getAttribute("data-type");
        for(let l = 0; l < totalPortfolioItem; l++){
            if(filterValue === portfolioItems[l].getAttribute("data-category")){
                portfolioItems[l].classList.add("show")
                portfolioItems[l].classList.remove("hide");
            }
            else if(filterValue === "all"){
                portfolioItems[l].classList.add("show");
                portfolioItems[l].classList.remove("hide");
            }
            else{
                portfolioItems[l].classList.add("hide");
                portfolioItems[l].classList.remove("show")
            }
        }
    });
}
// ------------------------------------------------- //

// Portfolio LightBox Code

const lightBox = document.querySelector(".lightbox"),
    lightBoxImg = lightBox.querySelector(".lightbox-img"),
    lightBoxClose = lightBox.querySelector(".close-lightbox .fa"),
    lightBoxText = lightBox.querySelector(".caption-text"),
    lightBoxCounter = lightBox.querySelector(".caption-counter");
let itemIndex = 0;
for(let i = 0; i < totalPortfolioItem;i++){
    portfolioItems[i].addEventListener("click",function(){
        itemIndex = i;
        changItem();
        toggleLightbox()
    });
}
function toggleLightbox(){
    lightBox.classList.toggle("open")
} 
function changItem(){
    let imgSrc = portfolioItems[itemIndex].querySelector(".portfolio-img img").getAttribute("src");
    lightBoxImg.src = imgSrc;
    lightBoxText.innerHTML = portfolioItems[itemIndex].querySelector("h4").innerHTML;
    lightBoxCounter.textContent = (itemIndex+1) + " of " + totalPortfolioItem;
}
function nextItem(){
    if(itemIndex == totalPortfolioItem -1){
        itemIndex = 0;
    }else{
        itemIndex++;
    }
    changItem();
}
function prevItem(){
    if(itemIndex == 0){
        itemIndex = totalPortfolioItem -1;
    }else{
        itemIndex--;
    }
    changItem();
}

// Close LightBox
lightBox.addEventListener("click",function(event){
    if(event.target === lightBoxClose || event.target === lightBox){
        toggleLightbox();
    }
});


// ------------------------------------------------- //


// Aside NavBar

let nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totlaList = navList.length,
    allSection = document.querySelectorAll(".section");

for(let x = 0; x < totlaList; x++){
    let a = navList[x].querySelector("a");
    a.addEventListener("click",function(){
        for(let f = 0;f< totlaList; f++){
            
            if(navList[f].querySelector("a").classList.contains("active")){
                allSection[f].classList.add("back-section");
            }else{
                allSection[f].classList.remove("back-section");
            }
            navList[f].querySelector("a").classList.remove("active");
        }
        a.classList.add("active");
        showSection(this);

        if(window.innerWidth < 1200){
            asideSectionToggler()
        }
    });
}

function showSection(ele){
    for(let i = 0; i < allSection.length;i++){
        allSection[i].classList.remove("active");
    }
    let target = ele.getAttribute("href").split("#").join("");
    document.querySelector("#"+target).classList.add("active");
}

function updateNav(element){
    for(let i = 0;i< totlaList; i++){
        navList[i].querySelector("a").classList.remove("active");
        let target = element.getAttribute("href").split("#").join("");
        if(target === navList[i].querySelector("a").getAttribute("href").split("#").join("")){
            navList[i].querySelector("a").classList.add("active");
        }else{
            navList[i].querySelector("a").classList.remove("active");
        }
    }
}

document.querySelector(".hire-me").addEventListener("click",function(){
    let sectionIndex = this.getAttribute("data-section-index");
    showSection(this);
    updateNav(this);
    allSection[sectionIndex].classList.remove("back-section");
    allSection[sectionIndex].classList.add("back-section");
});


let navToggler = document.querySelector(".nav-toggler"),
    aside      =document.querySelector(".aside");

    navToggler.addEventListener('click',asideSectionToggler);

function asideSectionToggler(){
    aside.classList.toggle("open");
    navToggler.classList.toggle("open");
    for(let i = 0; i < allSection.length;i++){
        allSection[i].classList.toggle("open");
    }
}
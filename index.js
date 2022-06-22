
window.addEventListener("load", function(){
    document.querySelector(".preloader").classList.add("opacity-0");
    setTimeout(function() {
        document.querySelector(".preloader").style.display = "none"
    }, 1000);
})

// Portfolio Filter Item

const  filterContainer = document.querySelector(".portfolio-filter"),
    filterBtns = filterContainer.children,
    totalFilterBtn = filterBtns.length,
    portfolioItems = document.querySelectorAll(".portfolio-item")
    totalPortfolioItems = portfolioItems.length

for(i=0; i<totalFilterBtn; i++){
    filterBtns[i].addEventListener("click", function(){
        filterContainer.querySelector(".active").classList.remove("active");
        this.classList.add("active");
        const filterValue = this.getAttribute("data-filter");
        for(let k=0 ; k<totalPortfolioItems ; k++){
            if(filterValue ===portfolioItems[k].getAttribute("data-category")){
                portfolioItems[k].classList.remove("hide")
                portfolioItems[k].classList.add("show")
            }
            else{
                portfolioItems[k].classList.remove("show")
                portfolioItems[k].classList.add("hide")
            }
            if(filterValue === "all"){
                portfolioItems[k].classList.remove("hide")
                portfolioItems[k].classList.add("show")
            }
        }
    })
}


// Portfolio-LightBox

const lightBox = document.querySelector(".lightbox"),
    lightBoxClose = lightBox.querySelector(".lightbox-close"),
    lightBoxImg = lightBox.querySelector(".lightbox-image"),
    lightBoxText = lightBox.querySelector(".caption-text"),
    lightBoxCounter = lightBox.querySelector(".caption-counter");
let itemIndex = 0;

for(let i=0; i<totalPortfolioItems; i++){
    portfolioItems[i].addEventListener("click", function(){
        itemIndex = i
        changeItem()
        toggleItem()
    })
}

function toggleItem(){
    lightBox.classList.toggle("open")
}

function changeItem(){
    imgSrc = portfolioItems[itemIndex].querySelector(".portfolio-img img").getAttribute("src")
    lightBoxImg.src = imgSrc;
    lightBoxText.innerHTML = portfolioItems[itemIndex].querySelector("h4").innerHTML;
    lightBoxCounter.innerHTML = (itemIndex+1) + "   of   " + totalPortfolioItems;
}

// Next And Previous Icon 

function nextItem(){
    if(itemIndex === totalPortfolioItems-1){
        itemIndex=0
    }
    else{
        itemIndex++
    }
    changeItem();
}

function prevItem(){
    if(itemIndex === 0){
        itemIndex= totalPortfolioItems-1
    }
    else{
        itemIndex--
    }
    changeItem();
}

// Close lightBox

lightBox.addEventListener("click" , function(event){
    if(event.target === lightBoxClose || event.target === lightBox){
        toggleItem();
    }
})

// Portfolio Section End

// Nav bar 
const nav =document.querySelector(".nav"),
    navList = document.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;

for(let i=0; i<totalNavList; i++){
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function(){

        // remove back-sec
        removeBackSection();

        for(let j=0; j<totalNavList;j++){
            //add back-sec
            if(navList[j].querySelector("a").classList.contains("active")){
                addBackSection(j)
            }
            navList[j].querySelector("a").classList.remove("active")
        }
        this.classList.add("active")
        showSection(this)
    })
}

function showSection(element){
    for(let i=0; i<totalSection; i++){
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1]
    document.querySelector("#"+target).classList.add("active")
}

function removeBackSection(){
    for(let i=0; i<totalSection; i++){
        allSection[i].classList.remove("back-section")
    }
}

function addBackSection(num){
    allSection[num].classList.add("back-section")
}

function updateNav(element){
    for(let i =0; i<totalNavList; i++){
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1]
        if(target===navList[i].querySelector("a").getAttribute("href").split("#")[1]){
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

document.querySelector(".hire-me").addEventListener("click",function(){
    const sectionIndex = this.getAttribute("data-section-index")
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex)
})

const navTogglerBtn = document.querySelector(".nav-toggler"),
aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", ()=>{
    asideSelectionTogglerBtn();
})

function asideSelectionTogglerBtn(){
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for(let i=0; i<totalSection; i++){
        allSection[i].classList.toggle("open");
    }
}
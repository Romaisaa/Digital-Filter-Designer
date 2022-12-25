let lArrow = document.querySelector(".l-arrow")
let rArrow = document.querySelector(".r-arrow")
let catalogImgs = document.getElementsByClassName("catalog-img")
var exIndex = 0
var rimgPos = 1
var limgPos = 1
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("arrow")) {
        for (i = 0; i < catalogImgs.length; i++){
            if (catalogImgs[i].classList.contains("selected-catalog-img")) { exIndex = catalogImgs[i].classList[1][2] }
            catalogImgs[i].classList.remove("selected-catalog-img")
        }
        if (e.target == lArrow) {
            catalogImgs[exIndex - 1].classList.add("selected-catalog-img") 
            scrollImgs(105)
        } else if (e.target == rArrow) {
            limgPos = 1
            catalogImgs[parseInt(exIndex) + 1].classList.add("selected-catalog-img")
            scrollImgs(-105)
        }
    }
})

function scrollImgs(e) {
    var style = window.getComputedStyle(document.querySelector(".catalog-img"));
    var matrix = new WebKitCSSMatrix(style.transform);
    console.log('translateX: ', matrix.m41);
    for (i = 0; i < catalogImgs.length; i++) { catalogImgs[i].style.transform = `translateX(calc(${e}% + ${matrix.m41}px))`; }
  }
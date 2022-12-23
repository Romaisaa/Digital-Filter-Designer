var zeros, poles 
let zContainer = document.querySelector(".z-container")
zContainer.addEventListener("click", (e) => {
    if (!e.target.classList.contains("zero") && !e.target.classList.contains("pole")) {
        addZeros(e)
    }
})

//*************************** SelectMode ***************************//
let zerosPoles = document.getElementsByClassName("z-p")
var mode = "Zeros"
document.addEventListener("click", (e) => {
    menu.classList.remove("menu-show")
    if (e.target.classList.contains("z-p")) {
        for (i = 0; i < zerosPoles.length; i++){
            zerosPoles[i].classList.remove("active-mode")
        }
        e.target.classList.add("active-mode")
        mode = e.target.innerHTML
        console.log(mode)
    }
})

//*************************** fuctions ***************************//

function addZeros(e) {
    var x = e.pageX + 'px';
    var y = e.pageY + 'px';
    let zero = document.createElement("div")
    if (mode == "Zeros") { zero.className = "item zero" }
    else if (mode == "Poles") { zero.className = "item pole" }
    zero.style.position = "absolute"
    zero.style.left = `calc(${x} - 50vw + ${zContainer.clientWidth/2}px)`
    zero.style.top = `calc(${y} - 50vh + ${zContainer.clientHeight/2}px - 45px)`
    zContainer.append(zero);
}


//*************************** move ***************************//


var el
let newPosX = 0, newPosY = 0, startPosX = 0, startPosY = 0;

// when the user clicks down on the element
document.addEventListener('mousedown', function (e) {
    if (e.target.classList.contains("zero") || e.target.classList.contains("pole")) {
        e.target.classList.add("drag")
        el = document.querySelector('.drag');
        console.log("gooo")
        console.log(el)

        e.preventDefault();
        
        // get the starting position of the cursor
        startPosX = e.clientX;
        startPosY = e.clientY;
        
        document.addEventListener('mousemove', mouseMove);
        
        document.addEventListener('mouseup', function (e) {
            e.target.classList.remove("drag")

            document.removeEventListener('mousemove', mouseMove);
        });
    }
    
});


function mouseMove(e) {
    // calculate the new position
    newPosX = startPosX - e.clientX;
    newPosY = startPosY - e.clientY;

    // with each move we also want to update the start X and Y
    startPosX = e.clientX;
    startPosY = e.clientY;
    
    // set the element's new position:
    el.style.top = (el.offsetTop - newPosY) + "px";
    el.style.left = (el.offsetLeft - newPosX) + "px";
}

////////////////////////////////////////////////////////
let menu = document.querySelector(".menu")
var selected
document.addEventListener("contextmenu", (e) => {
    // e.preventDefault()
    if (e.target.classList.contains("zero") || e.target.classList.contains("pole")) {
        items = document.getElementsByClassName("item")
        for (i = 0; i < items.length; i++){
            items[i].classList.remove("selected")
            items[i].classList.remove("selected-zero")
            items[i].classList.remove("selected-pole")
        }
        var x = e.pageX + 'px';
        var y = e.pageY + 'px';
        menu.style.left = x
        menu.style.top = y
        menu.classList.toggle("menu-show")
        if (e.target.classList.contains("zero")){
            menu.querySelector(".option").innerHTML = "Convert to pole"
            e.target.classList.add("selected-zero")
            e.target.classList.add("selected")
            selected = "zero"
        } else {
            menu.querySelector(".option").innerHTML = "Convert to zero"
            e.target.classList.add("selected-pole")
            e.target.classList.add("selected")
            selected = "pole"
        }

    }
})

let convert = document.querySelector(".convert")
convert.addEventListener("click", (e) => {
    if (selected == "zero"){
        document.querySelector(".selected-zero").className = "pole"
    } else {
        document.querySelector(".selected-pole").className = "zero"
    }
})

let deletebtn = document.querySelector(".delete")
deletebtn.addEventListener("click", (e) => {
    document.querySelector(".selected").remove()
})

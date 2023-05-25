// Check For Local Storage

let mainColors = localStorage.getItem("color")

if(mainColors !== null){
  let color = mainColors
  document.documentElement.style.setProperty("--main-color", color)
}

// ################## Settings Box ##################

document.querySelector(".toggle-settings i").onclick = function(){
  this.classList.toggle("fa-spin")
  document.querySelector(".settings").classList.toggle("open")
}

// Switch Color
let colorsLi = document.querySelectorAll(".colors-list li")

colorsLi.forEach((li) => {
  li.onclick = function(){
    let color = this.dataset.color
    // Change The main-color variable to The Color
    document.documentElement.style.setProperty("--main-color", color)
    // Set Color To Local Storage
    localStorage.setItem("color", color)
  }
})

// Switch Random BG

let bgBtns = document.querySelectorAll(".random-bg span")
let bgOption = true
let bgInterval

bgBtns.forEach((span) => {
  span.addEventListener("click",function(e){
    // Remove Active Class From All Spans
    bgBtns.forEach((el) => {
      el.classList.remove("active")
    })
    this.classList.add("active")

    if(this.dataset.bg == "yes"){
      bgOption = true
      randomize()
      localStorage.setItem("background", true)
    }else{
      bgOption = false
      clearInterval(bgInterval)
      localStorage.setItem("background", false)
    }
  })
})

// Check in The Local Storage
let bgItem = localStorage.getItem("background")

if(bgItem !== null){
  if(bgItem === "true"){
    bgOption = true
  }else{
    bgOption = false
  }

  // Remove Active Class From All Spans

  document.querySelectorAll(".random-bg span").forEach((ele) => {
    ele.classList.remove("active")
  })

  if(bgItem === "true"){
    document.querySelector(".yes").classList.add("active")
  }else{
    document.querySelector(".no").classList.add("active")
  }
}

// Bullets Option

let bulletsSpan = document.querySelectorAll(".bullets-option span") 
let navBullets = document.querySelector(".nav-bullets")
let bulletLocalItem = localStorage.getItem("bullets")

if(bulletLocalItem !== null){
  bulletsSpan.forEach(span => {
    span.classList.remove("active")
  })
  if(bulletLocalItem === "true"){
    navBullets.style.display = "block"
    document.querySelector(".bullets-option .yes").classList.add("active")
  }else{
    navBullets.style.display = "none"
    document.querySelector(".bullets-option .no").classList.add("active")
  }
}

bulletsSpan.forEach(span => {
  span.addEventListener("click", (e) => {
    bulletsSpan.forEach(e => {
      e.classList.remove("active")
    })
    if(span.dataset.display === "show"){
      navBullets.style.display = "block"
      span.classList.add("active")
      localStorage.setItem("bullets", true)
    }else{
      navBullets.style.display = "none"
      span.classList.add("active")
      localStorage.setItem("bullets", false)
    }
  })
})

// Reset Button

document.querySelector(".reset-options").onclick = function(){
  localStorage.clear()
  window.location.reload()
}

// ################## Landing Page BG ##################

let page = document.querySelector(".landing")
let imgs = ["shuffle-4.jpg", "shuffle-1.jpg", "shuffle-2.jpg", "shuffle-3.jpg"]

function randomize(){
  if(bgOption === true){
    bgInterval = setInterval(() => {
      // Random Number
      let randomNum = Math.floor(Math.random() * imgs.length)
    
      page.style.background = `url('img/${imgs[randomNum]}')`
    }, 10000)
  }
}
randomize()


// ################## Progress Animation ##################

let skills = document.querySelector(".skills")

window.onscroll = function(){
  let skillOffsetTop = skills.offsetTop

  if(window.scrollY >= skillOffsetTop - 300){
    document.querySelectorAll(".skills .prog span").forEach((ele) => {
      ele.style.width = ele.dataset.prog
    })
  }
}

// ################## Gallary Popup ##################

let gallary = document.querySelectorAll(".gallary img").forEach((img) => {
  img.addEventListener("click", (e) => {

    // Create Overlay
    let overlay = document.createElement("div")
    overlay.className = "popup"
    // Append To The Body
    document.body.appendChild(overlay)

    // Create The Popup

    let popupBox = document.createElement("div")
    // Append The Popup To The Body
    document.body.appendChild(popupBox) 
    popupBox.className = "popup-box"
    setTimeout(function(){
      popupBox.style.opacity="1"
    },10)
    // Create Heading
    let imgHeading = document.createElement("h3")
    imgHeading.appendChild(document.createTextNode(img.alt))
    // Append The Heading To The Popup
    popupBox.appendChild(imgHeading)
    // Create The Image
    let popupImg = document.createElement("img")
    popupImg.setAttribute("src", img.src)
    // Add The image To The Popup
    popupBox.appendChild(popupImg)
    // Create The Close Span
    let closeBtn = document.createElement("span")
    closeBtn.appendChild(document.createTextNode("X"))
    closeBtn.className = "close"
    // Append The Btn To The Popup
    popupBox.appendChild(closeBtn)
  })
})
// Close Popup

document.addEventListener("click",(e) => {
  if(e.target.className == "close"){
    e.target.parentElement.remove()
    document.querySelector(".popup").remove()
  }
})

// ################## Navigation Bullets ##################

let bullets = document.querySelectorAll(".nav-bullets .bullet")

bullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    window.scrollTo({
      top: document.querySelector(e.target.dataset.scroll).offsetTop,
      behavior: "smooth"
    })
  })
})
let sections = document.querySelectorAll(".section")


window.addEventListener("scroll", () => {
  // Loop On All Sections
  sections.forEach((section) => {
    let sectionName = section.className.replace(" section",'') // Ex: landing
    let sectionQuery = document.querySelector("."+ sectionName) // Ex: .landing
    if(scrollY >= sectionQuery.offsetTop){ // Pass Through The Section
      bullets.forEach((e) => {
        e.classList.remove("active")
        if(e.dataset.scroll == "."+sectionName){
          e.classList.add("active")
        }
      })
    }
  })
  // Remove Active When Going To Landing Page
  if(scrollY < document.querySelector(".landing").clientHeight){
    bullets.forEach(e => {
      e.classList.remove("active")
    })
  }
})

// ################## Toggle Menu ##################

let toggleBtn = document.querySelector(".toggle-menu")
let links = document.querySelector(".links-container ul")

toggleBtn.onclick = function(e){
  e.stopPropagation()
  this.classList.toggle("active")
  links.classList.toggle("open")
}

// Blur On Menu

document.addEventListener("click",(e) => {
  if(e.target !== toggleBtn && e.target !== links){
    if(links.classList.contains("open")){
      links.classList.toggle("open")
      toggleBtn.classList.toggle("active")
    }
  }
})
// Stop The Propagation in The ul
links.onclick = (e) => {
  e.stopPropagation()
}
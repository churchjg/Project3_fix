/*
Site info - https://www.themealdb.com/api.php
*/

let mainUrl = "https://www.themealdb.com/api/json/v1/1/random.php"
let recipe = document.querySelectorAll('.recipe')
let boxes = document.querySelectorAll('.boxes')
let body = document.querySelector('main')
let modalContainer = document.querySelector('.modal_container')
let modal = document.querySelector('.modal')
let closeButton = document.querySelector('.close-box')
let images = document.querySelectorAll('.meal-img')
let contentBox = document.querySelector('#recipe-content')
let modalBody = document.querySelector('.modal-body')
let modalImage = document.querySelector('.modal-image')

closeBoxButton = (evt) => {
    evt.preventDefault()
    modalContainer.style.zIndex = -1
    modalContainer.style.opacity = 0
    modal.style.zIndex = -1
    modal.style.opacity = 0
    contentBox.innerText = " "
    modal.classList.remove('show-modal')

}
closeButton.addEventListener("click", closeBoxButton)

for (let i = 0; i < boxes.length; i++) {
    fetch(mainUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let image = data.meals[0].strMealThumb
            images[i].setAttribute('src', image)
            let source = data.meals[0].strMeal
            recipe[i].innerText = source

            function showRecipe() {
                recipe[i].classList.add('show-text')
                images[i].classList.add('stretch-img')
                images[i].classList.remove('shrink-img')
            }
            boxes[i].addEventListener('mouseenter', showRecipe)

            function removeRecipe() {
                recipe[i].classList.remove('show-text')
                images[i].classList.remove('stretch-img')
                images[i].classList.add('shrink-img')
            }
            boxes[i].addEventListener('mouseleave', removeRecipe)

            function showModal(evt) {
                evt.preventDefault()
                recipe[i].classList.remove('show-text')
                modal.style.zIndex = 2000
                modal.style.opacity = 1
                modalContainer.style.zIndex = 1
                modalContainer.style.opacity = 1


                modal.classList.add('show-modal')

                let modalMeal = document.querySelector('.modal_meal')
                modalMeal.innerHTML = source

                let modalRecipe = document.querySelector('.summary')
                modalRecipe.innerHTML = `${source}${data.meals[0].strInstructions}`

                modalImage.style.backgroundImage = `url(${image})`
            }
            boxes[i].addEventListener('click', showModal)
        })
}
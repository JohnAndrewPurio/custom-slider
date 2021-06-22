const slider = document.querySelector('.slider')
const button = document.querySelector('.button')
const value = document.querySelector('h3')
const css = document.documentElement.style
const offset = button.offsetWidth / 2
const windowOffset = (window.innerWidth / 2) - (slider.offsetWidth / 2)
const sliderOffset = window.innerWidth - windowOffset

let buttonPressed = false
let currentX = (slider.innerWidth / 2) - (offset) //Middle X offset

//Set the button to the middle of the slider
css.setProperty('--button-x-coord', `${currentX}px`)

//If button div is pressed(param = true), change cursor else(param = false) revert back to default cursor
function onMouseEvent(param) {
    buttonPressed = param

    if (buttonPressed) {
        css.setProperty('--cursor', 'pointer')

        return
    }

    css.setProperty('--cursor', 'default')
}

//On mouseMove in the slider, if the button is pressed, resize the left and right windows while moving the button
function onMouseMove() {
    if (buttonPressed && withinBounds(event.clientX)) {
        currentX = ((event.clientX - windowOffset) / (sliderOffset - windowOffset)) * slider.offsetWidth
        const leftPercent = (100 * currentX / slider.offsetWidth) - offset / (slider.offsetWidth / 2)
        const rightPercent = (100 - leftPercent)
        value.innerText = `Value: ${Math.ceil(leftPercent)}%`
        css.setProperty('--button-x-coord', `${currentX - offset}px`)
        css.setProperty('--left-slider-width', `${leftPercent}%`)
        css.setProperty('--right-slider-width', `${rightPercent}%`)
    }
}

function withinBounds(val) {
    return val >= windowOffset && val <= sliderOffset
}
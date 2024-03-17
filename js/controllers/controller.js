'use strict'

let gElCanvas
let gCtx

function init() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
}

function downloadImg(elLink) {
    console.log(elLink);
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function addTextBox() {

}


// contenteditable
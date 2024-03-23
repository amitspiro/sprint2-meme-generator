'use strict'
let gElSaved =document.querySelector('.main-saved-container')


function loadMemeGallery() {
    return loadFromStorage('saved-memes')
  }
  function addToSavedMemeGallery(newMeme) {
    let savedMemes = loadFromStorage('saved-memes')
    if (!savedMemes || !savedMemes.length) savedMemes = [newMeme]
    else savedMemes.unshift(newMeme)
    saveToStorage('saved-memes', savedMemes)
    // renderSavedMemeGallery()
  }
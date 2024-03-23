'use strict'

function onSaveToSavedGallery() {
    const imgData = gElCanvas.toDataURL()
    let meme = { imgData: imgData, selectedImgId: gMeme.selectedImgId }
    console.log(meme);
    addToSavedMemeGallery(meme)
  }
  
  function onOpenSaved(){
    gElGallery.style.display = 'none';
    gElEditor.style.display = 'none';
    gElRandomMeme.style.display = 'none';
    gElSaved.style.display='flex'
    renderSavedMemeGallery()
  }
  function renderSavedMemeGallery() {
    const savedMemes = loadMemeGallery()
    if (!savedMemes || !savedMemes.length) {
      alert('no memes were saved yet...')
      return
    }else{
        gElSaved.innerHTML = ''
      const strHTMLs = savedMemes.map((savedMeme) => {
            return `
            <div class='saved-meme'> 
            <img class='saved-meme-img' src="${savedMeme.imgData}">
            </div>
            `
          });
          gElSaved.innerHTML += strHTMLs
    }
  }
  

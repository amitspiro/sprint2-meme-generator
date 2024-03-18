'use strict'

function renderGallery() {
    // console.log('hi');
    const imgs = getImgs()
    const strHTMLs = imgs.map((img) => {
      return `
      <article>
      <img onclick="onImgSelect(${img.id})" class="gallery-img"
      src="imgs-square/${img.url}" />
      </article>`
    })
    
    const elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.innerHTML = strHTMLs.join('')
    // console.log('hi hi');
  }
  function openGallery(){
    gElGallery.style.display='block'
    gElEditor.style.display='none'
  }
  
  function onImgSelect(imgId) {
    // console.log('hi ', imgId);
    setImg(imgId)
    gElGallery.style.display='none'
    gElEditor.style.display='block'
    renderMeme()
    
  }
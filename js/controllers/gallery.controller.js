"use strict";
let gFilterBy = "";

function renderGallery() {
  const imgs = getImgs(gFilterBy);
  const strHTMLs = imgs.map((img) => {
    return `
      <article>
      <img onclick="onImgSelect(${img.id})" class="gallery-img"
      src="imgs/imgs-square/${img.url}" />
      </article>`;
  });

  const elGalleryContainer = document.querySelector(".gallery-container");
  elGalleryContainer.innerHTML = strHTMLs.join("");
}
function openGallery() {
  gElGallery.style.display = "block";
  gElEditor.style.display = "none";
  gElRandomMeme.style.display = "none";
  gElSaved.style.display='none'

}

function onImgSelect(imgId) {
  setImg(imgId);
  gElSaved.style.display='none'
  gElGallery.style.display = "none";
  gElEditor.style.display = "grid";
  renderMeme();
}

function onMemeFilter() {
  const input = document.querySelector(".meme-search");
  gFilterBy = input.value;
  renderGallery();
}

function downloadImg(elLink) {
  renderMeme(true);
  const imgContent = gElCanvas.toDataURL("image/jpeg"); // image/jpeg the default format
  elLink.href = imgContent;
}

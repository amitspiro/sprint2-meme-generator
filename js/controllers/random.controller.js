"use strict";

function openRandom() {
  let location = getRandomIntInclusive(1, gRandomImgs.length);
  console.log(location);
  gElSaved.style.display='none'
  gElGallery.style.display = "none";
  gElEditor.style.display = "none";
  gElRandomMeme.style.display = "flex";

  gElRandomMemePic.style.backgroundImage = `url('imgs/random-meme/${location}.jpg')`;
  gElRandomMemePic.style.backgroundImage = `url('imgs/random-meme/${location}.jpg')`;
}

function downloadRandomImg(elLink) {
  let imgContent= new Image()
  imgContent.crossOrigin='anonymous'
  let imgUrl = gElRandomMemePic.toDataURL("image/jpeg"); // image/jpeg the default format
imgContent.src= imgUrl
  // crossOrigin="anonymous"

  elLink.href = imgContent;
}

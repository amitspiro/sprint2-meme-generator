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
  const imgContent = gElRandomMemePic.toDataURL("image/jpeg"); // image/jpeg the default format
  elLink.href = imgContent;
}

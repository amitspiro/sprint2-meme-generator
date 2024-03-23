"use strict";
let gElGallery = document.querySelector(".main-gallery-container");
let gImgs = [
  { id: 1, url: "1.jpg", keywords: ["Trump Angry suit"] },
  { id: 2, url: "2.jpg", keywords: ["Dog Cute animal"] },
  { id: 3, url: "3.jpg", keywords: ["Dog Baby bed"] },
  { id: 4, url: "4.jpg", keywords: ["Cat Computer keyboard"] },
  { id: 5, url: "5.jpg", keywords: ["Baby Funny beach"] },
  { id: 6, url: "6.jpg", keywords: ["Funny Guy history"] },
  { id: 7, url: "7.jpg", keywords: ["Funny Baby stripes"] },
  { id: 8, url: "8.jpg", keywords: ["Creepy Funny suit"] },
  { id: 9, url: "9.jpg", keywords: ["Funny Baby"] },
  { id: 10, url: "10.jpg", keywords: ["Funny Obama smile"] },
  { id: 11, url: "11.jpg", keywords: ["Kiss WWE men"] },
  { id: 12, url: "12.jpg", keywords: ["You Old Man glasses"] },
  { id: 13, url: "13.jpg", keywords: ["Drink Cheers actor suit"] },
  { id: 14, url: "14.jpg", keywords: ["Matrix Dramatic glasses"] },
  { id: 15, url: "15.jpg", keywords: ["One Thing Funny"] },
  { id: 16, url: "16.jpg", keywords: ["Laughing Funny scifi sci-fi"] },
  { id: 17, url: "17.jpg", keywords: ["Putin Two suit"] },
  { id: 18, url: "18.jpg", keywords: ["Toy Story Look cartoon"] },
];

function getImgs(filterBy) {
  if (!filterBy) return gImgs;
  let filterImgs = gImgs.filter((img) =>
    img.keywords[0].toLowerCase().includes(filterBy.toLowerCase())
  );

  return filterImgs;
}
function setImg(imgId) {
  gMeme.selectedImgId = imgId;
}

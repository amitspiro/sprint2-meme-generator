"use strict";
// var gCanvas = document.getElementById("my-canvas");
var gImgs = [
  { id: 1, url: "1.jpg", keywords: ["Trump", "Angry"] },
  { id: 2, url: "2.jpg", keywords: ["Dog", "Cute"] },
  { id: 3, url: "3.jpg", keywords: ["Dog", "Baby"] },
  { id: 4, url: "4.jpg", keywords: ["Cat", "Computer"] },
  { id: 5, url: "5.jpg", keywords: ["Baby", "Funny"] },
  { id: 6, url: "6.jpg", keywords: ["Funny", "Guy"] },
  { id: 7, url: "7.jpg", keywords: ["Funny", "Baby"] },
  { id: 8, url: "8.jpg", keywords: ["Creepy", "Funny"] },
  { id: 9, url: "9.jpg", keywords: ["Funny", "Baby"] },
  { id: 10, url: "10.jpg", keywords: ["Funny", "Obama"] },
  { id: 11, url: "11.jpg", keywords: ["Kiss", "WWE"] },
  { id: 12, url: "12.jpg", keywords: ["You", "Old Man"] },
  { id: 13, url: "13.jpg", keywords: ["Drink", "Cheers"] },
  { id: 14, url: "14.jpg", keywords: ["Matrix", "Dramatic"] },
  { id: 15, url: "15.jpg", keywords: ["One Thing", "Funny"] },
  { id: 16, url: "16.jpg", keywords: ["Laughing", "Funny"] },
  { id: 17, url: "17.jpg", keywords: ["Putin", "Two"] },
  { id: 18, url: "18.jpg", keywords: ["Toy Story", "Look"] },
];
var gElGallery = document.querySelector(".main-gallery-container");
var gElEditor = document.querySelector(".meme-editor");
var gCtx;
var gCanvas = document.getElementById("my-canvas");

var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  WroteSecondTxt: false,
  WroteThirdTxt: false,
  lines: [
    {
      isSelected: false,
      txt: "type text",
      size: 80,
      align: "center",
      color: "white",
      x: gCanvas.width / 2,
      y: 60,
    },
  ],
};

function addNewLine(txt = "Add Text") {
  var lastY;
  var lastText = gMeme.lines[gMeme.lines.length - 1];
  if (!lastText) lastY = 0;
  else lastY = lastText.y;

  gMeme.lines.push({
    isSelected: false,
    txt: "",
    size: 40,
    color: "white",
    x: gCanvas.width / 2,
    y: getNextLineTxt(lastY),
  });

  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function getNextLineTxt(lastY) {
  const meme = getMeme();
  if (!meme.WroteSecondTxt) {
    meme.WroteSecondTxt = true;
    return gCanvas.height - 40;
  }
  if (meme.WroteSecondTxt && !meme.WroteThirdTxt) {
    meme.WroteThirdTxt = true;
    return 110;
  }
  return lastY + 50;
}

function getMeme() {
  return gMeme;
}

function getImgById(selectedImgId) {
  const img = gImgs.find((img) => img.id === selectedImgId);
  return img.url;
}

function getImgs() {
  return gImgs;
}
function setLineTxt(userTxt) {
  const selectedLine = getSelectedLine();
  selectedLine.txt = userTxt;
  // renderMeme()???
}
function getSelectedLine() {
  return gMeme.lines[gMeme.selectedLineIdx];
}
function setMemeFillColor(userColor) {
  const selecetedLine = getSelectedLine();
  selecetedLine.color = userColor;
}

function setMemeBorderColor(userColor) {
  const selecetedLine = getSelectedLine();
  selecetedLine.strokeStyle = userColor;
  selecetedLine.lineWidth = 5;
}
// selecetedLine.color = userColor
// gCtx.lineWidth = 4

// strokeRect ???

function setImg(imgId) {
  gMeme.selectedImgId = imgId;
}

"use strict";

// const gCanvas=document.getElementById('#my-canvas')

function onInit() {
  gCanvas = document.getElementById("my-canvas");
  // console.log(gCanvas);
  gCtx = gCanvas.getContext("2d");
  renderGallery();
  renderMeme();
}

function renderMeme(isDownload = false) {
  const meme = getMeme();
  const memeLines = meme.lines;
  const memeImg = getImgById(meme.selectedImgId);
  // console.log(memeImg);
  var img = new Image();
  // imgs-square/${img.url}
  img.src = `imgs-square/${memeImg}`;
  // console.log(img);
  // console.log(gCtx);
  // console.log(gCanvas);
  // console.log(gCanvas.width);
  // console.log(gCanvas.height);
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    memeLines.forEach((memeLine, idx) => {
      const memeIsSelected = idx === meme.selectedLineIdx;
      drawTxt(memeLine, memeIsSelected, isDownload);
    });
  };
}

function drawTxt(memeLine, isSelected, isDownload) {
  const { txt, font, size, color, align, x, y } = memeLine;

  gCtx.lineWidth = 2;
  gCtx.strokeStyle = "black";
  gCtx.fillStyle = color;
  gCtx.textAlign = align;
  gCtx.font = `${size}px ${font}`;
  var textWidth = gCtx.measureText(txt).width;
  var lineHeight = size * 1.286;
  gCtx.textBaseline = "middle";
  var xDiff = x - textWidth / 2 - 10;
  var yDiff = y - lineHeight / 2;
  gCtx.fillText(txt, x, y);
  gCtx.strokeText(txt, x, y);

  if (isSelected && !isDownload) {
    // gCtx.strokeStyle = 'grey'
    gCtx.strokeRect(xDiff, yDiff, textWidth + 20, lineHeight);
  }
}

function downloadImg(elLink) {
  renderMeme(true);
  // console.log(elLink);
  const imgContent = gCanvas.toDataURL("image/jpeg"); // image/jpeg the default format
  elLink.href = imgContent;
}

function onAddLine() {
  addNewLine();
  renderMeme();
}

function onTextInput(userTxt) {
  setLineTxt(userTxt);
  renderMeme();
}

function changeFillColor(color) {
  setMemeFillColor(color);
  renderMeme();
}

function changeBorderColor(color) {
  setMemeBorderColor(color);
  renderMeme();
}

function onSwitchLine() {
  changeSelectedLine();
  renderMeme();
}

function changeSelectedLine() {
  gMeme.selectedLineIdx++;
  if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0;
}

function fontUp() {
  const selectedLine = getSelectedLine();
  selectedLine.size += 5;
  renderMeme();
}

function fontDown() {
  const selectedLine = getSelectedLine();
  // console.log(selectedLine);
  selectedLine.size -= 5;
  // console.log(selectedLine);
  renderMeme();
}

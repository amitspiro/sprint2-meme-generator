"use strict";
let gElEditor = document.querySelector(".meme-editor");
let gCtx;
let gElCanvas = document.getElementById("my-canvas");
let gElAbout = document.querySelector(".about");

let gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  WroteSecondTxt: false,
  WroteThirdTxt: false,
  lines: [
    {
      isSelected: false,
      txt: "type text",
      size: 30,
      align: "center",
      color: "white",
      x: gElCanvas.width / 2,
      y: 60,
      isDrag: false,
      font: "impact",
    },
  ],
};
let currentDragLineIdx;

function addNewLine(txt = "Add Text") {
  let lastY;
  let lastText = gMeme.lines[gMeme.lines.length - 1];
  if (!lastText) lastY = 0;
  else lastY = lastText.y;

  gMeme.lines.push({
    isSelected: false,
    txt,
    size: 40,
    color: "white",
    x: gElCanvas.width / 2,
    y: getNextLineTxt(lastY),
    isDrag: false,
    font: "impact",
  });

  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function getNextLineTxt(lastY) {
  const meme = getMeme();
  if (!meme.WroteSecondTxt) {
    meme.WroteSecondTxt = true;
    return gElCanvas.height - 40;
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

function setLineTxt(userTxt) {
  const selectedLine = getSelectedLine();
  selectedLine.txt = userTxt;
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

function RemoveLastLine() {
  gMeme.lines.pop();
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function removeCurrentLine() {
  let curr = gMeme.selectedLineIdx;
  console.log(gMeme.lines);
  gMeme.lines.splice(curr, 1);
  console.log(gMeme.lines);
}

function isCircleClicked(clickedPos) {
  const { pos } = gCircle;
  const distance = Math.sqrt(
    (pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2
  );
  return distance <= gCircle.size;
}

function getLineClickedIdx(pos) {
  const lineIdx = gMeme.lines.findIndex((line) => {
    const lineMetrics = gCtx.measureText(line.txt);
    console.log(lineMetrics.width);
    console.log(lineMetrics);
    const lineX = line.x;
    const lineY = line.y;

    return (
      pos.x >= lineX - lineMetrics.width &&
      pos.x <= lineX + lineMetrics.width &&
      pos.y >= lineY - lineMetrics.actualBoundingBoxDescent &&
      pos.y <= lineY + lineMetrics.actualBoundingBoxAscent
    );
  });
  return lineIdx;
}

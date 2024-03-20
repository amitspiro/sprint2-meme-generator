"use strict";

// const gElCanvas=document.getElementById('#my-canvas')
const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
  gElCanvas = document.getElementById("my-canvas");
  // console.log(gElCanvas);
  gCtx = gElCanvas.getContext("2d");
  renderGallery();
  renderMeme();
  addListeners()   
   // checkKey()
}

// function checkKey(){
//   console.log(gImgs);
//   for (let i =0 ; i<=gImgs.length;i++){
//     let lll=gImgs[i].keywords
//    console.log(lll);
//    if()
//   }
// }

function renderMeme(isDownload = false) {
  const meme = getMeme();
  const memeLines = meme.lines;
  const memeImg = getImgById(meme.selectedImgId);
  let img = new Image();
  img.src = `imgs-square/${memeImg}`;

  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
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
  let textWidth = gCtx.measureText(txt).width;
  let lineHeight = size * 1.286;
  gCtx.textBaseline = "middle";
  let xDiff = x - textWidth / 2 - 10;
  let yDiff = y - lineHeight / 2;
  gCtx.fillText(txt, x, y);
  gCtx.strokeText(txt, x, y);

  if (isSelected && !isDownload) {
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(xDiff, yDiff, textWidth + 20, lineHeight);
  }
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

function changeFontFamily(font) {
  const selectedLine = getSelectedLine();
  selectedLine.font = font;
  renderMeme();
}

function fontDown() {
  const selectedLine = getSelectedLine();
  // console.log(selectedLine);
  selectedLine.size -= 5;
  // console.log(selectedLine);
  renderMeme();
}

function onRemoveLastLine() {
  RemoveLastLine()
  renderMeme()
}

function onRemoveCurrentLine(){
  removeCurrentLine()
  renderMeme()
}

function alignRight() {
  const selectedline = getSelectedLine()
  console.log('selectedline', selectedline)
  let textWidth = gCtx.measureText(selectedline.txt).width
  console.log('textWidth', textWidth)
  selectedline.x += 100
  renderMeme()
}

function alignCenter() {
  const selectedline = getSelectedLine()
  selectedline.x = gElCanvas.width / 2
  renderMeme()
}

function alignLeft(){
  const selectedline = getSelectedLine()
  console.log('selectedline', selectedline)
  let textWidth = gCtx.measureText(selectedline.txt).width
  console.log('textWidth', textWidth)
  selectedline.x -= 100
  renderMeme()
}

function moveLeft(){
  const selectedline = getSelectedLine()
  console.log('selectedline', selectedline)
  let textWidth = gCtx.measureText(selectedline.txt).width
  console.log('textWidth', textWidth)
  selectedline.x -= 10
  renderMeme()
}

function moveRight(){
  const selectedline = getSelectedLine()
  console.log('selectedline', selectedline)
  let textWidth = gCtx.measureText(selectedline.txt).width
  console.log('textWidth', textWidth)
  selectedline.x += 10
  renderMeme()
}
function moveUp(){
  const selectedline = getSelectedLine()
  console.log('selectedline', selectedline)
  let textheight = gCtx.measureText(selectedline.txt).height
  console.log('textWH', textheight)
  selectedline.y -= 10
  renderMeme()
}
function moveDown(){
  const selectedline = getSelectedLine()
  console.log('selectedline', selectedline)
  let textheight = gCtx.measureText(selectedline.txt).height
  console.log('textWH', textheight)
  selectedline.y += 10
  renderMeme()
}

function addListeners() {
  addMouseListeners()
  addTouchListeners()
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev){
  const pos = getEvPos(ev)
  const selectedLineIdx = getLineClickedIdx(pos)
  // console.log('selectedLineIdx', selectedLineIdx)
  // אם לא נתפס ליין
  if (selectedLineIdx === -1) {
    // unSelectTxt()
    renderMeme()
    return
  }
// תופס ליין
  getMeme().selectedLineIdx = selectedLineIdx
// עורך ליין
document.getElementById('txt').value = getMeme().lines[selectedLineIdx].txt
renderMeme()
document.body.style.cursor = 'grabbing'
setLineDrag(selectedLineIdx, true)

}

// function isCircleClicked(clickedPos) {
// 	const { pos } = gCircle

// 	// Calc the distance between two dots
// 	const distance = 
//         Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)

// 	//If its smaller then the radius of the circle we are inside
// 	return distance <= gCircle.size
// }

function setLineDrag(selectedLineIdx, isDrag) {
  currentDragLineIdx = selectedLineIdx
  gMeme.lines[selectedLineIdx].isDrag = isDrag
}


function getEvPos(ev) {

  if (TOUCH_EVENTS.includes(ev.type)) {

      ev.preventDefault()         // Prevent triggering the mouse events
      ev = ev.changedTouches[0]   // Gets the first touch point

      // Calculate the touch position inside the canvas

      // ev.pageX = distance of touch position from the documents left edge
      // target.offsetLeft = offset of the elemnt's left side from the it's parent
      // target.clientLeft = width of the elemnt's left border

      return {
          x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
          y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
      }

  } else {
      return {
          x: ev.offsetX,
          y: ev.offsetY,
      }
  }
}

function onMove(ev) {
  // console.log(currentDragLineIdx);
  if (currentDragLineIdx=== undefined) return
  const selecetedLine = getMeme().lines[currentDragLineIdx]
  const pos = getEvPos(ev)
  selecetedLine.x = pos.x
  selecetedLine.y = pos.y
  renderMeme()
}

function onUp() {
  if (currentDragLineIdx === undefined) return
  setLineDrag(currentDragLineIdx, false)
  currentDragLineIdx = undefined
  document.body.style.cursor = 'grab'
}

function onEmojiClick( emoji) {
  addNewLine(emoji)
  renderMeme()
}
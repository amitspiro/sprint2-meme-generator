"use strict";
// let gElCanvas = document.getElementById("my-canvas");

let gElEditor = document.querySelector(".meme-editor");
let gCtx;
let gElCanvas = document.getElementById("my-canvas");

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
      isDrag:false,
      font: 'impact'

    },

  ],
};
let currentDragLineIdx

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
    isDrag:false,
    font: 'impact'
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
  // renderMeme()???
}
function getSelectedLine() {
  // console.log(gMeme.lines[gMeme.selectedLineIdx]);
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
// gCtx.strokeText(text, x, y)

// strokeRect ???
// function drawText(text, x, y) {
// 	gCtx.lineWidth = 2
// 	gCtx.strokeStyle = 'orange'

// 	gCtx.fillStyle = 'lightsteelblue'

// 	gCtx.font = '45px Arial'
// 	gCtx.textAlign = 'center'
// 	gCtx.textBaseline = 'middle'

// 	gCtx.fillText(text, x, y)
// 	gCtx.strokeText(text, x, y)
// }

function RemoveLastLine() {
  //* מוחק את השורה הקיימת
  gMeme.lines.pop();
  //* מסמן את השורה החדשה
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function removeCurrentLine(){
  let curr= gMeme.selectedLineIdx
  console.log(gMeme.lines);
  gMeme.lines.splice(curr,1)
  console.log(gMeme.liness);

}

function isCircleClicked(clickedPos) {
	const { pos } = gCircle
	// Calc the distance between two dots
	const distance = 
        Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)

	//If its smaller then the radius of the circle we are inside
	return distance <= gCircle.size
}

function getLineClickedIdx(pos) {
  const lineIdx = gMeme.lines.findIndex((line) => {
    const lineMetrics = gCtx.measureText(line.txt);
    console.log(lineMetrics.width);
    console.log(lineMetrics);
    const lineX = line.x;
    const lineY = line.y;
    // console.log(lineX);
    // console.log(lineY);
    // console.log(pos);

    return (
        pos.x >= lineX - lineMetrics.width &&
        pos.x <= lineX + lineMetrics.width &&
        pos.y >= lineY - lineMetrics.actualBoundingBoxDescent &&
        pos.y <= lineY + lineMetrics.actualBoundingBoxAscent
        );
    });
    // console.log(lineIdx);
  return lineIdx
}
// function getLineClickedIdx(pos) {
//   const lineIdx = gMeme.lines.findIndex((line) => {
//     const lineMetrics = gCtx.measureText(line.txt);
//     const lineX = line.x;
//     const lineY = line.y;
//     console.log(lineMetrics);
//     console.log(lineX);
//     console.log(lineY);
//     console.log(pos);
//     console.log(lineMetrics.width);

//     return (
//         pos.x >= lineX - lineMetrics.actualBoundingBoxLeft &&
//         pos.x <= lineX + lineMetrics.actualBoundingBoxRight &&
//         pos.y >= lineY - lineMetrics.actualBoundingBoxDescent &&
//         pos.y <= lineY + lineMetrics.actualBoundingBoxAscent
//         );
//     });
//     // console.log(lineIdx);
//   return lineIdx
// }
// function getLineClickedIdx(pos) {
//   const lineIdx = gMeme.lines.findIndex((line) => {
//     const lineMetrics = gCtx.measureText(line.txt);
//     const lineX = line.x;
//     const lineY = line.y;
//     console.log(lineMetrics);
//     console.log(lineX);
//     console.log(lineY);
//     console.log(pos);
//     console.log(lineMetrics.width);

//     return (
//         pos.x >= lineX - lineMetrics.actualBoundingBoxLeft &&
//         pos.x <= lineX + lineMetrics.actualBoundingBoxRight &&
//         pos.y >= lineY - lineMetrics.actualBoundingBoxDescent &&
//         pos.y <= lineY + lineMetrics.actualBoundingBoxAscent
//         );
//     });
//     // console.log(lineIdx);
//   return lineIdx
// }




// function onMouseMove(ev) {
// 	const { offsetX, offsetY, clientX, clientY } = ev

//     // :TODO - find the hovered star

//     const line = gMeme.lines.findIndex(line => {
//         let { x, y} = line

//         return (offsetX >= x && offsetX <= x + BAR_WIDTH &&
//                 offsetY >= y && offsetY <= y +line. )
//     })
//         // :TODO - display the modal if a star has been found
    
//         if(star){
//           openModal(star.name, star.rate, clientX, clientY)
//       } else {
//           closeModal()
//       }
//   }

// function onMouseMove(ev) {
// 	// ?const { offsetX, offsetY, pageX, pagetY } = ev
// 	const { offsetX, offsetY, clientX, clientY } = ev

//     // :TODO - find the hovered star

//     const star = gStars.find(star => {
//         let { x, y, rate } = star

//         return (offsetX >= x && offsetX <= x + BAR_WIDTH &&
//                 offsetY >= y && offsetY <= y + rate)
    // :TODO - display the modal if a star has been found
    
//     if(star){
//       openModal(star.name, star.rate, clientX, clientY)
//   } else {
//       closeModal()
//   }//     })
// }

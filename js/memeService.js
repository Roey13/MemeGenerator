'use strict'
var gSavedMemes = []
var gCanvas;
var gCtx;
var gImgs = getImgs()
var gIdx;
var gLineIdx = 0;
var gMeme = {
    selectedImgId: 5,
    lines: [{
            txt: 'Your Text Here',
            size: 40,
            align: 'center',
            fillColor: 'white',
            strokeColor: 'black',
            posX: 225,
            posY: 50
        }
    ]
}
var gText = gMeme.lines[0].txt1

function getImgs() {
    var imgs = []
    for (var i = 1; i <= 18; i++) {
        imgs.push({
            id: i,
            url: 'img/' + i + '.jpg'
        })
    }
    return imgs
}

function drawText() {
    var lines = gMeme.lines
    lines.forEach(line => {
        var text = line.txt
        gCtx.lineWidth = 2
        gCtx.strokeStyle = line.strokeColor
        gCtx.fillStyle = line.fillColor
        gCtx.font = line.size + 'px Impact'
        gCtx.textAlign = line.align
        gCtx.fillText(text, 225, line.posY)
        gCtx.strokeText(text, 225, line.posY)
    })
}

function drawImg(id) {
    var img = new Image()
    img.src = 'img/' + id + '.jpg'
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

function currLine(){
    var lines = gMeme.lines
    lines.forEach(line => {
      if (lines[gLineIdx] === line) line.strokeColor = 'red'
      else line.strokeColor = 'black' 
    })
    renderCanvas(gIdx)
}


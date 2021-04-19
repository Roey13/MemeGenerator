'use strict'

var gCanvas;
var gCtx;
var gImgs = getImgs()
var gCurrIdx;
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I never eat Falafel',
        size: 20,
        align: 'left',
        color: 'red'
    }]
}

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

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = '40px Impact'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function drawImg(id) {
    var img = new Image()
    img.src = 'img/' + id + '.jpg'
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

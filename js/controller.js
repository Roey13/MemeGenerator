'use strict'

function init() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderGallery()
    updateSaved()
}

function updateSaved() {
    if (!loadFromStorage('memes')) saveToStorage('memes', []);
    else gSavedMemes = loadFromStorage('memes')
}

function renderCanvas(id) {
    drawImg(id)
    setTimeout(function () {
        drawText(), 100
    })
}

function renderUserText() {
    var elUserText = document.querySelector('.text-input').value;
    gMeme.lines[gLineIdx].txt = elUserText
    drawText()
    renderCanvas(gIdx)
}

function renderSelectedImg(id) {
    var elEditor = document.querySelector('.editor-container')
    var elGallery = document.querySelector('.gallery')
    elEditor.style.display = 'flex'
    elGallery.style.display = 'none'
    gIdx = id;
    drawImg(gIdx)
    renderCanvas(gIdx)
}

function renderGallery() {
    var elGallery = document.querySelector('.gallery')
    var strHTML = ''
    gImgs.forEach(function (img, idx) {
        strHTML += `<img src="${gImgs[idx].url}" onclick="renderSelectedImg(${idx+1})">`
    })
    elGallery.innerHTML = strHTML
}

function changePosY(direc) {
    var currLine = gMeme.lines[gLineIdx]
    if (direc === 'high') currLine.posY--
    else currLine.posY++;
    renderCanvas(gIdx)
}

function changeSize(sizing) {
    var currLine = gMeme.lines[gLineIdx]
    if (sizing === 'big') currLine.size++
    else currLine.size--;
    renderCanvas(gIdx)
}

function addLine() {
    var lines = gMeme.lines
    var posY
    if (lines.length === 1) {
        posY = 430
    }
    if (lines.length > 1) {
        posY = 225
    }
    var lines = gMeme.lines
    var line = {
        txt: 'Your Text Here',
        size: 40,
        align: 'center',
        fillColor: 'white',
        strokeColor: 'black',
        posY
    }
    lines.push(line)
    currLine()
}

function switchLine() {
    var lines = gMeme.lines
    if (gLineIdx === lines.length - 1) gLineIdx = 0;
    else(gLineIdx++);
    currLine()
}

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function saveMeme() {
    var val = gCanvas.toDataURL();
    gSavedMemes.push(val)
    saveToStorage(Key, gSavedMemes)
}

function renderSaved() {
    var memeLib = document.querySelector('.meme-lib');
    var elGallery = document.querySelector('.gallery')
    var elEditor = document.querySelector('.editor-container')
    elEditor.style.display = 'none'
    elGallery.style.display = 'none'
    memeLib.style.display = 'grid'
    var images = loadFromStorage('memes')
    var strHTML = ``
    images.forEach(img => {
        strHTML += `<img class="lib-img" src="${img}"></img>`
    })
    memeLib.innerHTML = strHTML
}

function renderHome(){
    var memeLib = document.querySelector('.meme-lib');
    var elGallery = document.querySelector('.gallery')
    var elEditor = document.querySelector('.editor-container')
    elEditor.style.display = 'none'
    elGallery.style.display = 'grid'
    memeLib.style.display = 'none'

}
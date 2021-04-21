'use strict'

function init() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderGallery()
    updateSaved()
    addMouseListeners()
    addTouchListeners()
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
    gMeme.lines = [{
        txt: 'Your Text Here',
        size: 40,
        align: 'center',
        fillColor: 'white',
        strokeColor: 'black',
        posX: 225,
        posY: 50
    }]

    var elEditor = document.querySelector('.editor-container')
    var elGallery = document.querySelector('.gallery')
    var elHomeBtn = document.querySelector('.main-btn')
    elHomeBtn.style.display = 'inline'
    elEditor.style.display = 'flex'
    elGallery.style.display = 'none'
    gIdx = id;
    drawImg(gIdx)
    renderCanvas(gIdx)
}

function renderGallery() {
    var elHomeBtn = document.querySelector('.main-btn')
    var elGallery = document.querySelector('.gallery')
    elHomeBtn.style.display = 'none'
    var strHTML = ''
    gImgs.forEach(function (img, idx) {
        strHTML += `<img class="gall-img" src="${gImgs[idx].url}" onclick="renderSelectedImg(${idx+1})">`
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
    if (lines.length === 1) return
    if (gLineIdx === lines.length - 1) gLineIdx = 0;
    else(gLineIdx++);
    currLine()
}

function downloadImg(elLink) {
    removeRed();
    var imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function saveMeme() {
    removeRed()
    setTimeout(function () {
        var val = gCanvas.toDataURL();
        gSavedMemes.push(val)
        saveToStorage(Key, gSavedMemes), 100
    })
}

function renderSaved() {
    var elMemeLib = document.querySelector('.meme-lib');
    var elGallery = document.querySelector('.gallery')
    var elEditor = document.querySelector('.editor-container')
    var elHomeBtn = document.querySelector('.main-btn')
    var elSavedBtn = document.querySelector('.memes-btn')
    elEditor.style.display = 'none'
    elGallery.style.display = 'none'
    elHomeBtn.style.display = 'inline'
    elSavedBtn.style.display = 'none'
    var images = loadFromStorage('memes')
    if (gSavedMemes.length > 0) {
        elMemeLib.style.display = 'grid'
        var strHTML = ``
        images.forEach(img => {
            strHTML += `<img class="lib-img" src="${img}"></img>`
        })
        elMemeLib.innerHTML = strHTML
    } else {
        elMemeLib.style.display = 'flex'
        elMemeLib.innerHTML = `<h1 class="empty-msg">You Have No Saved Memes</h1>`
    }
}

function renderHome() {
    var elHomeBtn = document.querySelector('.main-btn')
    var elMemeLib = document.querySelector('.meme-lib');
    var elGallery = document.querySelector('.gallery')
    var elSavedBtn = document.querySelector('.memes-btn')
    var elEditor = document.querySelector('.editor-container')
    elEditor.style.display = 'none'
    elGallery.style.display = 'grid'
    elMemeLib.style.display = 'none'
    elHomeBtn.style.display = 'none'
    elSavedBtn.style.display = 'inline'
}

function removeRed() {
    var lines = gMeme.lines
    lines.forEach(line => {
        line.strokeColor = 'black'
    })
    renderCanvas(gIdx)
}

function removeLine() {
    var lines = gMeme.lines

    if (lines.length === 1) return

    if (lines.length === 2){
        lines.splice(-1, 1)
        removeRed()
    }

    if (lines.length > 1){
        lines.splice(-1, 1)
        renderCanvas(gIdx)
    }

}
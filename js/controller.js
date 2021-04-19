'use strict'

function init() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderGallery()
}

function renderCanvas(id) {
    drawImg(id)
    setTimeout(function (){
        drawText(gMeme.lines[0].txt, 225, 50), 100
    })
}

function renderUserText() {
    var elUserText = document.querySelector('.text-input').value;
    gMeme.lines[0].txt = elUserText
    renderCanvas(gCurrIdx)
}

function renderSelectedImg(id) {
    gCurrIdx = id;
    drawImg(gCurrIdx)
    renderCanvas(gCurrIdx)
}

function renderGallery() {
    var elGallery = document.querySelector('.gallery')
    var strHTML = `
    <img src="${gImgs[1].url}" onclick="renderSelectedImg(2)">
    <img src="${gImgs[2].url}" onclick="renderSelectedImg(3)">
    `
    elGallery.innerHTML = strHTML
}
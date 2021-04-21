'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gStartPos

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    var line = gMeme.lines[gLineIdx]
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    line.isDragging = true
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function isLineClicked(clickedPos) {
    var line = gMeme.lines[gLineIdx]
    const distance = Math.sqrt((line.posX - clickedPos.x) ** 2 + (line.posY - clickedPos.y) ** 2)
    return distance <= line.size
}

function onMove(ev) {
    var line = gMeme.lines[gLineIdx]

    if (line.isDragging) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y

        line.posX += dx
        line.posY += dy

        gStartPos = pos
        renderCanvas(gImgIdx)
    }
}

function onUp() {
    var line = gMeme.lines[gLineIdx]
    line.isDragging = false
    document.body.style.cursor = 'grab'
}
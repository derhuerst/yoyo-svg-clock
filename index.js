'use strict'

const yo = require('yo-yo')

const data = require('./data')
const render = require('./render')

const dom = render(data())
document.body.appendChild(dom)

let play = true
const loop = () => {
	yo.update(dom, render(data()))
	if (play) requestAnimationFrame(loop)
}
requestAnimationFrame(loop)

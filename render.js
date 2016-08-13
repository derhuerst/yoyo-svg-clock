'use strict'

const yo = require('yo-yo')



const round = (x) => Math.round(x * 100) / 100

const clip = (w, h, data, unit) => {
	data = data[unit]
	const points = [[w/2, h/2]] // start at the center

	// add helper edges to fully contain the clock
	                 points.push([w/2, 0  ]) // middle top
	if (data >= 1/8) points.push([w  , 0  ]) // right  top
	if (data >= 3/8) points.push([w  , h  ]) // right  bottom
	if (data >= 5/8) points.push([0  , h  ]) // left   bottom
	if (data >= 7/8) points.push([0  , 0  ]) // left   top

	// add the actual edge to cut the ring off
	points.push([
		w/2 + Math.cos(Math.PI * 2 * (data - .25)) * w/2,
		h/2 + Math.sin(Math.PI * 2 * (data - .25)) * h/2
	])

	return yo `
		<polygon points="${points
			.map((p) => round(p[0]) + ',' + round(p[1]))
			.join(' ')}"/>`
}



const render = (data) => yo `
	<svg id="clock" viewBox="0 0 100 100">
		<defs>
			<clipPath id="hours">
				${clip(100, 100, data, 'hours')}
			</clipPath>
			<clipPath id="minutes">
				${clip(100, 100, data, 'minutes')}
			</clipPath>
			<clipPath id="seconds">
				${clip(100, 100, data, 'seconds')}
			</clipPath>
		</defs>
		<circle class="hours"   cx="50" cy="50" r="20" clip-path="url(#hours)"/>
		<circle class="minutes" cx="50" cy="50" r="30" clip-path="url(#minutes)"/>
		<circle class="seconds" cx="50" cy="50" r="40" clip-path="url(#seconds)"/>
	</svg>`

module.exports = render

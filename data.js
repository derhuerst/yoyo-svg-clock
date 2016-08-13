'use strict'

const floordate = require('floordate')



const floor = (when, unit) => floordate(new Date(when), unit)

const second = 1000
const minute = 60 * second
const hour = 60 * minute
const day = 24 * hour
const week = 7 * day

const data = () => {
	const now = new Date()
	return {
		  weeks:   (now - floor(now, 'week')) / week
		, hours:   (now - floor(now, 'day')) / day
		, minutes: (now - floor(now, 'hour')) / hour
		, seconds: (now - floor(now, 'minute')) / minute
	}
}

module.exports = data

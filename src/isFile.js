'use strict'

const get = require('./get')

module.exports = function(obj) {

	// Get constant during fn call. Would be empty otherwise.
	const FILE = require('./index').FILE

	const type     = get.type(obj)
	const contents = get.contents(obj)

	if (type===FILE)                      return true
	if (typeof contents==='string')       return true
	if (Buffer.isBuffer(contents)===true) return true

	return false

}
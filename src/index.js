'use strict'

const path           = require('path')
const isPlainObj     = require('is-plain-obj')
const writeStructure = require('./writeStructure')

/**
 * Converts an object into a persistent or temporary directory structure.
 * @public
 * @param {?Array} structure - Array of objects containing information about a directory or file.
 * @param {?Object} opts - Optional options.
 * @returns {Promise} Returns the following properties if resolved: {Object}.
 */
module.exports = function(structure = [], opts = {}) {

	return new Promise((resolve, reject) => {

		if (Array.isArray(structure)===false) {
			throw new Error(`'structure' must be an array`)
		}

		if (isPlainObj(opts)===false && opts!=null) {
			throw new Error(`'opts' must be an object, null or undefined`)
		}

		opts = Object.assign({
			cwd: process.cwd()
		}, opts)

		// Support relative and absolute paths
		opts.cwd = path.join(process.cwd(), opts.cwd)

		convert(structure, opts.cwd)
			.then(resolve, reject)

	})

}

/**
 * Constants for the structure.
 * We don't use symbols for the constants as it should still be possible
 * to copy, paste and use the JSON output of `tree`.
 * @public
 */
module.exports.DIRECTORY = 'directory'
module.exports.FILE      = 'file'

module.exports([
	{ type: 'directory', name: '.', contents: [
		{ type: 'directory', name: 'Khan Academy', contents: [
			{ type: 'file', name: 'IMG_8448.txt', contents: 'hi' },
			{ type: 'file', name: 'IMG_8450.txt', contents: 'hi' },
			{ type: 'file', name: 'IMG_8451.txt' },
			{ type: 'file', name: 'IMG_8455.txt', contents: 'hi' },
			{ type: 'file', name: 'IMG_8455.txt', contents: 'hi' },
			{ type: 'directory', name: 'Khan Academy4' }
		]}
	]}
], {
	cwd: './test/'
}).catch((err) => console.log(err))
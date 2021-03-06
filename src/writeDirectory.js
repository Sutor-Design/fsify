'use strict'

const util = require('util')
const fs = require('fs')

/**
 * Creates a new directory. Subdirectories must exist.
 * Reuses existing directories without deleting them.
 * @public
 * @param {String} path - Path to create.
 * @param {?String} mode - If a directory needs to be created, set the mode to this octal permission string.
 * @returns {Promise}
 */
module.exports = function(path, mode) {

	return util.promisify(fs.mkdir)(path, mode)
		.catch((err) => { if (err.code !== 'EEXIST') throw err })

}
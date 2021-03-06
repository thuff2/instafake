'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Photo Schema
 */
var PhotoSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Photo name',
		trim: true
	},
    	image: {
		type: String,
		default: ''
        },
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	views: {
		type: Number,
		default: 0
	},
	likes: [{
		type: Schema.ObjectId,
		ref: 'User'
	}]
});
/*var PhotoSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Photo name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	filename : {
		type : String
	}
});
*/
mongoose.model('Photo', PhotoSchema);

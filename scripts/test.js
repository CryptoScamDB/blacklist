const assert = require('assert');
const yaml = require('js-yaml');
const fs = require('fs');

describe('YAML Validator', function() {
	describe('urls.yaml', function() {
		it('should contain valid YAML', function(){
			assert.doesNotThrow(() => yaml.safeLoad(fs.readFileSync('./data/urls.yaml', 'utf8')));
		});
		it('every entry should have a url', function() {
			assert.deepEqual(yaml.safeLoad(fs.readFileSync('./data/urls.yaml', 'utf8')).filter(entry => !('url' in entry)),[]);
		});
		it('every url should specify its protocol (http:// or https:// or mailto:)', function() {
			assert.deepEqual(yaml.safeLoad(fs.readFileSync('./data/urls.yaml', 'utf8')).filter(entry => !entry.url.startsWith('http://') && !entry.url.startsWith('https://') && !entry.url.startsWith('mailto:')),[]);
		});
		it('every entry should have valid keys (url/category/subcategory/description/addresses)', function() {
			assert.deepEqual(yaml.safeLoad(fs.readFileSync('./data/urls.yaml', 'utf8')).filter(entry => Object.keys(entry).some(key => !['null','id','name','coin','url','category','subcategory','description','addresses'].includes(key))),[]);
		});
	});
	describe('Additions', function() {
		
	});
});
describe('JSON Validator', function() {
	describe('twitter.json', function() {
		it('should contain valid JSON', function(){
			assert.doesNotThrow(() => JSON.parse(fs.readFileSync('./data/twitter.json', 'utf8')));
		});
	});
});
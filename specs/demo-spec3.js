import assert from 'assert';
import puppeteer from 'puppeteer';
import config from 'config';

const mochaTimeoutMS = config.get( 'mochaTimeoutMS' );

describe( 'WebDriverJsDemo', function() {
	this.timeout( mochaTimeoutMS );

	let browser;

	before( async function() {
		browser = await puppeteer.launch();
	} );

	it( 'can check for errors when there should be none', async function() {
		const page = await browser.newPage();
		let errors = '';
		page.on('pageerror', pageerr => {
			errors = errors + pageerr;
		});
		await page.goto( `${ config.get( 'baseURL' )}` );
		assert.equal( errors, '' );
	} );

	after( async function() {
		await browser.close();
	} );

} );

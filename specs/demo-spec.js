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

	it( 'can wait for an element to appear', async function() {
		const page = await browser.newPage();
		await page.goto( `${ config.get( 'baseURL' )}` );
		await page.waitFor( '#elementappearschild', { visible: true, timeout: 5000 } );
	} );

	it( 'can wait for an element to appear', async function() {
		const page = await browser.newPage();
		page.on('dialog', async dialog => {
			console.log(dialog.message());
			await dialog.accept();
		});
		await page.goto( `${ config.get( 'baseURL' )}/leave` );
		await page.click( '#homelink' );
		await page.waitFor( '#elementappearsparent', { visible: true, timeout: 5000 } );
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

	it( 'can check for errors when there are present', async function() {
		const page = await browser.newPage();
		let errors = '';
		page.on('pageerror', pageerr => {
			errors = errors + pageerr;
		});
		await page.goto( `${ config.get( 'baseURL' )}/error` );
		assert.equal( errors, 'Error: Purple Monkey Dishwasher Error' );
	} );

	after( async function() {
		await browser.close();
	} );

} );

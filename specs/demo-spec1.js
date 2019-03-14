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

	after( async function() {
		await browser.close();
	} );

} );

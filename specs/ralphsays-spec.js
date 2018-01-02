import assert from 'assert';
import puppeteer from 'puppeteer';
import config from 'config';

describe( 'Puppeteer', async function() {

	this.timeout( config.get( 'mochaTimeoutMS' ) );

	it( 'works', async function() {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		let error = null;
		await page.goto( config.get( 'ralphURL' ) ).catch( e => error = e );
		assert.equal( error, null );
		let found = false;
		await page.waitFor( '#quote' ).then( () => found = true );
		assert( found );
		await browser.close();
	} );
} );

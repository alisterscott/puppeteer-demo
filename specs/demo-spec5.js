import puppeteer from 'puppeteer';
import config from 'config';

const mochaTimeoutMS = config.get( 'mochaTimeoutMS' );

describe( 'Puppeteer 5', function() {
	this.timeout( mochaTimeoutMS );

	let browser;

	before( async function() {
		browser = await puppeteer.launch();
	} );

	it( 'can use xpath selectors to find elements', async function() {
		const page = await browser.newPage();
		await page.goto( `${ config.get( 'baseURL' )}` );
		await page.waitForXPath( '//span[contains(., "Scissors")]' );
		const elements = await page.$x( '//span[contains(., "Scissors")]' );
		await elements[0].click();
		await page.waitForXPath( '//div[contains(., "Scissors clicked!")]' );
	} );

	after( async function() {
		await browser.close();
	} );
} );

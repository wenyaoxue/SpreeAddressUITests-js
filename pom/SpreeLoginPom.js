const { expect, Locator, Page } = require('@playwright/test') 
exports.SpreeLoginPom = class SpreeLoginPom {

    constructor(page) {
        this.page = page
        
	this.header = page.locator("//h3[text()='Log in to continue']")
		
	this.email = page.locator("//*[@name='spree_user[email]']")	
	this.password = page.locator("//*[@name='spree_user[password]']")
	
	this.login = page.locator("//*[@name='commit']")
    }

    async visit() {
	    await this.page.goto("http://demo.spreecommerce.org/login") 
	}
	async verifyHeader() {
		// Assert.assertTrue(header.isDisplayed()) 
	}
	async enterCredentials(em, pw) {
		await this.email.fill(em) 
		await this.password.fill(pw) 
	}
	async clickLogin() {
		await this.login.click() 
	}
}


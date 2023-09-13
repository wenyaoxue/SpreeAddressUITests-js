const { expect, Locator, Page } = require('@playwright/test');
exports.SpreeAddressPom = class SpreeAddressPom {

    constructor(page) {
        this.page = page

        this.label = page.locator("//*[@name='address[label]']")
        this.firstname = page.locator("//*[@name='address[firstname]']")
        this.lastname = page.locator("//*[@name='address[lastname]']")
        this.address1 = page.locator("//*[@name='address[address1]']")
        this.address2 = page.locator("//*[@name='address[address2]']")
        this.city = page.locator("//*[@name='address[city]']")
        this.state = page.locator("//*[@name='address[state_id]']")
        this.zipcode = page.locator("//*[@name='address[zipcode]']")
        this.country = page.locator("//*[@name='address[country_id]']")
        this.phone = page.locator("//*[@name='address[phone]']")

        this.button = page.locator("//*[@name='commit']")
    }




    async fillForm(
        label, firstname, lastname, address1, address2, city, state, zipcode, country, phone
    ) {
        await this.label.type(label);
        await this.firstname.type(firstname);
        await this.lastname.type(lastname);
        await this.address1.type(address1);
        await this.address2.type(address2);
        await this.city.type(city);
        await this.state.selectOption(state);
        await this.zipcode.type(zipcode);
        await this.country.selectOption(country);
        await this.phone.type(phone);
    }
    async clearForm() {
        await this.page.waitForTimeout(2000);
        await this.label.clear();
        await this.firstname.clear();
        await this.lastname.clear();
        await this.address1.clear();
        await this.address2.clear();
        await this.city.clear();
        await this.zipcode.clear();
        await this.phone.clear();
    }

    async clickButton() {
        await this.button.click();
    }

}


const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { SpreeLoginPom } = require("../../pom/SpreeLoginPom");
const { SpreeAccountPom } = require("../../pom/SpreeAccountPom");
const { SpreeAddressPom } = require("../../pom/SpreeAddressPom");

// import { addresses } from '../.././TestData/SpreeAddress.json';
const { addresses } = require('../.././TestData/SpreeAddress.json')


let spreelogin
let spreeaccount;
let spreeaddress
let page

Given("User has launched Chrome browser", async function () {
});
When("User navigates to Spree login page", async function () {
    await this.openUrl('http://demo.spreecommerce.org/login');
    page = this.page
    spreelogin = new SpreeLoginPom(page);
})

When("User enters valid username and password in Spree login page", async function () {
    await spreelogin.enterCredentials("c@s.com", "123456")
})
When("User clicks login on Spree login page", async function () {
    await spreelogin.clickLogin();

    spreeaccount = new SpreeAccountPom(page)
    await page.waitForTimeout(2000)
    await spreeaccount.finishsetup()
})

Then("My Account page should display", async function () {
    await spreeaccount.verifyHeader();
})

When("User clicks logout on Spree", async function () {
    await spreeaccount.logout();
})

Then("Login page should display", async function () {
    await spreelogin.verifyHeader();
})

When("User deletes all existing addresses on Spree account page", { timeout: 60000 }, async function () {
    while (await spreeaccount.hasAtLeastOneDeleteBtn()) {
        await deletefirstaddr();
    }
})
When("User deletes first address on Spree account page", deletefirstaddr)
async function deletefirstaddr() {
    await spreeaccount.deleteFirstAddress();
}

Given("User clicks on Add new address link on Spree account page", async function () {
    await spreeaccount.clickAddAddrLink();
    spreeaddress = new SpreeAddressPom(page)
})
When("User enters address {string}{string}{string}{string}{string}{string}{string}{string}{string}{string} on Spree new address page",
    { timeout: 60000 },
    async function (label, firstname, lastname, address1, address2, city, state, zipcode, country, phone) {
        await spreeaddress.fillForm(
            label, firstname, lastname, address1, address2, city, state, zipcode,
            country, phone
        );
    })


When("User enters address {string} from JSON file on Spree new address page", async function (i) {
    await spreeaddress.fillForm(
        addresses[i].label, addresses[i].firstname, addresses[i].lastname,
        addresses[i].address1, addresses[i].address2,
        addresses[i].city, addresses[i].state, addresses[i].zipcode,
        addresses[i].country, addresses[i].phone
    );
})

When("User clicks button on Spree new address page", async function () {
    await spreeaddress.clickButton();
})
Then("If the new address is a {string}, show address on Spree account page as {string}{string}{string}{string}{string}, otherwise clear form",
    async function (success, label, name, address, ctstzp, country) {
        if (success == "Y") {
            await spreeaccount.verifyHeader();
            await checkaddr(label, name, address, ctstzp, country);
        }
        else {
            await clearnewaddrform();
        }
    })
Then("If address {string} from JSON file is good, show address on Spree account page, otherwise clear form",
    async function (i) { 
        if (addresses[i].success == "Y") {
            await spreeaccount.verifyHeader();
            await checkaddr(addresses[i].label, 
                addresses[i].firstname + " " + addresses[i].lastname,
                addresses[i].address1 + " " + addresses[i].address2 + ",",
                addresses[i].city + ", " + addresses[i].st + " " + addresses[i].zipcode + ",",
                addresses[i].country);
        }
        else {
            await clearnewaddrform();
        }
    })

Then("First address displayed on account page is {string}{string}{string}{string}{string}",
    checkaddr
)


async function checkaddr(label, name, address, ctstzp, country) {
    await spreeaccount.verifyAddressExists(label, name, address, ctstzp, country);
}
Given("User clicks the first update address icon on Spree account page", async function () {
    await spreeaccount.editFirstAddress();
})
When("User clears form", clearnewaddrform)
async function clearnewaddrform() {
    await spreeaddress.clearForm();
}


Then("No addresses should show on Spree account page", async function () {
    expect(await spreeaccount.hasAtLeastOneDeleteBtn()).toBe(false)
})
const { By } = require('selenium-webdriver');

class CheckoutPage {
    constructor(driver){
        this.driver = driver;
        this.checkoutbutton = By.xpath("//button[@id='checkout']");
        this.firstnameInput = By.id('first-name');
        this.lastnameInput = By.id('last-name');
        this.zipcodeInput = By.id('postal-code');
        this.continueButton = By.className('submit-button btn btn_primary cart_button btn_action');
        this.cartButton = By.css('.shopping_cart_link');
    }

    async isOnCheckoutPage(){
        const title = await this.driver.findElement(By.className('title'));
        return title.getText();
    }

    async navigatetoCheckoutPage(){
        await this.driver.findElement(this.checkoutbutton).click();
    }

    async checkoutInfo(firstname, lastname, zipcode){
        await this.driver.findElement(this.firstnameInput).sendKeys(firstname);
        await this.driver.findElement(this.lastnameInput).sendKeys(lastname);
        await this.driver.findElement(this.zipcodeInput).sendKeys(zipcode);
        await this.driver.findElement(this.continueButton).click();
    }
}

module.exports = CheckoutPage;
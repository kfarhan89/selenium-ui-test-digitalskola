const { By } = require('selenium-webdriver');

class CheckoutFormPage {
    constructor(driver){
        this.driver = driver;
        this.finishButton = By.id('finish');
    }

    async isOnCheckoutPageStep2(){
        const title = await this.driver.findElement(By.className('title'));
        return title.getText();
    }

    async finishCheckout(){
        await this.driver.findElement(this.finishButton).click();
    }

}

module.exports = CheckoutFormPage;
const { By } = require('selenium-webdriver');

class FinishPage {
    constructor(driver){
        this.driver = driver;
        this.finishButton = By.id('finish');
    }

    async isOnCheckoutPageStep3(){
        const title = await this.driver.findElement(By.className('title'));
        return title.getText();
    }

    async finishCheckout(){
        await this.driver.findElement(this.finishButton).click();
    }

}

module.exports = FinishPage;
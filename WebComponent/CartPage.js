const { By } = require('selenium-webdriver');

class CartPage {
    constructor(driver){
        this.driver = driver;
    }

    async isOnCart(){
        const title = await this.driver.findElement(By.className('title'));
        return title.getText();
    }
}

module.exports = CartPage;
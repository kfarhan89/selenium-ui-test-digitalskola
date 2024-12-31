const { By } = require('selenium-webdriver');

class CartPage {
    constructor(driver){
        this.driver = driver;
        this.checkoutbutton = By.xpath("//button[@id='checkout']");
        this.cartButton = By.css('.shopping_cart_link');
    }

    async isOnCart(){
        const title = await this.driver.findElement(By.className('title'));
        return title.getText();
    }

    async navigatetoCartPage(){
        await this.driver.findElement(this.cartButton).click();
    }

    async checkout(){
        await this.driver.findElement(this.checkoutbutton).click();
    }
}

module.exports = CartPage;
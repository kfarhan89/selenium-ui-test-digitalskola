const { By } = require('selenium-webdriver');

class DashboardPage {
    constructor(driver){
        this.driver = driver;
        this.addtocart = By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']");
        this.cartbutton = By.css('.shopping_cart_link');
    }

    async isOnDashboard(){
        const title = await this.driver.findElement(By.className('title'));
        return title.getText();
    }

    async addProduct(){
        await this.driver.findElement(this.addtocart).click();
        await this.driver.findElement(this.cartbutton).click();
    }
}

module.exports = DashboardPage;
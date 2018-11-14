import {browser,by,element} from 'protractor';
import {Actions} from '../../Actions/Action';

export class OpenAccount extends Actions 
{
    clickOpenAccount: string;
    customerName: string;
    currency: string;
    processClick: string;

    constructor(name,value1) {
        super();
        this.clickOpenAccount = "//button[@ng-class = 'btnClass2')]";
        this.customerName = "//*[contains(text(),'"+ name +"')]"
        this.currency = "//*[contains(text(),'"+value1+"')]"
        this.processClick = "//button[@type='submit']"
    }

    public clickonOpenAccountbutton() {
        this.myClick(this.clickOpenAccount, "click on open account");
    }
    selectCustomerName() {
        this.myClick(this.clickOpenAccount, "click on open account");
    }
    selectCurrency(){
        this.dropDown(this.currency, "select currency name");
    }
    clickOnProcessButton(){
        this.myClick(this.processClick, "click on process button");
    }
    public clickCustomerdropdown()
    {
        this.dropDown(this.CustomerSelectionXpath, 'Selecting Drop Down')
    }

    {
        const btnlogin = element(by.xpath(this.openAccountbtn));
        if (btnlogin.isDisplayed())
        {
            //btnlogin.click();
            this.myClick(btnlogin, "able to click");

        }
        else
        {
            console.log("element not displayed");
        }
    }
}
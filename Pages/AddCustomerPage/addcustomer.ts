import {browser,by,element} from 'protractor';
import {Actions} from '../../Action/Actions';

export class AddCustomer extends Actions {
clickAddCustomer : string;
firstName : string;
lastName : string;
postcode: string;
generateCustomerID : string;

constructor() {
    super();
    this.clickAddCustomer = "//button[@ng-click ='addCust()']"
    this.firstName = "//input[@ng-model = 'fName']";
    this.lastName = "//input[@ng-model = 'lName']";
    this.postcode = "//input[@ng-model = 'postCD']";
    this.generateCustomerID = "//button[@type = 'submit']"

}
public ClickonBankManagerLoginButton()
{
    this.myClick(this.ClickonBankManagerLoginButton , "Click on Bank Manager Login Button");
}

public clickAddCustomerButton()
{
    this.myClick(this.clickAddCustomer , "Click on add Customer");
}

enterFirstName(keys)
{;
    this.sendKey(this.firstName,"enter first name",keys);
}

enterLastName(keys)
{
    this.sendKey(this.lastName,"enter last name",keys);
}
enterpostcode(keys)
{
    this.sendKey(this.postcode, "enter postal code", keys);
}
public clickaddCustomerButtonClick()
{
    this.myClick(this.clickaddCustomerButtonClick , "Click on add Customer");
}


}

//*Author: Nate McGooden//
//*Creation Date: 11/7/2018//

import {element, by, browser, ExpectedConditions,} from "protractor";
import {async} from "q";
import { AddCustomer } from '../pages/AddCustomerPage/addcustomer';
import { OpenAccount } from '../pages/OpenAccount/OpenAccount';

let jsd = require('../Data/testData');

//*object creation for BankManager-AddCustomer class**//
var customerdetails = new AddCustomer();
var openaccountdetails = new OpenAccount
(jsd.CustomerData1.firstname+" "+jsd.CustomerData1.lastname,jsd.CustomerData1.currency);


describe('Bankmanager Testing', function(){

  //Launch//  
  it('Launch and Enter Value in Bankmanger', async()=>{
    try 
    {
      await browser.get(jsd.CustomerData1.url);
    } 
    catch (error) {
        console.log(error);
    }
    
  

  });
    //*Click on bank manager login*//  
  it('Click on Bank Manager Login Button', async()=>{
      await customerdetails.ClickonBankManagerLoginButton();
  });
  it('Click on Add Customer Button', async()=>{      
      await customerdetails.clickAddCustomerButton();
  });
  it('Enter the First Name Value', async()=>{
      await customerdetails.enterFirstName(jsd.CustomerData1.firstname);
  });
  it('Enter the Last Name Value', async()=>{
      await customerdetails.enterLastName(jsd.CustomerData1.lastname);
  });
  it('Enter the Postal Code', async()=>{
      await customerdetails.enterpostcode(jsd.CustomerData1.Code);
  });
  it('Click on add customer button click', async()=>{
      await customerdetails.clickaddCustomerButtonClick();
  });
  it('Click on Open Customer button', async()=>{
      await openaccountdetails.clickonOpenAccountbutton();
  });
  it('Click and select customer dropdown', async()=>{
    await openaccountdetails.clickCustomerdropdown();
  });
  it("select currency", () => {
    openaccountdetails.selectCurrency();
  });
  it("click on Process button to generate account no", ()=>{
    openaccountdetails.clickOnProcessButton();
    var alertValidate = browser.switchTo().alert();
    expect(alertValidate.accept).toBeDefined();
    alertValidate.getText().then((then) =>{
        console.log(text);
        alertValidate.accept();
    })

});
});
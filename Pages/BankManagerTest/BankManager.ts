import {browser,by,element} from 'protractor';
//import {Actions} from 

export class AddCustomer {
    bankmanagerloginbtn: string;
    addcustomerbtn: string;
    firstName: string;
    lastName: string;
    postcode: string;
    generateCustomerID: string;

    constructor() {
        //super();
        this.bankmanagerloginbtn = "//button[contains(text(),'Bank Manager Login')]";
        this.addcustomerbtn = "//button[@ng-class ='btnClass1']";
        this.firstName = "//input[@ng-model ='fName']";
        this.lastName = "//input[@ng-model ='lName']";
        this.postcode = "//input[@ng-model ='postCd']";
        this.generateCustomerID = "//button[@type ='submit']";


    }
public ClickonBankManagerLoginButton() 
    {
        const btnlogin = element(by.xpath(this.bankmanagerloginbtn));
        if (btnlogin.isDisplayed)    
        {
            btnlogin.click();

        }
        else
        {
            console.log("element not displayed");
        }
    }


public ClickonAddCustomerButton() 
{
    const custbtn = element (by.xpath(this.addcustomerbtn));
    if (custbtn.isDisplayed())
    {
        custbtn.click();
    }
    else
    {
        console.log("customer button is not displayed");
  }
}


enterFirstName(keys)
{
    const frstname = element(by.xpath(this.firstName));
    if (frstname.isDisplayed())
     {
       frstname.sendKeys(keys);
     }
     else
     {
       console.log("first name field is not displaying")
     }
}

enterLastName(keys)
{
    const lstname = element(by.xpath(this.lastName));
    if(lstname.isDisplayed())
    {
       lstname.sendKeys(keys);
    }   
    else
    {
      console.log("last name field is not displaying");
    }
}

enterPostalcode(keys)
{
    const pstlcode = element(by.xpath(this.postcode));
    if (pstlcode.isDisplayed())
      {
        pstlcode.sendKeys(keys);
      }
      else
    {

    }
      console.log("postal code is not displaying")
}

addCustomerButtonClick()
{
    const custbtn = element (by.xpath(this.generateCustomerID));
    if(custbtn.isDisplayed())
    {
     custbtn.click();
    }
    else
    { 
    console.log("Submit button is not displaying");
    }
    const alertDialog = browser.switchTo().alert();
    alertDialog.accept();
    var text: any= alertDialog.getText();
    console.log(text);
}

}
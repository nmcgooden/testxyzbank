Object.defineProperty(exports, "__esModule", { value: true });
const Actions_1 = require("../Action/Actions");
class AddCustomer extends Actions_1.Actions {
    constructor() {
        super();
        this.clickAddCustomer = "//button[@ng-click ='addCust()']";
        this.firstName = "//input[@ng-model = 'fName']";
        this.lastName = "//input[@ng-model = 'lName']";
        this.postcode = "//input[@ng-model = 'postCD']";
        this.generateCustomerID = "//button[@type = 'submit']";
    }
    ClickonBankManagerLoginButton() {
        this.myClick(this.clickonBankManagerLoginButton, "Click on add Customer");
    }

    clickAddCustomerButton() {
        this.myClick(this.clickAddCustomer, "Click on add Customer");
    }
    enterFirstName(keys) {
        ;
        this.sendKey(this.firstName, "enter first name", keys);
    }
    enterLastName(keys) {
        this.sendKey(this.lastName, "enter last name", keys);
    }
    clickaddCustomerButtonClick() {
        this.myClick(this.clickAddCustomerButtonClick, "Click on add Customer Button Click");
}
exports.AddCustomer = AddCustomer;
//# sourceMappingURL=addcustomer.js.map//
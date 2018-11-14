"use strict";
//*Author: Nate McGooden//
//*Creation Date: 11/7/2018//
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const bankmanager_1 = require("../Pages/BankManagerTest/bankmanager");
let jsd = require('../Data/testData');
var customerdetails = new bankmanager_1.AddCustomer();
describe('Bankmanager Testing', function () {
    //Launch//  
    it('Launch and Enter Value in Bankmanger', () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield protractor_1.browser.get(jsd.CustomerData1.url);
        }
        catch (error) {
            console.log(error);
        }
    }));
    it('Click on Bank Manager Login Button', () => __awaiter(this, void 0, void 0, function* () {
        yield customerdetails.ClickonBankManagerLoginButton();
    }));
    it('Click on Add Customer Button', () => __awaiter(this, void 0, void 0, function* () {
        yield customerdetails.ClickonAddCustomerButton();
    }));
    it('Enter the First Name Value', () => __awaiter(this, void 0, void 0, function* () {
        yield customerdetails.enterFirstName(jsd.CustomerData1.firstname);
    }));
    it('Enter the Last Name Value', () => __awaiter(this, void 0, void 0, function* () {
        yield customerdetails.enterLastName(jsd.CustomerData1.lastname);
    }));
    it('Enter the Postal Code', () => __awaiter(this, void 0, void 0, function* () {
        yield customerdetails.enterPostalcode(jsd.CustomerData1.Code);
    }));
    it('Click on add customer button', () => __awaiter(this, void 0, void 0, function* () {
        yield customerdetails.addCustomerButtonClick();
    }));
});
//# sourceMappingURL=New.js.map
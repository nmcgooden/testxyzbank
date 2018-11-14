var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "Launch and Enter Value in Bankmanger|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8136,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e80012-0035-0045-0040-0069006600f6.png",
        "timestamp": 1541607931007,
        "duration": 5199
    },
    {
        "description": "Click on Bank Manager Login Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8136,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002400b2-0076-0078-00a4-009600a900a6.png",
        "timestamp": 1541607936547,
        "duration": 93
    },
    {
        "description": "Click on Add Customer Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8136,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007400eb-00a2-0079-0065-00ad00d50083.png",
        "timestamp": 1541607936927,
        "duration": 105
    },
    {
        "description": "Enter the First Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8136,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00160046-00f2-0047-003d-0089004b0088.png",
        "timestamp": 1541607937301,
        "duration": 174
    },
    {
        "description": "Enter the Last Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8136,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004b0060-003e-0096-0037-009d005f001b.png",
        "timestamp": 1541607937885,
        "duration": 143
    },
    {
        "description": "Enter the Postal Code|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8136,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00cf005e-00fb-00a5-0019-00d8000300c5.png",
        "timestamp": 1541607938304,
        "duration": 117
    },
    {
        "description": "Launch and Enter Value in Bankmanger|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1708,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007500d9-003d-00b0-0038-0082009300f2.png",
        "timestamp": 1541609468306,
        "duration": 5420
    },
    {
        "description": "Click on Bank Manager Login Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1708,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ed0074-00a7-000c-0016-003d00ad00c2.png",
        "timestamp": 1541609474031,
        "duration": 113
    },
    {
        "description": "Click on Add Customer Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1708,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00fc0009-0005-0060-003c-00a000ca00c0.png",
        "timestamp": 1541609474534,
        "duration": 94
    },
    {
        "description": "Enter the First Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1708,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e200d0-0071-00cb-00fa-00ec00570095.png",
        "timestamp": 1541609474971,
        "duration": 178
    },
    {
        "description": "Enter the Last Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1708,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007d00ec-0013-0068-0040-009000a20087.png",
        "timestamp": 1541609475625,
        "duration": 188
    },
    {
        "description": "Enter the Postal Code|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 1708,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006500f0-0071-009c-0091-00d00024009a.png",
        "timestamp": 1541609476103,
        "duration": 150
    },
    {
        "description": "Launch and Enter Value in Bankmanger|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14016,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003800a9-0083-0067-00f0-00ab000d00b4.png",
        "timestamp": 1541611892478,
        "duration": 4257
    },
    {
        "description": "Click on Bank Manager Login Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14016,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d100f0-002f-00bf-005b-00b200c300d6.png",
        "timestamp": 1541611897031,
        "duration": 122
    },
    {
        "description": "Click on Add Customer Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14016,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005100a2-0013-0038-0035-006200ba0032.png",
        "timestamp": 1541611897419,
        "duration": 133
    },
    {
        "description": "Enter the First Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14016,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007c0052-0087-00ad-0002-00cd001c0024.png",
        "timestamp": 1541611897858,
        "duration": 133
    },
    {
        "description": "Enter the Last Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14016,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006700db-00e5-00a8-0080-00ac00e400d6.png",
        "timestamp": 1541611898432,
        "duration": 135
    },
    {
        "description": "Enter the Postal Code|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14016,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00df00c5-000d-0015-0028-00b7001600fa.png",
        "timestamp": 1541611898866,
        "duration": 104
    },
    {
        "description": "Click on add cusotmer button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14016,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00200049-00b3-00f0-002e-00ca006b0012.png",
        "timestamp": 1541611899230,
        "duration": 131
    },
    {
        "description": "Launch and Enter Value in Bankmanger|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7912,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00500044-0099-0004-00e2-001c00680017.png",
        "timestamp": 1541708560645,
        "duration": 1469
    },
    {
        "description": "Click on Bank Manager Login Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7912,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a6002f-0044-00e0-00cf-007e00b50063.png",
        "timestamp": 1541708562496,
        "duration": 366
    },
    {
        "description": "Click on Add Customer Button",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7912,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008c00d3-0097-002a-0028-00a4008f0035.png",
        "timestamp": 1541708563254,
        "duration": 130
    },
    {
        "description": "Enter the First Name Value",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7912,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0005001d-0085-0040-00ce-00ce0097005e.png",
        "timestamp": 1541708563718,
        "duration": 171
    },
    {
        "description": "Enter the Last Name Value",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7912,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005400ef-003a-00c5-00f1-002b009b002d.png",
        "timestamp": 1541708564271,
        "duration": 163
    },
    {
        "description": "Enter the Postal Code",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7912,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002a00e2-0028-004e-00dd-00e10002009e.png",
        "timestamp": 1541708564699,
        "duration": 129
    },
    {
        "description": "Click on add cusotmer button",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7912,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000200ef-00f2-0023-009b-0052003e0049.png",
        "timestamp": 1541708565100,
        "duration": 172
    },
    {
        "description": "Launch and Enter Value in Bankmanger|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10952,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007500f0-0034-00ee-00da-00ff00ed0071.png",
        "timestamp": 1541710504340,
        "duration": 0
    },
    {
        "description": "Click on Bank Manager Login Button|Bankmanager Testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10952,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:31:24)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)\n    at UserContext.it (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:27:53)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Click on Bank Manager Login Button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:27:3)\n    at addSpecsToSuite (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:14:1\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "005b004f-00a0-00f8-00a3-00960099009f.png",
        "timestamp": 1541710504722,
        "duration": 18
    },
    {
        "description": "Click on Add Customer Button|Bankmanager Testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10952,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:47:17)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)\n    at UserContext.it (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:45:47)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Click on Add Customer Button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:45:3)\n    at addSpecsToSuite (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:14:1\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00c8001b-0005-00f8-00d0-007500da0042.png",
        "timestamp": 1541710504990,
        "duration": 16
    },
    {
        "description": "Enter the First Name Value|Bankmanager Testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10952,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:61:17)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)\n    at UserContext.it (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:58:45)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Enter the First Name Value\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:58:3)\n    at addSpecsToSuite (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:14:1\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00900005-00e7-00a9-002b-0037004d003b.png",
        "timestamp": 1541710505294,
        "duration": 19
    },
    {
        "description": "Enter the Last Name Value|Bankmanager Testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10952,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:75:16)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)\n    at UserContext.it (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:72:44)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Enter the Last Name Value\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:72:3)\n    at addSpecsToSuite (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:14:1\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "007c002d-0028-0035-002a-008600fd00ac.png",
        "timestamp": 1541710505569,
        "duration": 12
    },
    {
        "description": "Enter the Postal Code|Bankmanager Testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10952,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:88:18)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)\n    at UserContext.it (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:85:40)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Enter the Postal Code\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:85:3)\n    at addSpecsToSuite (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:14:1\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "0018007d-007e-00d0-000a-0083001300e3.png",
        "timestamp": 1541710505851,
        "duration": 14
    },
    {
        "description": "Click on add cusotmer button|Bankmanager Testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10952,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:101:17)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)\n    at UserContext.it (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:99:47)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Click on add cusotmer button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:99:3)\n    at addSpecsToSuite (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:14:1\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "006b0082-0004-00a9-0098-006f0039002f.png",
        "timestamp": 1541710506105,
        "duration": 16
    },
    {
        "description": "Launch and Enter Value in Bankmanger|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18096,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0039008f-0069-00bf-0065-0040009500a0.png",
        "timestamp": 1541710668578,
        "duration": 0
    },
    {
        "description": "Click on Bank Manager Login Button|Bankmanager Testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18096,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:31:24)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)\n    at UserContext.it (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:27:53)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Click on Bank Manager Login Button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:27:3)\n    at addSpecsToSuite (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:14:1\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "008d00b4-00c9-00a3-0029-00ba00340017.png",
        "timestamp": 1541710668966,
        "duration": 15
    },
    {
        "description": "Click on Add Customer Button|Bankmanager Testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18096,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:47:17)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)\n    at UserContext.it (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:45:47)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Click on Add Customer Button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:45:3)\n    at addSpecsToSuite (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:14:1\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "005000e0-007d-0046-00ac-00050074005f.png",
        "timestamp": 1541710669268,
        "duration": 0
    },
    {
        "description": "Enter the First Name Value|Bankmanager Testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18096,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:61:17)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)\n    at UserContext.it (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:58:45)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Enter the First Name Value\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:58:3)\n    at addSpecsToSuite (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:14:1\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "000600db-000c-00fc-00a4-0049003f00f4.png",
        "timestamp": 1541710669543,
        "duration": 20
    },
    {
        "description": "Enter the Last Name Value|Bankmanager Testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18096,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:75:16)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)\n    at UserContext.it (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:72:44)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Enter the Last Name Value\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:72:3)\n    at addSpecsToSuite (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:14:1\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00cd0097-00a4-00e7-00a0-006c00b10035.png",
        "timestamp": 1541710669856,
        "duration": 13
    },
    {
        "description": "Enter the Postal Code|Bankmanager Testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18096,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:88:18)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)\n    at UserContext.it (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:85:40)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Enter the Postal Code\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:85:3)\n    at addSpecsToSuite (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:14:1\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00aa00ab-00f7-00a4-0019-0022008000fd.png",
        "timestamp": 1541710670153,
        "duration": 12
    },
    {
        "description": "Click on add cusotmer button|Bankmanager Testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18096,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:101:17)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)\n    at UserContext.it (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:99:47)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Click on add cusotmer button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:99:3)\n    at addSpecsToSuite (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:14:1\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "009500eb-0039-0001-00be-008800c50001.png",
        "timestamp": 1541710670431,
        "duration": 16
    },
    {
        "description": "Launch and Enter Value in Bankmanger|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6700,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d600ca-005f-00de-0010-001c006e00b1.png",
        "timestamp": 1541710951320,
        "duration": 6
    },
    {
        "description": "Click on Bank Manager Login Button|Bankmanager Testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6700,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:31:24)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)\n    at UserContext.it (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:27:53)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Click on Bank Manager Login Button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:27:3)\n    at addSpecsToSuite (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:14:1\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00d600d9-00f2-00d6-00f4-00ea00dd0050.png",
        "timestamp": 1541710951733,
        "duration": 26
    },
    {
        "description": "Click on Add Customer Button|Bankmanager Testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6700,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:47:17)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)\n    at UserContext.it (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:45:47)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Click on Add Customer Button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:45:3)\n    at addSpecsToSuite (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:14:1\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00a3000c-0024-0011-0085-003300b30092.png",
        "timestamp": 1541710951991,
        "duration": 12
    },
    {
        "description": "Enter the First Name Value|Bankmanager Testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6700,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:61:17)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)\n    at UserContext.it (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:58:45)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Enter the First Name Value\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:58:3)\n    at addSpecsToSuite (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:14:1\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "007e0076-00a5-0070-005e-0048008f0008.png",
        "timestamp": 1541710952333,
        "duration": 17
    },
    {
        "description": "Enter the Last Name Value|Bankmanager Testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6700,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:75:16)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)\n    at UserContext.it (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:72:44)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Enter the Last Name Value\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:72:3)\n    at addSpecsToSuite (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:14:1\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00dc0037-00ab-000f-00e8-00320033001a.png",
        "timestamp": 1541710952634,
        "duration": 17
    },
    {
        "description": "Enter the Postal Code|Bankmanager Testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6700,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:88:18)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)\n    at UserContext.it (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:85:40)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Enter the Postal Code\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:85:3)\n    at addSpecsToSuite (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:14:1\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00c4004f-009c-001d-00af-00cc00cf003b.png",
        "timestamp": 1541710952919,
        "duration": 13
    },
    {
        "description": "Click on add cusotmer button|Bankmanager Testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 6700,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": [
            "Failed: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\""
        ],
        "trace": [
            "Error: Error while waiting for Protractor to sync with the page: \"both angularJS testability and angular testability are undefined.  This could be either because this is a non-angular page or because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.  See http://git.io/v4gXM for details\"\n    at runWaitForAngularScript.then (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\browser.js:463:23)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:189:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as isDisplayed] (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:101:17)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)\n    at UserContext.it (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:99:47)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\nFrom: Task: Run it(\"Click on add cusotmer button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:99:3)\n    at addSpecsToSuite (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\jisqnm3\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.ts:14:1\n    at Generator.next (<anonymous>)\n    at C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:9:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\jisqnm3\\Desktop\\xyz_bank\\xyz_bank\\xyz_bank\\Specs\\New.js:5:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "00c600f4-0016-00ea-0095-003a009e00a3.png",
        "timestamp": 1541710953239,
        "duration": 14
    },
    {
        "description": "Launch and Enter Value in Bankmanger|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17384,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006700e7-00c5-0015-0027-007d000b002c.png",
        "timestamp": 1541711154175,
        "duration": 8291
    },
    {
        "description": "Click on Bank Manager Login Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17384,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002100f9-0080-0078-00ec-00650082006c.png",
        "timestamp": 1541711162816,
        "duration": 116
    },
    {
        "description": "Click on Add Customer Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17384,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c90045-0091-009b-00e0-00a8005800b3.png",
        "timestamp": 1541711163318,
        "duration": 131
    },
    {
        "description": "Enter the First Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17384,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003000e6-002e-00e0-00f4-00b0007d0012.png",
        "timestamp": 1541711163791,
        "duration": 228
    },
    {
        "description": "Enter the Last Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17384,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a800b2-00af-0054-00ef-0027007f0030.png",
        "timestamp": 1541711164484,
        "duration": 219
    },
    {
        "description": "Enter the Postal Code|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17384,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003500fb-0021-00b1-0052-006600cd0009.png",
        "timestamp": 1541711165075,
        "duration": 171
    },
    {
        "description": "Click on add cusotmer button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17384,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ce00a3-00ad-0037-00c1-00d40062004e.png",
        "timestamp": 1541711165651,
        "duration": 167
    },
    {
        "description": "Launch and Enter Value in Bankmanger|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15836,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00910037-00ba-000f-006b-0062009f0051.png",
        "timestamp": 1541715527233,
        "duration": 2127
    },
    {
        "description": "Click on Bank Manager Login Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15836,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004f0016-009e-0086-0091-006d006f007d.png",
        "timestamp": 1541715529850,
        "duration": 333
    },
    {
        "description": "Click on Add Customer Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15836,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008f00cf-005c-006a-00bb-004b00f90016.png",
        "timestamp": 1541715530557,
        "duration": 133
    },
    {
        "description": "Enter the First Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15836,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007c00d0-00c5-00bf-00e0-0078003a0073.png",
        "timestamp": 1541715531151,
        "duration": 187
    },
    {
        "description": "Enter the Last Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15836,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008f0096-00f0-00c7-00c9-00be006c00b0.png",
        "timestamp": 1541715531817,
        "duration": 144
    },
    {
        "description": "Enter the Postal Code|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15836,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00400022-00e1-0041-00e9-00a0003d0072.png",
        "timestamp": 1541715532285,
        "duration": 148
    },
    {
        "description": "Click on add cusotmer button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15836,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00120019-0034-007e-0079-00ec009e0003.png",
        "timestamp": 1541715532791,
        "duration": 176
    },
    {
        "description": "Launch and Enter Value in Bankmanger|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15340,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005700cc-002c-00b1-004f-0022001f00c2.png",
        "timestamp": 1541788325038,
        "duration": 2259
    },
    {
        "description": "Click on Bank Manager Login Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15340,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006c002f-00aa-009f-00e6-00c100a800b5.png",
        "timestamp": 1541788327787,
        "duration": 136
    },
    {
        "description": "Click on Add Customer Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15340,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d300c3-009f-0038-0008-00c30044005b.png",
        "timestamp": 1541788328205,
        "duration": 506
    },
    {
        "description": "Enter the First Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15340,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00170019-0042-00a3-0066-006e0069003e.png",
        "timestamp": 1541788329189,
        "duration": 196
    },
    {
        "description": "Enter the Last Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15340,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00af0092-00da-007a-00d9-00d2000e000c.png",
        "timestamp": 1541788329816,
        "duration": 153
    },
    {
        "description": "Enter the Postal Code|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15340,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000300ae-0070-0039-0050-00420003000f.png",
        "timestamp": 1541788330255,
        "duration": 153
    },
    {
        "description": "Click on add cusotmer button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15340,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009700ac-0002-00ae-0029-0047005c0084.png",
        "timestamp": 1541788330716,
        "duration": 204
    },
    {
        "description": "Launch and Enter Value in Bankmanger|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5528,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009c00f4-0038-0007-0055-00de008a001a.png",
        "timestamp": 1541797875854,
        "duration": 1638
    },
    {
        "description": "Click on Bank Manager Login Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5528,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00cc0014-0045-0023-008d-0068005600e1.png",
        "timestamp": 1541797877940,
        "duration": 111
    },
    {
        "description": "Click on Add Customer Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5528,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0086000a-0096-00ed-000c-00fd008f00f8.png",
        "timestamp": 1541797878606,
        "duration": 274
    },
    {
        "description": "Enter the First Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5528,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ed0096-00bc-000b-009f-00b900ab00fa.png",
        "timestamp": 1541797879344,
        "duration": 193
    },
    {
        "description": "Enter the Last Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5528,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00810090-00f5-0057-0098-003e00570028.png",
        "timestamp": 1541797879942,
        "duration": 138
    },
    {
        "description": "Enter the Postal Code|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5528,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d900df-00d4-0007-00ff-00fd000b00fd.png",
        "timestamp": 1541797880378,
        "duration": 116
    },
    {
        "description": "Click on add customer button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5528,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f200de-0039-004c-00bd-004a00f8006e.png",
        "timestamp": 1541797880786,
        "duration": 154
    },
    {
        "description": "Launch and Enter Value in Bankmanger|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18332,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002100cc-00e6-0082-0080-002200c100db.png",
        "timestamp": 1542044866982,
        "duration": 6370
    },
    {
        "description": "Click on Bank Manager Login Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18332,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003b0037-0092-006e-00f4-004500620007.png",
        "timestamp": 1542044873781,
        "duration": 117
    },
    {
        "description": "Click on Add Customer Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18332,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002c00db-00c2-0046-0051-0092009f00bd.png",
        "timestamp": 1542044874182,
        "duration": 112
    },
    {
        "description": "Enter the First Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18332,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00cc001d-00c0-00a7-001e-0069003800b0.png",
        "timestamp": 1542044874563,
        "duration": 191
    },
    {
        "description": "Enter the Last Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18332,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00cb00b1-0051-00c7-00a3-0023000800da.png",
        "timestamp": 1542044875139,
        "duration": 120
    },
    {
        "description": "Enter the Postal Code|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18332,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009400ef-0047-00fd-008e-002c006a0047.png",
        "timestamp": 1542044875539,
        "duration": 134
    },
    {
        "description": "Click on add customer button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 18332,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004f00cb-0011-0078-001b-004700c80051.png",
        "timestamp": 1542044875948,
        "duration": 162
    },
    {
        "description": "Launch and Enter Value in Bankmanger|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14676,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004200c4-004d-00e6-00c8-007800e6001b.png",
        "timestamp": 1542044899122,
        "duration": 6115
    },
    {
        "description": "Click on Bank Manager Login Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14676,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c7002c-0021-003d-00c7-004b006300b6.png",
        "timestamp": 1542044905591,
        "duration": 104
    },
    {
        "description": "Click on Add Customer Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14676,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ec00ee-0083-0030-00a9-0079000a00b5.png",
        "timestamp": 1542044905976,
        "duration": 111
    },
    {
        "description": "Enter the First Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14676,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b7004b-00a6-004f-001a-009e00c20076.png",
        "timestamp": 1542044906377,
        "duration": 156
    },
    {
        "description": "Enter the Last Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14676,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004b0042-00a7-00ca-0037-0000007300ac.png",
        "timestamp": 1542044906969,
        "duration": 156
    },
    {
        "description": "Enter the Postal Code|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14676,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0035005a-0063-00a8-0092-00a20004008b.png",
        "timestamp": 1542044907386,
        "duration": 156
    },
    {
        "description": "Click on add customer button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14676,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d60042-00ff-009b-00ab-00b5004e00a6.png",
        "timestamp": 1542044907831,
        "duration": 149
    },
    {
        "description": "Launch and Enter Value in Bankmanger|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10564,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006d00ea-00cf-00a3-009f-00a0004b0053.png",
        "timestamp": 1542222671723,
        "duration": 3109
    },
    {
        "description": "Click on Bank Manager Login Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10564,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007f00f8-0010-0052-0060-00c5004d00a0.png",
        "timestamp": 1542222675243,
        "duration": 115
    },
    {
        "description": "Click on Add Customer Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10564,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0084001d-000f-00e4-0064-00b000190073.png",
        "timestamp": 1542222675620,
        "duration": 132
    },
    {
        "description": "Enter the First Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10564,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007f00ef-004a-00b2-0081-00030066004a.png",
        "timestamp": 1542222676015,
        "duration": 370
    },
    {
        "description": "Enter the Last Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10564,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00060078-0043-006b-0043-00d500ce0026.png",
        "timestamp": 1542222676729,
        "duration": 174
    },
    {
        "description": "Enter the Postal Code|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10564,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004d0079-009d-00fa-006b-00fb00f700f7.png",
        "timestamp": 1542222677403,
        "duration": 170
    },
    {
        "description": "Click on add customer button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 10564,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f00007-0025-0011-005d-0082009d0069.png",
        "timestamp": 1542222677857,
        "duration": 181
    },
    {
        "description": "Launch and Enter Value in Bankmanger|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001d001a-0098-0053-0090-000e00ba0061.png",
        "timestamp": 1542224599711,
        "duration": 2160
    },
    {
        "description": "Click on Bank Manager Login Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00c200d7-0095-0093-0095-005d00570043.png",
        "timestamp": 1542224602215,
        "duration": 131
    },
    {
        "description": "Click on Add Customer Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00910093-00ec-003f-0077-00ef00860055.png",
        "timestamp": 1542224602720,
        "duration": 134
    },
    {
        "description": "Enter the First Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b700ac-0053-004a-0055-00bf00c0006b.png",
        "timestamp": 1542224603131,
        "duration": 210
    },
    {
        "description": "Enter the Last Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005900ec-0015-00ec-002f-000900cd0098.png",
        "timestamp": 1542224603980,
        "duration": 171
    },
    {
        "description": "Enter the Postal Code|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004000ff-001d-002f-00b2-0025008b0015.png",
        "timestamp": 1542224604457,
        "duration": 116
    },
    {
        "description": "Click on add customer button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15656,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00970032-002d-0086-0006-00b0004b008d.png",
        "timestamp": 1542224604881,
        "duration": 144
    },
    {
        "description": "Launch and Enter Value in Bankmanger|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3312,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00a10079-0027-0066-0030-007600a3000d.png",
        "timestamp": 1542225736814,
        "duration": 2855
    },
    {
        "description": "Click on Bank Manager Login Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3312,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d90072-0062-00a3-0081-005d005f002f.png",
        "timestamp": 1542225739957,
        "duration": 87
    },
    {
        "description": "Click on Add Customer Button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3312,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0044007e-0056-0013-0059-00a40000007a.png",
        "timestamp": 1542225740314,
        "duration": 125
    },
    {
        "description": "Enter the First Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3312,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002c003a-00ae-0020-00bf-0093004b004d.png",
        "timestamp": 1542225740714,
        "duration": 147
    },
    {
        "description": "Enter the Last Name Value|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3312,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008600a1-00fd-0083-00ff-006800b10014.png",
        "timestamp": 1542225741453,
        "duration": 131
    },
    {
        "description": "Enter the Postal Code|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3312,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008a0078-0090-00f1-00ef-00c900fa00ea.png",
        "timestamp": 1542225741882,
        "duration": 119
    },
    {
        "description": "Click on add customer button|Bankmanager Testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 3312,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0067002b-0056-0032-005d-00f400a9003e.png",
        "timestamp": 1542225742291,
        "duration": 137
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};

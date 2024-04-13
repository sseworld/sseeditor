"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var dispute_1 = require("@ephox/dispute");
var katamari_1 = require("@ssephox/katamari");
var fast_check_1 = require("fast-check");
var KAssert = require("ssephox/katamari-assertions/api/KAssert");
var tNumber = dispute_1.Testable.tNumber;
var tBoom = function () {
    return dispute_1.Testable.testable(dispute_1.Eq.eq(katamari_1.Fun.die("should not be called")), dispute_1.Pprint.pprint(katamari_1.Fun.die("should not be called")));
};
var twoDifferentNumbers = fast_check_1.default
    .tuple(fast_check_1.default.integer(), fast_check_1.default.integer())
    .filter(function (_a) {
    var a = _a[0], b = _a[1];
    return a !== b;
});
bedrock_client_1.UnitTest.test("KAssert.eqError: success (reflexivity)", function () {
    fast_check_1.default.assert(fast_check_1.default.property(fast_check_1.default.integer(), function (i) {
        KAssert.eqError("eq", i, katamari_1.Result.error(i));
        KAssert.eqError("eq", i, katamari_1.Result.error(i), tBoom());
        KAssert.eqError("eq", i, katamari_1.Result.error(i), tBoom(), tNumber);
    }));
});
bedrock_client_1.UnitTest.test("KAssert.eqError: failure", function () {
    fast_check_1.default.assert(fast_check_1.default.property(twoDifferentNumbers, function (_a) {
        var a = _a[0], b = _a[1];
        bedrock_client_1.Assert.throws("should throw if numbers differ #1", function () {
            KAssert.eqError("eq", a, katamari_1.Result.error(b));
        });
        bedrock_client_1.Assert.throws("should throw if numbers differ #2", function () {
            KAssert.eqError("eq", a, katamari_1.Result.error(b), tBoom());
        });
        bedrock_client_1.Assert.throws("should throw if numbers differ #2", function () {
            KAssert.eqError("eq", a, katamari_1.Result.error(b), tBoom(), tNumber);
        });
    }));
    fast_check_1.default.assert(fast_check_1.default.property(fast_check_1.default.integer(), fast_check_1.default.string(), function (i, s) {
        bedrock_client_1.Assert.throws("should throw if value #1", function () {
            KAssert.eqError("eq", i, katamari_1.Result.value(s));
        });
        bedrock_client_1.Assert.throws("should throw if value #2", function () {
            KAssert.eqError("eq", i, katamari_1.Result.value(s), tBoom());
        });
        bedrock_client_1.Assert.throws("should throw if value #3", function () {
            KAssert.eqError("eq", i, katamari_1.Result.value(s), tBoom(), tBoom());
        });
    }));
});
bedrock_client_1.UnitTest.test("KAssert.eqValue: success", function () {
    fast_check_1.default.assert(fast_check_1.default.property(fast_check_1.default.integer(), function (i) {
        KAssert.eqValue("eq", i, katamari_1.Result.value(i));
        KAssert.eqValue("eq", i, katamari_1.Result.value(i), tNumber);
        KAssert.eqValue("eq", i, katamari_1.Result.value(i), tNumber, tBoom());
    }));
});
bedrock_client_1.UnitTest.test("KAssert.eqValue: failure", function () {
    fast_check_1.default.assert(fast_check_1.default.property(twoDifferentNumbers, function (_a) {
        var a = _a[0], b = _a[1];
        bedrock_client_1.Assert.throws("should throw if numbers differ #1", function () {
            KAssert.eqValue("eq", a, katamari_1.Result.value(b));
        });
        bedrock_client_1.Assert.throws("should throw if numbers differ #2", function () {
            KAssert.eqValue("eq", a, katamari_1.Result.value(b), tNumber);
        });
        bedrock_client_1.Assert.throws("should throw if numbers differ #2", function () {
            KAssert.eqValue("eq", a, katamari_1.Result.value(b), tNumber, tBoom());
        });
    }));
    fast_check_1.default.assert(fast_check_1.default.property(fast_check_1.default.integer(), fast_check_1.default.string(), function (i, s) {
        bedrock_client_1.Assert.throws("should throw if error #1", function () {
            KAssert.eqValue("eq", i, katamari_1.Result.error(s));
        });
        bedrock_client_1.Assert.throws("should throw if error #2", function () {
            KAssert.eqValue("eq", i, katamari_1.Result.error(s), tBoom());
        });
        bedrock_client_1.Assert.throws("should throw if error #3", function () {
            KAssert.eqValue("eq", i, katamari_1.Result.error(s), tBoom(), tBoom());
        });
    }));
});
bedrock_client_1.UnitTest.test("KAssert.eqResult: success", function () {
    fast_check_1.default.assert(fast_check_1.default.property(fast_check_1.default.integer(), function (i) {
        KAssert.eqResult("eq", katamari_1.Result.value(i), katamari_1.Result.value(i));
        KAssert.eqResult("eq", katamari_1.Result.value(i), katamari_1.Result.value(i), tNumber);
        KAssert.eqResult("eq", katamari_1.Result.value(i), katamari_1.Result.value(i), tNumber, tBoom());
        KAssert.eqResult("eq", katamari_1.Result.error(i), katamari_1.Result.error(i));
        KAssert.eqResult("eq", katamari_1.Result.error(i), katamari_1.Result.error(i), tBoom());
        KAssert.eqResult("eq", katamari_1.Result.error(i), katamari_1.Result.error(i), tBoom(), tNumber);
    }));
});
bedrock_client_1.UnitTest.test("KAssert.eqResult: fail", function () {
    fast_check_1.default.assert(fast_check_1.default.property(twoDifferentNumbers, function (_a) {
        var a = _a[0], b = _a[1];
        bedrock_client_1.Assert.throws("value(a) != (value(!a)) #1", function () {
            KAssert.eqResult("eq", katamari_1.Result.value(a), katamari_1.Result.value(b));
        });
        bedrock_client_1.Assert.throws("value(a) != (value(!a)) #2", function () {
            KAssert.eqResult("eq", katamari_1.Result.value(a), katamari_1.Result.value(b), tNumber);
        });
        bedrock_client_1.Assert.throws("value(a) != (value(!a)) #2", function () {
            KAssert.eqResult("eq", katamari_1.Result.value(a), katamari_1.Result.value(b), tNumber, tBoom());
        });
    }));
    fast_check_1.default.assert(fast_check_1.default.property(twoDifferentNumbers, function (_a) {
        var a = _a[0], b = _a[1];
        bedrock_client_1.Assert.throws("error(a) != (error(!a)) #1", function () {
            KAssert.eqResult("eq", katamari_1.Result.error(a), katamari_1.Result.error(b));
        });
        bedrock_client_1.Assert.throws("error(a) != (error(!a)) #2", function () {
            KAssert.eqResult("eq", katamari_1.Result.error(a), katamari_1.Result.error(b), tBoom());
        });
        bedrock_client_1.Assert.throws("result(a) != (result(!a)) #2", function () {
            KAssert.eqResult("eq", katamari_1.Result.error(a), katamari_1.Result.error(b), tBoom(), tNumber);
        });
    }));
    fast_check_1.default.assert(fast_check_1.default.property(fast_check_1.default.integer(), fast_check_1.default.string(), function (i, s) {
        bedrock_client_1.Assert.throws("value != error #1", function () {
            KAssert.eqResult("eq", katamari_1.Result.value(i), katamari_1.Result.error(s));
        });
        bedrock_client_1.Assert.throws("value != error #2", function () {
            KAssert.eqResult("eq", katamari_1.Result.value(i), katamari_1.Result.error(s), tBoom());
        });
        bedrock_client_1.Assert.throws("value != error #3", function () {
            KAssert.eqResult("eq", katamari_1.Result.value(i), katamari_1.Result.error(s), tBoom());
        });
        bedrock_client_1.Assert.throws("error != value #1", function () {
            KAssert.eqResult("eq", katamari_1.Result.error(i), katamari_1.Result.value(s));
        });
        bedrock_client_1.Assert.throws("error != value #2", function () {
            KAssert.eqResult("eq", katamari_1.Result.error(i), katamari_1.Result.value(s), tBoom());
        });
        bedrock_client_1.Assert.throws("error != value #3", function () {
            KAssert.eqResult("eq", katamari_1.Result.error(i), katamari_1.Result.value(s), tBoom(), tBoom());
        });
    }));
});
bedrock_client_1.UnitTest.test("KAssert.eqSome: success (reflexivity)", function () {
    fast_check_1.default.assert(fast_check_1.default.property(fast_check_1.default.integer(), function (i) {
        KAssert.eqSome("eq", i, katamari_1.Optional.some(i));
        KAssert.eqSome("eq", i, katamari_1.Optional.some(i), tNumber);
    }));
});
bedrock_client_1.UnitTest.test("KAssert.eqSome: failure", function () {
    fast_check_1.default.assert(fast_check_1.default.property(twoDifferentNumbers, function (_a) {
        var a = _a[0], b = _a[1];
        bedrock_client_1.Assert.throws("some(i) != some(!i) #1", function () {
            KAssert.eqSome("eq", a, katamari_1.Optional.some(b));
        });
    }));
    fast_check_1.default.assert(fast_check_1.default.property(twoDifferentNumbers, function (_a) {
        var a = _a[0], b = _a[1];
        bedrock_client_1.Assert.throws("some(i) != some(!i) #2", function () {
            KAssert.eqSome("eq", a, katamari_1.Optional.some(b), tNumber);
        });
    }));
});
bedrock_client_1.UnitTest.test("KAssert.eqNone: success (reflexivity)", function () {
    KAssert.eqNone("eq", katamari_1.Optional.none());
});
bedrock_client_1.UnitTest.test("KAssert.eqNone: failure", function () {
    fast_check_1.default.assert(fast_check_1.default.property(fast_check_1.default.integer(), function (i) {
        bedrock_client_1.Assert.throws("some(i) != none", function () {
            KAssert.eqNone("eq", katamari_1.Optional.some(i));
        });
    }));
});
bedrock_client_1.UnitTest.test("KAssert.eqOption: success (reflexivity)", function () {
    fast_check_1.default.assert(fast_check_1.default.property(fast_check_1.default.integer(), function (i) {
        KAssert.eqOptional("eq", katamari_1.Optional.some(i), katamari_1.Optional.some(i));
        KAssert.eqOptional("eq", katamari_1.Optional.some(i), katamari_1.Optional.some(i), tNumber);
    }));
    KAssert.eqOptional("eq", katamari_1.Optional.none(), katamari_1.Optional.none());
});
bedrock_client_1.UnitTest.test("KAssert.eqOption: failure", function () {
    fast_check_1.default.assert(fast_check_1.default.property(twoDifferentNumbers, function (_a) {
        var a = _a[0], b = _a[1];
        bedrock_client_1.Assert.throws("some(i) != some(!i) #1", function () {
            KAssert.eqOptional("eq", katamari_1.Optional.some(a), katamari_1.Optional.some(b));
        });
    }));
    fast_check_1.default.assert(fast_check_1.default.property(twoDifferentNumbers, function (_a) {
        var a = _a[0], b = _a[1];
        bedrock_client_1.Assert.throws("some(i) != some(!i) #2", function () {
            KAssert.eqOptional("eq", katamari_1.Optional.some(a), katamari_1.Optional.some(b), tNumber);
        });
    }));
    fast_check_1.default.assert(fast_check_1.default.property(fast_check_1.default.integer(), function (i) {
        bedrock_client_1.Assert.throws("none != some(i) #1", function () {
            KAssert.eqOptional("eq", katamari_1.Optional.none(), katamari_1.Optional.some(i));
        });
        bedrock_client_1.Assert.throws("none != some(i) #2", function () {
            KAssert.eqOptional("eq", katamari_1.Optional.none(), katamari_1.Optional.some(i), tBoom());
        });
    }));
    fast_check_1.default.assert(fast_check_1.default.property(fast_check_1.default.integer(), function (i) {
        bedrock_client_1.Assert.throws("some(i) != none #1", function () {
            KAssert.eqOptional("eq", katamari_1.Optional.some(i), katamari_1.Optional.none());
        });
        bedrock_client_1.Assert.throws("some(i) != none #2", function () {
            KAssert.eqOptional("eq", katamari_1.Optional.some(i), katamari_1.Optional.none(), tBoom());
        });
    }));
});
//# sourceMappingURL=KAssertTest.js.map
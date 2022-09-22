"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
expect.extend({
    containsErrorMessages(expected, received) {
        if (typeof expected === "function") {
            try {
                expected();
                return isValid();
            }
            catch (e) {
                const error = e;
                return assertContainsErrosMessages(error.error, received);
            }
        }
        else {
            const { validator, data } = expected;
            const validated = validator.validate(data);
            if (validated) {
                return isValid();
            }
            return assertContainsErrosMessages(validator.errors, received);
        }
    },
});
function isValid() {
    return {
        pass: false,
        message: () => "The data is valid",
    };
}
function assertContainsErrosMessages(expected, received) {
    const isMatch = expect
        .objectContaining(received)
        .asymmetricMatch(expected);
    return isMatch
        ? {
            pass: true,
            message: () => "",
        }
        : {
            pass: false,
            message: () => `The validation errors does not contain ${JSON.stringify(received)}. Current: ${JSON.stringify(expected)}`
        };
}

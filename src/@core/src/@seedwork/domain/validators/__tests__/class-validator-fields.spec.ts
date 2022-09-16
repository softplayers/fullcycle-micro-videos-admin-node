import ClassValidatorFields from "../class-validator-fields";
import * as libClassValidator from "class-validator";

class StubClassValidatorFields extends ClassValidatorFields<{
  field: string;
}> {}

describe("ClassValidatorFields Unit Tests", () => {
  it("should initialize errors and validatedData variable with null", () => {
    const validator = new StubClassValidatorFields();
    expect(validator.errors).toBeNull();
    expect(validator.validatedData).toBeNull();
  });

  it("should validate with errors", () => {
    const spyValidateSync = jest
      .spyOn(libClassValidator, "validateSync")
      .mockReturnValue([
        { property: "field", constraints: { isRequired: "some error" } },
      ]);

    const validator = new StubClassValidatorFields();
    expect(validator.validate(null)).toBeFalsy();
    expect(validator.validatedData).toBeNull();
    expect(validator.errors).toStrictEqual({field: ['some error']});
    expect(spyValidateSync).toHaveBeenCalled();
  });


  it("should validate without errors", () => {
    const spyValidateSync = jest
      .spyOn(libClassValidator, "validateSync")
      .mockReturnValue([]);

    const validator = new StubClassValidatorFields();
    expect(validator.validate({field: 'value'})).toBeTruthy();
    expect(validator.validatedData).toStrictEqual({field: 'value'});
    expect(validator.errors).toBeNull();
    expect(spyValidateSync).toHaveBeenCalled();
  });
});

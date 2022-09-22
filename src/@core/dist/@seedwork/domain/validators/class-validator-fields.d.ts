import ValidatorFieldsInterface, { FieldsErrors } from "./validator-fields-interface";
export default abstract class ClassValidatorFields<PropsValidated> implements ValidatorFieldsInterface<PropsValidated> {
    errors: FieldsErrors | null;
    validatedData: PropsValidated | null;
    validate(data: any): boolean;
}

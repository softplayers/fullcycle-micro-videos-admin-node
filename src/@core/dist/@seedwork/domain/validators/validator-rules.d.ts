export default class ValidatorRule {
    private value;
    private property;
    private constructor();
    static values(value: any, property: string): ValidatorRule;
    required(): Omit<this, 'required'>;
    string(): Omit<this, 'string'>;
    maxLength(max: number): Omit<this, 'maxLength'>;
    boolean(): Omit<this, 'boolean'>;
}
export declare function isEmpty(value: any): boolean;

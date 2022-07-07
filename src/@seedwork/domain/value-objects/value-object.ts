import { deepFreeze } from "../utils/object";

export default abstract class ValueObject<Type = any> {
    protected readonly _value: Type;

    constructor(value: Type) {
        this._value = deepFreeze(value);
    }

    get value(): Type {
        return this._value;
    }

    toString = () => {
        if (typeof this.value !== "object" || this.value == null) {
            try {
                return this.value.toString();
            }
            catch (e) {
                return this.value + "";
            }
        }

        const valueStr = this.value.toString();
        return valueStr === '[object Object]' ? JSON.stringify(this.value) : valueStr;
    }
}

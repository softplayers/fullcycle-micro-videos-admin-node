import { validate } from "uuid";
import InvalidUUidError from "../../errors/invalid-uuid.error";
import UniqueEntityId from "../unique-entity-id.vo";

describe("UniqueEntityId Unit tests", () => {

  const validateSpy = jest.spyOn(UniqueEntityId.prototype, "validate" as any);

  it("should throw error when uuid is invalid", () => {
    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUUidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const uuid = "011a2da2-70e3-4a0a-b6fc-42e9ad976963";
    const vo = new UniqueEntityId(uuid);
    expect(vo.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should no args constructor generate a valid uuid", () => {
    const vo = new UniqueEntityId();
    expect(validate(vo.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});

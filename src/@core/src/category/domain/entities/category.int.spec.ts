// import ValidationError from "../../../@seedwork/domain/errors/validation-error";
import { EntityValidationError } from "../../../@seedwork/domain/errors/validation-error";
import { Category } from "./category";


describe("Category Integration Tests", () => {

  describe("Create", () => {
    it("should be invalid when create", () => {
      expect(() => new Category({ name: null as any })).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });
      expect(() => new Category({ name: '' as any })).containsErrorMessages({
        name: [
          "name should not be empty"
        ],
      });
      expect(() => new Category({ name: 't'.repeat(256) as any })).containsErrorMessages({
        name: [
          "name must be shorter than or equal to 255 characters"
        ],
      });
      expect(() => new Category({ name: 22 as any })).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });
    });

    it("should be invalid when create category with invalid description", () => {
      expect(() => new Category({ name: "teste", description: 5 as any })).containsErrorMessages({
        description: [
          "description must be a string"
        ],
      });
    });

    it("should be invalid when create category with invalid is_active property", () => {
      expect(() => new Category({ name: "teste", is_active: "false" as any })).containsErrorMessages({
        is_active: [
          "is_active must be a boolean value"
        ],
      });
    });

    it("should create when properties are valid", () => {
      expect.assertions(0);
      new Category({ name: "teste" }); // NOSONAR
      new Category({ name: "teste", description: "description" }); // NOSONAR
      new Category({ name: "teste", description: null }); // NOSONAR
      new Category({ name: "teste", description: null, is_active: false }); // NOSONAR
      new Category({ name: "teste", description: null, is_active: true }); // NOSONAR
    });
  });

  describe("Update", () => {
    it("should be invalid when create category with invalid name property", () => {
      const category = new Category({ name: "Name" })
      expect(() => category.update(null as any, "description")).containsErrorMessages({
        name: [
          "name should not be empty", "name must be a string", "name must be shorter than or equal to 255 characters"
        ],
      });
      expect(() => category.update("", "description")).containsErrorMessages({
        name: [
          "name should not be empty"
        ],
      });
      expect(() => category.update('t'.repeat(256), "description")).containsErrorMessages({
        name: [
          "name must be shorter than or equal to 255 characters"
        ],
      });
      expect(() => category.update(22 as any, "description")).containsErrorMessages({
        name: [
          "name must be a string","name must be shorter than or equal to 255 characters"
        ],
      });
    });

    it("should be invalid when create category with invalid description property", () => {
      const category = new Category({ name: "Name" })
      expect(() => category.update("Name", 5 as any)).containsErrorMessages({
        description: [
          "description must be a string",
        ],
      });
    });


    it("should update category when properties are valid", () => {
      expect.assertions(0);
      const category = new Category({ name: "teste" });
      category.update("teste", "description");
      category.update("teste", null as any);
      category.update("teste", undefined as any);
    });

  });
});

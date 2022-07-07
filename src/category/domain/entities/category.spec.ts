import { Category } from "./category";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";


describe("Category Tests", () => {
  test("Contructor of category", () => {
    // Arrange
    const now = new Date();
    const fullProps = {
      name: "movie",
      description: "description",
      is_active: true,
      created_at: now,
    };

    // Minimal constructor
    let category = new Category({ name: "Movie" });
    expect(category.props).toMatchObject({
      name: "Movie",
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    // Big Constructor
    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      description: "some description",
      is_active: false,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    // Name + Desc
    category = new Category({
      name: "Movie 2",
      description: "some description 2",
    });
    expect(category.props).toMatchObject({
      name: "Movie 2",
      description: "some description 2",
      is_active: true,
    });

    // Name + Active
    category = new Category({ name: "Movie 2", is_active: false });
    expect(category.props).toMatchObject({
      name: "Movie 2",
      description: null,
      is_active: false,
    });

    // Full Constructor
    category = new Category(fullProps);
    expect(category.name).toBe("movie");
    expect(category.description).toBe("description");
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBe(now);
    expect(category.props).toMatchObject(fullProps);
  });

  test('getter of name field', () => {
    const category = new Category({name: 'Movie'});
    expect(category.name).toBe('Movie')
  });

  test('getter and setter of description field', () => {
    let category = new Category({name: 'Movie'});
    expect(category.description).toBeNull();

    category = new Category({name: 'Movie', description: 'some description'});
    expect(category.description).toBe('some description');

    category = new Category({name: 'Movie'});
    category['description'] = "some description"
    expect(category.description).toBe('some description');

    category = new Category({name: 'Movie'});
    category['description'] = undefined
    expect(category.description).toBeNull();
  });

  test('getter and setter of is_active field', () => {
    let category = new Category({name: 'Movie'});
    expect(category.is_active).toBeTruthy();

    category = new Category({name: 'Movie', is_active: false});
    expect(category.is_active).toBeFalsy();

    category = new Category({name: 'Movie', is_active: true});
    expect(category.is_active).toBeTruthy();
  });

  test('getter of created_at field', () => {
    let category = new Category({name: 'Movie'});
    expect(category.created_at).toBeInstanceOf(Date);

    const created_at = new Date();
    category = new Category({name: 'Movie', created_at});
    expect(category.created_at).toBe(created_at);
  });

  test('id field', () => {
    let category = new Category({name: 'Movie'});
    expect(category.uniqueEntityId).not.toBeNull();
    expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);

    category = new Category({name: 'Movie'}, undefined);
    expect(category.uniqueEntityId).not.toBeNull();
    expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);

    category = new Category({name: 'Movie'}, new UniqueEntityId());
    expect(category.uniqueEntityId).not.toBeNull();
    expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
  });


  it("should update a category", () => {
    const category = new Category({ name: "Movie" });
    category.update("Documentary", "some description");
    expect(category.name).toBe("Documentary");
    expect(category.description).toBe("some description");
  });

  it("should active a category", () => {
    const category = new Category({
      name: "Filmes",
      is_active: false,
    });
    category.activate();
    expect(category.is_active).toBeTruthy();
  });

  test("should disable a category", () => {
    const category = new Category({
      name: "Filmes",
      is_active: true,
    });
    category.deactivate();
    expect(category.is_active).toBeFalsy();
  });

});

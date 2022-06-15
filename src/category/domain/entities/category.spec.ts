import { Category } from "./category";

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
});

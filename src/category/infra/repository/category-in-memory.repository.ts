import CategoryRepository from "category/domain/repository/category.repository";
import { InMemorySearchableRepository } from "../../../@seedwork/domain/repository/in-memory.repository";
import { Category } from "../../../category/domain/entities/category";

class CategoryInMemoryRepository extends InMemorySearchableRepository<Category> implements CategoryRepository { }

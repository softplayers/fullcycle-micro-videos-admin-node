import { SerchableRepositoryInterface } from "../../../@seedwork/domain/repository/repository-contracts";
import { Category } from "../entities/category";

export default interface CategoryRepository extends SerchableRepositoryInterface<Category, any, any> { }
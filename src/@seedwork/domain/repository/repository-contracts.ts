import Entity from "../entity/entity";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";

export interface RepositoryInterface<E extends Entity<any>> {
  insert(entity: E): Promise<E>;
  findById(id: string | UniqueEntityId): Promise<E>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<E>;
  delete(id: string | UniqueEntityId): Promise<void>;
}

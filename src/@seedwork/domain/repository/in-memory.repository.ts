import Entity from "../entity/entity";
import NotFoundError from "../errors/not-found.error";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import { RepositoryInterface } from "./repository-contracts";

export default abstract class InMemoryRepository<E extends Entity<any>> implements RepositoryInterface<E> {
  
  items: E[] = [];

  async insert(entity: E): Promise<E> {
    this.items.push(entity);
    return entity;
  }
  
  async findById(id: string | UniqueEntityId): Promise<E> {
    const idStr = `${id}`
    return this._get(idStr);
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<E> {
    await this._get(entity.id);
    const index = this.items.findIndex(item => item.id === entity.id);
    this.items[index] = entity;
    return entity;
  }
  
  async delete(id: string | UniqueEntityId): Promise<void> {
    const idStr = `${id}`;
    await this._get(idStr);
    const index = this.items.findIndex(item => item.id === idStr);
    this.items.splice(index, 1);
  }

  protected async _get(id: string): Promise<E> {
    const idStr = `${id}`
    const item = this.items.find(item => item.id == idStr)
    if (!item) {
      throw new NotFoundError(`Entity not found with id '${id}'`);
    }
    return item;
  }

}

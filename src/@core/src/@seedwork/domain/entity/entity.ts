import UniqueEntityId from "../value-objects/unique-entity-id.vo";

export abstract class Entity<Props> {
  public readonly uniqueEntityId: UniqueEntityId;

  constructor(public readonly props: Props, id?: UniqueEntityId) {
    this.uniqueEntityId = id || new UniqueEntityId();
  }

  get id() {
    return this.uniqueEntityId.value;
  }

  toJSON() {
    return {
        id: this.id,
        ...this.props,
    } as Required<{id: string} & Props>
  }
}

export default Entity;

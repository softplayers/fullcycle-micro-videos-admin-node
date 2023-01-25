export class SequelizeModelFactory {

  private _count = 1

  constructor(private model, private defaultFactoryProps: () => any) { }

  count(count: number) {
    this._count = count;
    return this;
  }

  async create(data?: any) {
    return this.model.create(data ?? this.defaultFactoryProps());
  }

  make(data?: any) {
    return this.model.build(data ?? this.defaultFactoryProps());
  }

  async bulkCreate(factoryProps?: (index: number) => any) {

    const data = new Array(this._count)
      .fill(factoryProps ?? this.defaultFactoryProps)
      .map((factory, index) => factory(index));

    return this.model.bulkCreate(data);
  }

  bulkMake() {

  }
}

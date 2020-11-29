export default class ItemSchema {
  static schema = {
    name: 'TodoItem',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      description: 'string',
      date: 'string',
    },
  };
}

import uuid from 'uuid';

export interface Store<Model, KeyType = string> {
  get: (id: KeyType) => Model | null;
  set: (id: KeyType, value: Model) => void;
  add: (value: Model) => KeyType;
  has: (id: KeyType) => boolean;
  remove: (id: KeyType) => void;
}

export const create = <Model>(): Store<Model> => {
  const newStorage = {} as { [id: string]: Model };

  const newStore = {
    get: (id: string) => newStorage[id] || null,
    set: (id: string, value: Model) => {
      newStorage[id] = value;
    },
    add: (value: Model) => {
      const newId = uuid.v4();
      newStorage[newId] = value;
      return newId;
    },
    has: (id: string) => !!newStorage[id],
    remove: (id: string) => {
      delete newStorage[id];
    },
  };

  return newStore;
};

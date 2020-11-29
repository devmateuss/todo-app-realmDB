import Realm from 'realm';

import ItemSchema from '../schemas/ItemSchema';

export default function getRealm() {
  return Realm.open({
    schema: [ItemSchema],
  });
}

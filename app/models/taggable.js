import Model from '@ember-data/model';
import { hasMany } from '@ember-data/model';
import detectByName from '../detect-by-name';

@detectByName
class Taggable extends Model {
}

const decorator = function(klass) {
  return class Taggable extends klass {
    @hasMany('tags') tags
  }
};

export { decorator }
export default Taggable;

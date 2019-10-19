import Model from '@ember-data/model';
import { hasMany } from '@ember-data/model';
import detectByName from '../detect-by-name';

/**
 * This is an ember data model that is not actually backed
 * by a backend data source. Instead, this references the polymorphic relationship.
 *
 * This is only used so that when Ember Data tries to reflect
 * on a `commentable`, it can know how to find the appropriate
 * ancestors
 *
 * Note that it is critical that the name of this class is the same as below
 */
@detectByName
class Commentable extends Model {
}

/**
 * This is where we define the decorator that will be used
 * for classes that will be on the other side of the polymorphic
 * join.
 *
 * This is where you assign the reverse relationship back to our
 * polymorphic model, and any associated methods.
 *
 * Note that it is critical that the name of this class is the same as above
 */
const decorator = function(klass) {
  return class Commentable extends klass {
    @hasMany('comments') comments
  }
};

export { decorator }
export default Commentable;

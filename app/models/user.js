import Model from '@ember-data/model';
import { decorator as commentable } from './commentable';
import { attr } from '@ember-data/model';

@commentable
class User extends Model {
  @attr('string') name

  foo = 'bar'
}

export default User;

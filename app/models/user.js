import Model from '@ember-data/model';
import { attr } from '@ember-data/model';
import { decorator as commentable } from './commentable';
import { decorator as taggable } from './taggable';

@taggable
@commentable
class User extends Model {
  @attr('string') name
}

export default User;

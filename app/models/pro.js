import Model from '@ember-data/model';
import { attr } from '@ember-data/model';
import { decorator as commentable } from './commentable';

@commentable
class Pro extends Model {
  @attr('string') name
}

export default Pro;

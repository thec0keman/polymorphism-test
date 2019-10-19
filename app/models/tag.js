import { belongsTo } from '@ember-data/model';
import Model from '@ember-data/model';

export default class Tag extends Model {
  @belongsTo('taggable') taggable
}

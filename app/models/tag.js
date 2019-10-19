import { belongsTo } from '@ember-data/model';
import Model from '@ember-data/model';
import { attr } from '@ember-data/model';

export default class Tag extends Model {
  @attr('string') for

  @belongsTo('taggable') taggable
}

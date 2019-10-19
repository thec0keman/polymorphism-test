import { belongsTo } from '@ember-data/model';
import Model from '@ember-data/model';

export default class CommentModel extends Model {
  @belongsTo('commentable', { polymorphic: true }) commentable
}

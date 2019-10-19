import { hasMany } from '@ember-data/model';

export default function(klass) {
  return class Taggable extends klass {
    @hasMany('tag') tags
  }
}

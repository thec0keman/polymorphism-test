import { hasMany } from '@ember-data/model';

/**
 * Add some class methods to a reference class so that
 * subclasses can be tracked
*/
export function trackableModel(ReferenceKlass) {
  const _internalPolymorphicAncestors = [];

  // Reference klass is asked by ED if passed in klass is an ancestor
  ReferenceKlass.detect = function(detectKlass) {
    return ReferenceKlass._detectInternalAncestor(detectKlass)// || super.detect(...arguments);
  }

  // Accessors that will be used to record ancestors
  ReferenceKlass. _addInternalAncestor = function(klass) {
    _internalPolymorphicAncestors.push(klass.name);
    console.log('_add', _internalPolymorphicAncestors)
  }

  ReferenceKlass._detectInternalAncestor = function(klass) {
    const descendents = getDescendents(klass);
    const hasDescendent = intersection(descendents, _internalPolymorphicAncestors);

    console.log('_detect', _internalPolymorphicAncestors, klass.name, hasDescendent);

    return hasDescendent;
  }

  return ReferenceKlass
}

/**
 * Notify the polymorphic reference model that there is
 * an ancestor, and pass the subclass through the callback
 * to add reverse associations.
 */
export function decorateTrackable(ReferenceKlass, cb) {
  return function(klass) {
    ReferenceKlass._addInternalAncestor(klass);

    return cb(klass);
  }
}

function intersection(arr1, arr2) {
  return arr1.any(arr => arr2.indexOf(arr) > -1);
}

function getDescendents(klass) {
  const descendents = [];
  let currentKlass = klass;

  while (currentKlass.name) {
    descendents.push(currentKlass.name);

    currentKlass = Object.getPrototypeOf(currentKlass);
  }

  return descendents;
}

/**
 * Add some class methods to a reference class so that
 * subclasses can be tracked by model name
*/
export default function detectByName(ReferenceKlass) {
  // We have to wrap in an anonymouse class so that we can utilize super
  return class extends ReferenceKlass {
    static detect(klass) {
      // Fallback to ember detection
      return detectDescendentsByName(klass, ReferenceKlass) || super.detect(...arguments);
    }
  }
}

function detectDescendentsByName(klass, ReferenceKlass) {
  let currentKlass = klass;

  while (currentKlass && currentKlass.superclass) {
    if (currentKlass && currentKlass.name && currentKlass.name === ReferenceKlass.name)
      return true;

    currentKlass = currentKlass.superclass;
  }

  return false;
}

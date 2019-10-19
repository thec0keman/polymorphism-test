import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | polymorphism', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.store = this.owner.lookup('service:store');
  })

  test('store test 1', function(assert) {
    const store = this.store;
    const user = store.createRecord('user', { name: 'foo' });
    const comment = store.createRecord('comment');

    comment.set('commentable', user);

    assert.equal(user.get('name'), comment.get('commentable.name'));
  });

  test('store test 2', function(assert) {
    const store = this.store;
    const tag = store.createRecord('tag');
    const user = store.createRecord('user', { name: 'bar' });

    tag.set('taggable', user);

    assert.equal(user.get('name'), tag.get('taggable.name'));
  });

  test('payload test 1', function(assert) {
    const store = this.store;
    const payload = {
      data: {
        id: 45,
        type: 'comment',
        attributes: {
        },
        relationships: {
          commentable: {
            data: {
              id: 2,
              type: 'user'
            }
          }
        }
      },
      included: [{
        id: 2,
        type: 'user',
        attributes: {
          name: 'foo'
        }
      }]
    }

    store.push(payload);

    const user = store.peekRecord('user', 2);
    const comment = store.peekRecord('comment', 45);
    assert.equal(user.get('name'), comment.get('commentable.name'));
  })

  test('payload test 2 - with pre-existing data', function(assert) {
    const store = this.store;

    store.push({
      data: {
        id: 2,
        type: 'User',
        attributes: {
          name: 'bar'
        }
      }
    });
    const payload = {
      data: {
        id: 15,
        type: 'tag',
        attributes: {
        },
        relationships: {
          taggable: {
            data: {
              id: 2,
              type: 'user'
            }
          }
        }
      },
    }

    store.push(payload);

    const user = store.peekRecord('user', 2);
    const tag = store.peekRecord('tag', 15);

    assert.equal(user.get('name'), tag.get('taggable.name'));
  });

  // Saving
  // Complex heirachry
  // Test with mixins
});

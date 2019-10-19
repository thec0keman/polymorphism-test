import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service store

  model() {
    const store = this.store;
    const user = store.createRecord('user', { name: 'food' });
    const comment = store.createRecord('comment');

    comment.set('commentable', user);

    console.log('Test #1: set / get across: ', user.get('name'), comment.get('commentable.name'))

    const payload = {
      data: {
        id: 2,
        type: 'comment',
        attributes: {
          commentable_id: 2,
          commentable_type: 'user'
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

    const user2 = store.peekRecord('user', 2);
    const comment2 = store.peekRecord('comment', 2);
    console.log('Test #2: store.pushPayload', user2.get('name'), comment2.get('commentable.name'))

  }
}

import { createStoreon } from 'storeon';
import { storeonDevtools } from 'storeon/devtools';

const user = store => {
  store.on('@init', () => ({ user: null }));

  store.on('user/set', (state, user) => ({ user }));

  store.on('user/clear', () => ({ user: null }));
};

export const store = createStoreon([user, storeonDevtools()]);

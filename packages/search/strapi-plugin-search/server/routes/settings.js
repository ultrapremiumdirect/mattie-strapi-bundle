'use strict';

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/settings',
      handler: 'settings.getSettings',
    },
    {
      method: 'PUT',
      path: '/settings',
      handler: 'settings.updateSettings',
    },
  ],
};

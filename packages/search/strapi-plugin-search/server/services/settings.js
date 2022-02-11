'use strict';

const { mergeWith, assign, uniqBy } = require('lodash/fp');
const { getConfig } = require('../utils/helpers');

const defaultStoreSettings = {
  prefix: strapi.config.environment + '_',
  excludedFields: ['createdBy', 'updatedBy'],
  debug: false,
  contentTypes: [],
};

const getStore = () => {
  return strapi.store({
    type: 'plugin',
    name: 'search',
    key: 'settings',
  });
};

const mergeArrayUnique = (objValue, srcValue) => {
  // TODO: generalize
  if (Array.isArray(objValue) || Array.isArray(srcValue)) {
    return uniqBy([].concat(srcValue, objValue), 'name');
  }
};

/**
 * Gets settings service
 *
 * @returns {object} Provider service
 */
module.exports = () => ({
  async getSettings() {
    const store = getStore();

    const settings = await store.get();

    if (!settings) {
      await store.set({ value: defaultStoreSettings });
      assign(settings, defaultStoreSettings);
    }

    return mergeWith(settings, getConfig(), mergeArrayUnique);
  },

  async setSettings(settings) {
    await getStore().set(settings);

    return mergeWith(settings, getConfig(), mergeArrayUnique);
  },
});

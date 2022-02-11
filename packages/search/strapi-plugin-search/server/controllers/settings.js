'use strict';

const { getService, getContentTypes } = require('../utils/helpers');

/**
 * Gets settings service
 *
 * @returns {object} Provider service
 */
module.exports = () => ({
  async getSettings(ctx) {
    const settings = await getService('settings').getSettings();
    const contentTypes = getContentTypes();

    ctx.send({ contentTypes, settings });
  },

  async updateSettings(ctx) {
    const settings = await getService('settings').setSettings();

    ctx.send(settings);
  },
});

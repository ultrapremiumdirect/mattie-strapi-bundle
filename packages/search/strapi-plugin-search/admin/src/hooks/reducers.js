import produce from 'immer';
import { assign } from 'lodash/fp';
import pluginId from '../pluginId';
import { RESOLVE_SETTINGS, UPDATE_SETTINGS } from './constants';

export const initialState = {
  isLoading: true,
  settings: {},
  contentTypes: [],
};

// eslint-disable-next-line default-param-last
const settingsReducer = produce((draftState = initialState, action) => {
  switch (action.type) {
    case RESOLVE_SETTINGS: {
      draftState.isLoading = false;
      draftState.settings = action.settings;
      draftState.contentTypes = action.contentTypes;
      break;
    }

    case UPDATE_SETTINGS: {
      draftState.isLoading = false;
      assign(draftState.settings, action.editedLocale);
      break;
    }

    default:
      return draftState;
  }

  return draftState;
});

const reducers = {
  [`${pluginId}_settings`]: settingsReducer,
};

export default reducers;

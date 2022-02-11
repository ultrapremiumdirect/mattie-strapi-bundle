import { useEffect } from 'react';
import { request, useNotification } from '@strapi/helper-plugin';
import { useSelector, useDispatch } from 'react-redux';
import { RESOLVE_SETTINGS } from '../constants';
import pluginId from '../../pluginId';

const fetchSettings = async (toggleNotification) => {
  try {
    const data = await request(`/${pluginId}/settings`, {
      method: 'GET',
    });

    console.log(data);

    return data;
  } catch (e) {
    toggleNotification({
      type: 'warning',
      message: { id: 'notification.error' },
    });

    return e;
  }
};

const useSettings = () => {
  const dispatch = useDispatch();
  const toggleNotification = useNotification();
  const settings = useSelector(state => state[`${pluginId}_settings`].settings);
  const contentTypes = useSelector(state => state[`${pluginId}_settings`].contentTypes);
  const isLoading = useSelector(state => state[`${pluginId}_settings`].isLoading);

  useEffect(() => {
    fetchSettings(toggleNotification).then(({ settings, contentTypes }) =>
      dispatch({ type: RESOLVE_SETTINGS, settings, contentTypes })
    );
  }, [dispatch, toggleNotification]);

  return { settings, contentTypes, isLoading };
};

export default useSettings;

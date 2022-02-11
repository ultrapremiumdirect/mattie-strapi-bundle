import React, { memo, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Route } from 'react-router-dom';
import { Box } from '@strapi/design-system/Box';
import { DynamicTable, useQueryParams } from '@strapi/helper-plugin';
import { Table, Thead, Tbody, Tr, Td, Th, TFooter } from '@strapi/design-system/Table';
import { IconButton } from '@strapi/design-system/IconButton';
import { BaseCheckbox } from '@strapi/design-system/BaseCheckbox';
import { Typography } from '@strapi/design-system/Typography';
import { Flex } from '@strapi/design-system/Flex';
import { Plus, CarretDown, Pencil, Trash } from '@strapi/icons';

import useSettings from '../../hooks/useSettings';
import LocalTheme from '../../components/LocalTheme';
import headers from './headers';
import EditModal from './EditModal';

const ContentTypes = ({ match, history }) => {
  const intl = useIntl()
  const { isLoading, settings } = useSettings();

  const onCancel = () => {
    history.push(match.url);
  };

  return (
    <Box background="neutral0" paddingTop={1}>
      <Route path={`${match.url}/add-content-type`} render={() => <EditModal isOpen={true} onCancel={onCancel} />} exact />

      <LocalTheme theme={{ shadows: { tableShadow: 0 }}}>
        <DynamicTable headers={headers} contentType="content types" withBulkActions rows={settings.contentTypes ? settings.contentTypes : []}>
          <Tbody>
          {settings.contentTypes && settings.contentTypes.map(row => <Tr key={row.name}>
                <Td>
                  <Typography textColor="neutral800">{row.name}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{row.index}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{new Intl.ListFormat(intl.locale, { style: 'short' }).format(row.fields)}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{row.entries}</Typography>
                </Td>
                <Td>
                  <Flex>
                    <IconButton onClick={() => console.log('edit')} label="Edit" noBorder icon={<Pencil />} />
                    <Box paddingLeft={1}>
                      <IconButton onClick={() => console.log('delete')} label="Delete" noBorder icon={<Trash />} />
                    </Box>
                  </Flex>
                </Td>
              </Tr>)}
          </Tbody>
        </DynamicTable>
      </LocalTheme>
    </Box>
  );
};

export default memo(ContentTypes);

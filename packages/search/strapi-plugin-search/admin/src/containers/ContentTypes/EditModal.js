import React, { memo, useEffect } from 'react';
import useSettings from '../../hooks/useSettings';
import getTrad from "../../utils/getTrad";
import FormModal from '../../components/FormModal';

const EditModal = ({ isOpen, onCancel }) => {
  const { contentTypes } = useSettings();

  const form = [
    {
      name: 'content-type',
      type: 'select',
      intlLabel: {
        id: getTrad('ContentTypes.Form.content-type.label'),
        defaultMessage: 'Content type',
      },
      description: {
        id: getTrad('ContentTypes.Form.content-type.description'),
        defaultMessage: 'Select a content type',
      },
      size: {
        col: 12
      },
      options: contentTypes.map((contentType, index) => ({
        metadatas: {
          intlLabel: {
            id: getTrad('PopUpForm.Email.options.from.name.label'),
            defaultMessage: contentType.info.displayName,
          },
        },
        key: index,
        value: contentType.uid
      })),
    }, {
      name: 'index',
      type: 'text',
      intlLabel: {
        id: getTrad('ContentTypes.Form.index.label'),
        defaultMessage: 'Index',
      },
      description: {
        id: getTrad('ContentTypes.Form.index.description'),
        defaultMessage: 'Name of the index',
      },
    }, {
      name: 'prefix',
      type: 'text',
      intlLabel: {
        id: getTrad('ContentTypes.Form.prefix.label'),
        defaultMessage: 'Prefix',
      },
      description: {
        id: getTrad('ContentTypes.Form.prefix.description'),
        defaultMessage: 'Custom entry id prefix used in composite indexes (e.g. `podcast-`).',
      },
    }, {
      name: 'fields',
      type: 'select',
      intlLabel: {
        id: getTrad('ContentTypes.Form.content-type.label'),
        defaultMessage: 'Fields',
      },
      description: {
        id: getTrad('ContentTypes.Form.content-type.description'),
        defaultMessage: 'Fields in index',
      },
      size: {
        col: 12
      },
      disabled: true,
      multi: true,
      withTags: true,
      options: [{
        metadatas: {
          intlLabel: {
            id: getTrad('PopUpForm.Email.options.from.name.label'),
            defaultMessage: 'One',
          },
        },
        key: 1,
        value: 'one'
      }, {
        key: 2,
        value: 'two',
        metadatas: {
          intlLabel: {
            id: getTrad('PopUpForm.Email.options.from.name.label'),
            defaultMessage: 'Two',
          },
        },
      }],
    }
  ];

  // useEffect(() => {
  // }, []);

  return <FormModal isOpen={isOpen} onCancel={onCancel} form={form} values={{}} />;
}

export default memo(EditModal);

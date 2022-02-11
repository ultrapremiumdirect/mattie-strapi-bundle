import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Formik } from 'formik';
import { Form, GenericInput } from '@strapi/helper-plugin';
import { Grid, GridItem } from '@strapi/design-system/Grid';

import { ModalLayout, ModalFooter, ModalBody, ModalHeader } from '@strapi/design-system/ModalLayout';
import { Button } from '@strapi/design-system/Button';
import { Typography } from '@strapi/design-system/Typography';
import getTrad from '../../utils/getTrad';

const FormModal = ({
  form,
  onSubmit,
  onCancel,
  isOpen,
  values,
  validationSchema,
}) => {
  const { formatMessage } = useIntl();

  if (!isOpen) {
    return null;
  }

  console.log(form);

  return (
    <ModalLayout
      onClose={onCancel}
      labelledBy="title"
    >
      <ModalHeader>
        <Typography textColor="neutral800" variant="omega" fontWeight="bold">
          {formatMessage({ id: 'sitemap.Modal.HeaderTitle', defaultMessage: 'Sitemap entries' })}
        </Typography>
      </ModalHeader>
      <Formik
        onSubmit={onSubmit}
        initialValues={values}
        validateOnChange={false}
        // validationSchema={validationSchema}
        enableReinitialize
      >
        {({ errors, values, handleChange, isSubmitting }) => {
          return (
            <Form>
              <ModalBody>
                <Grid gap={5}>
                  {form.map((field, index) => (
                    <GridItem key={index} col={6} s={12} {...field.size}>
                      <GenericInput
                        {...field}
                        onChange={handleChange}
                        value={values[field.name]}
                        error={errors[field.name]}
                      />
                    </GridItem>
                  ))}
                </Grid>
              </ModalBody>
              <ModalFooter
                startActions={
                  <Button onClick={onCancel} variant="tertiary">
                    Cancel
                  </Button>
                }
                endActions={
                  <Button loading={isSubmitting} type="submit">
                    Finish
                  </Button>
                }
              />
            </Form>
          );
        }}
      </Formik>
    </ModalLayout>
  );
};

export default FormModal;

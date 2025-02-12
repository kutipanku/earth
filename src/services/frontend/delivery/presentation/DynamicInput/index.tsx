'use client';

import { DynamicField } from '@frontend/entity/shared/types';
import { useRef } from '../../lib/react';
import {
  InputText,
  InputAutocomplete,
  InputAutocompleteMultiple,
  InputRichText,
  InputDate,
} from '../../presentation';
import { Box, Button, Container, Divider, FormControl } from '../../lib/mui';
import type { StaticImageData } from '../../lib/next';

interface Props<DataType, FieldType, Key extends keyof FieldType> {
  data: DataType;
  isLoading: boolean;
  fields: FieldType[];
  property: Key;
  errors: string[];
  onSubmit: (variable: DataType) => void;
}

const DynamicInput = <
  DataType,
  FieldType extends DynamicField<keyof DataType, string | StaticImageData>,
  Key extends keyof FieldType,
>({
  data,
  isLoading,
  fields,
  errors,
  property,
  onSubmit,
}: Props<DataType, FieldType, Key>) => {
  const values = useRef<DataType>(data);
  values.current = data; // Somehow the above default value doesn't work on edit

  const handleInputChange = (inputKey: string, value: string | string[]) => {
    values.current = {
      ...values.current,
      [inputKey]: value,
    };
  };

  const handleSubmit = () => {
    onSubmit(values.current);
  };

  return (
    <Container maxWidth={false} disableGutters>
      <FormControl fullWidth>
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            width: '100%',
            marginTop: 2,
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {fields.map((field, index) => {
            const key = field[property] as string;
            const value = (values.current as any)[key];
            const prefix = field.prefix;

            switch (field.type) {
              case 'text':
                return (
                  <InputText
                    key={key}
                    keyName={key}
                    index={index}
                    isRequired={!!field.required}
                    isLoading={isLoading}
                    label={field.label}
                    value={value}
                    prefix={prefix}
                    isError={errors.includes(key)}
                    handleInputChange={handleInputChange}
                  />
                );
              case 'autocomplete':
                if (field.optionProps?.isMultiple) {
                  return (
                    <InputAutocompleteMultiple
                      key={key}
                      keyName={key}
                      index={index}
                      isLoading={isLoading}
                      label={field.label}
                      value={value}
                      entity={
                        field.optionProps ? field.optionProps?.entity : ''
                      }
                      optionLabel={
                        field.optionProps ? field.optionProps?.label : ''
                      }
                      handleInputChange={handleInputChange}
                    />
                  );
                }

                return (
                  <InputAutocomplete
                    key={key}
                    keyName={key}
                    index={index}
                    isLoading={isLoading}
                    label={field.label}
                    value={value}
                    entity={field.optionProps ? field.optionProps?.entity : ''}
                    optionLabel={
                      field.optionProps ? field.optionProps?.label : ''
                    }
                    handleInputChange={handleInputChange}
                  />
                );
              case 'richtext':
                return (
                  <InputRichText
                    key={key}
                    keyName={key}
                    index={index}
                    isLoading={isLoading}
                    label={field.label}
                    value={value}
                    handleInputChange={handleInputChange}
                  />
                );
              case 'date':
                return (
                  <InputDate
                    key={key}
                    keyName={key}
                    index={index}
                    isLoading={isLoading}
                    label={field.label}
                    value={value}
                    handleInputChange={handleInputChange}
                  />
                );
              default:
                return null;
            }
          })}
          <Container maxWidth={false} disableGutters sx={{ width: '100%' }}>
            <Divider sx={{ marginTop: 1, marginBottom: 2 }} />
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                alignSelf: 'center',
              }}
            >
              <Button
                variant='contained'
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Simpan
              </Button>
            </Box>
          </Container>
        </Container>
      </FormControl>
    </Container>
  );
};

export default DynamicInput;

'use client';

import { useRef } from 'react';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

import { DynamicField } from '@/entity/ui/type';
import InputText from '@/presentation/InputText';
import InputAutocomplete from '@/presentation/InputAutocomplete';
import InputRichText from '@/presentation/InputRichText';

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
  FieldType extends DynamicField<keyof DataType>,
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

  const handleInputChange = (inputKey: string, value: string) => {
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
              case 'textfield':
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
                    style={field.style}
                    isError={errors.includes(key)}
                    handleInputChange={handleInputChange}
                  />
                );
              case 'autocomplete':
                return (
                  <InputAutocomplete
                    key={key}
                    keyName={key}
                    index={index}
                    isLoading={isLoading}
                    label={field.label}
                    value={value}
                    style={field.style}
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
                    isRequired={!!field.required}
                    isLoading={isLoading}
                    label={field.label}
                    value={value}
                    prefix={prefix}
                    style={field.style}
                    isError={errors.includes(key)}
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

'use client';

import { useRef } from 'react';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

import { DynamicField } from '@/entity/ui/type';
import InputText from '@/presentation/InputText';

interface Props<DataType, FieldType, Key extends keyof FieldType> {
  data: DataType;
  isLoading: boolean;
  fields: FieldType[];
  property: Key;
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
  property,
  onSubmit,
}: Props<DataType, FieldType, Key>) => {
  const values = useRef<DataType>(data);

  const handleInputChange = (inputKey: string, value: string) => {
    values.current = {
      ...values.current,
      [inputKey]: value,
    };
  };

  const handleSubmit = () => {
    onSubmit(values.current);
    console.warn('[CHECK] values', values.current);
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
            if (field.type === 'textfield') {
              return (
                <InputText
                  key={key}
                  keyName={key}
                  index={index}
                  isLoading={isLoading}
                  label={field.label}
                  value={value}
                  prefix={prefix}
                  handleInputChange={handleInputChange}
                />
              );
            }

            return null;
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

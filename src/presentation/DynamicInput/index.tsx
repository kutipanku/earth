'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

import { DynamicField } from '@/entity/ui/type';

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
  const [values, setValues] = useState<DataType>(data);

  const handleInputChange = (prop: string) => (event: any) => {
    const newValue = event.target.value;
    setValues({ ...values, [prop]: newValue });
  };

  const handleSubmit = useCallback(() => {
    onSubmit(values);
  }, [onSubmit, values]);

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
            const value: string = (values as any)[key];
            const hasPrefix = !!field.prefix;
            const prefix = field.prefix;
            if (field.type === 'textfield') {
              return (
                <Box
                  key={index}
                  sx={{ width: '50%', marginBottom: 2, paddingRight: 1 }}
                >
                  <TextField
                    fullWidth
                    id={`${key}_input`}
                    label={field.label}
                    name={key}
                    value={value}
                    onChange={handleInputChange(key)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: hasPrefix && (
                        <InputAdornment position='start'>
                          {typeof prefix === 'string' ? (
                            prefix
                          ) : (
                            <Image
                              loading='lazy'
                              height='12'
                              width='16'
                              src={prefix || ''}
                              alt=''
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                    disabled={isLoading}
                  />
                </Box>
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

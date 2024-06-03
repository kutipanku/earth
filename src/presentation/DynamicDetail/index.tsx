'use client';

import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { DynamicField } from '@/entity/ui/type';
import { NodeActionTimestamps } from '@/entity/db/type';
import { convertDateToLocaleString } from '@/lib/date';
import DetailText from '@/presentation/DetailText';
import DetailAutocomplete from '@/presentation/DetailAutocomplete';

interface Props<DataType, FieldType, Key extends keyof FieldType> {
  data: DataType;
  fields: FieldType[];
  property: Key;
  isLoading: boolean;
}

const DynamicDetail = <
  DataType extends NodeActionTimestamps,
  FieldType extends DynamicField<keyof DataType>,
  Key extends keyof FieldType,
>({
  data,
  fields,
  property,
  isLoading,
}: Props<DataType, FieldType, Key>) => {
  return (
    <Container maxWidth={false} disableGutters>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          width: '100%',
          marginTop: 1,
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {fields.map((field, index) => {
          const key = field[property];
          const value = (data as any)[key];

          switch (field.type) {
            case 'textfield':
              return (
                <DetailText
                  key={index}
                  index={index}
                  isLoading={isLoading}
                  label={field.label}
                  value={value}
                  prefix={field.prefix}
                  style={field.style}
                />
              );
            case 'autocomplete':
              return (
                <DetailAutocomplete
                  key={index}
                  index={index}
                  isLoading={isLoading}
                  label={field.label}
                  entity={key as string}
                  value={value}
                  prefix={field.prefix}
                  style={field.style}
                />
              );
            default:
              return <></>;
          }
        })}
      </Container>
      <Divider sx={{ marginBottom: 3 }} />
      <Box sx={{ width: '100%', marginBottom: 2, display: 'flex' }}>
        <DetailText
          isLoading={isLoading}
          label='Created At:'
          value={convertDateToLocaleString(data.created_at)}
          style={{ width: '50%', marginRight: 1 }}
        />
        <DetailText
          isLoading={isLoading}
          label='Updated At:'
          value={convertDateToLocaleString(data.updated_at)}
          style={{ width: '50%', marginLeft: 1 }}
        />
      </Box>
      <Divider sx={{ marginBottom: 3 }} />
    </Container>
  );
};

export default DynamicDetail;

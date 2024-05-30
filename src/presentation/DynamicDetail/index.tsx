'use client';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { DynamicField } from '@/entity/ui/type';
import { NodeActionTimestamps } from '@/entity/db/type';
import { convertDateToLocaleString } from '@/lib/date';
import DetailText from '@/presentation/DetailText';

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
          const value: string = (data as any)[key];
          if (field.type === 'text') {
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
          }

          return null;
        })}
      </Container>
      <Divider sx={{ marginBottom: 3 }} />
      <Box sx={{ width: '100%', marginBottom: 2, display: 'flex' }}>
        <Box sx={{ width: '50%', marginRight: 1 }}>
          <Typography
            sx={{ paddingBottom: 0 }}
            variant='caption'
            display='block'
            color='primary'
            gutterBottom
          >
            Created At:
          </Typography>
          <Typography variant='body1' gutterBottom>
            {convertDateToLocaleString(data.created_at)}
          </Typography>
        </Box>
        <Box sx={{ width: '50%', marginLeft: 1 }}>
          <Typography
            sx={{ paddingBottom: 0 }}
            variant='caption'
            display='block'
            color='primary'
            gutterBottom
          >
            Updated At:
          </Typography>
          <Typography variant='body1' gutterBottom>
            {convertDateToLocaleString(data.updated_at)}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ marginBottom: 3 }} />
    </Container>
  );
};

export default DynamicDetail;

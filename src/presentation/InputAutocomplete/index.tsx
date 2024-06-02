'use client';

import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Skeleton from '@mui/material/Skeleton';
import type { SelectOption } from '@/entity/ui/type';

interface Props {
  index: number;
  keyName: string;
  entity: string;
  isLoading: boolean;
  label: string;
  optionLabel: string;
  value?: string;
  style?: Record<string, unknown>;
  handleInputChange: (keyName: string, value: string) => void;
}

const InputAutocomplete = ({
  index,
  keyName,
  entity,
  isLoading,
  label,
  optionLabel,
  value,
  style,
  handleInputChange,
}: Props) => {
  const optionsRef = useRef([]);
  const [currentValue, setCurrentValue] = useState<SelectOption>();
  const [isLoadingField, setIsLoadingField] = useState(true);
  const [isLoadingValue, setIsLoadingValue] = useState(true);

  useEffect(() => {
    if (!optionsRef.current.length) {
      fetch(`/api/${entity}/list`)
        .then((res) => res.json())
        .then((options) => {
          optionsRef.current = options.data;
          setIsLoadingField(false);
        });
    }

    if (value) {
      const defaultCurrentValue = optionsRef.current.find(
        (option: { id: string }) => option.id === value
      );

      setCurrentValue(defaultCurrentValue);
      setIsLoadingValue(false);
    } else {
      setIsLoadingValue(false);
    }
  }, [entity, value]);

  const handleChange = (newValue: SelectOption) => {
    setCurrentValue(currentValue);
    handleInputChange(keyName, newValue.id);
  };

  return (
    <Box key={index} sx={style}>
      {!isLoading && !isLoadingValue && !isLoadingField ? (
        <Autocomplete
          fullWidth
          id={`approvers-${index}`}
          multiple={index === 0}
          options={optionsRef.current}
          // @ts-expect-error need to overide options typed objec
          getOptionLabel={(option) => option[optionLabel]}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(_, value) =>
            handleChange(value as unknown as SelectOption)
          }
          defaultValue={currentValue}
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      ) : (
        <Skeleton variant='rounded' height={56} />
      )}
    </Box>
  );
};

export default InputAutocomplete;

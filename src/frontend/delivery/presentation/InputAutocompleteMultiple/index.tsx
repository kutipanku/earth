'use client';

import { useEffect, useRef, useState } from '../../lib/react';
import { Autocomplete, Box, Skeleton, TextField } from '../../lib/mui';
import type { SelectOption } from '@frontend/entity/core/types';

interface Props {
  index: number;
  keyName: string;
  entity: string;
  isLoading: boolean;
  label: string;
  optionLabel: string;
  value?: string;
  style?: Record<string, unknown>;
  handleInputChange: (keyName: string, value: string[]) => void;
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
  const [currentValue, setCurrentValue] = useState<SelectOption[]>([]);
  const [isLoadingField, setIsLoadingField] = useState(true);
  const [isLoadingValue, setIsLoadingValue] = useState(true);

  useEffect(() => {
    if (!optionsRef.current.length) {
      fetch(`/api/${entity}/options`)
        .then((res) => res.json())
        .then((options) => {
          optionsRef.current = options.data;
          setIsLoadingField(false);
        });
    }

    if (!isLoadingField && value) {
      const defaultCurrentValue = optionsRef.current.filter(
        (option: { id: string }) => option.id === value
      );

      setCurrentValue(defaultCurrentValue);
      setIsLoadingValue(false);
    } else if (!isLoadingField && !isLoading && !value) {
      setIsLoadingValue(false);
    }
  }, [entity, isLoading, isLoadingField, value]);

  const handleChange = (newValue: SelectOption[]) => {
    setCurrentValue(newValue);
    handleInputChange(
      keyName,
      newValue.map((optionValue) => optionValue.id)
    );
  };

  return (
    <Box key={index} sx={style}>
      {!isLoading && !isLoadingValue && !isLoadingField ? (
        <Autocomplete
          fullWidth
          id={`approvers-${index}`}
          value={currentValue}
          options={optionsRef.current}
          multiple
          // @ts-expect-error need to overide options typed objec
          getOptionLabel={(option) => option[optionLabel]}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(_, value) =>
            handleChange(value as unknown as SelectOption[])
          }
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      ) : (
        <Skeleton variant='rounded' height={56} />
      )}
    </Box>
  );
};

export default InputAutocomplete;

'use client';

import { useEffect, useRef, useState } from '../../lib/react';
import { Autocomplete, Box, Skeleton, TextField } from '../../lib/mui';
import type { SelectOption } from '@frontend/entity/shared/types';

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
  const initialOptionsRef = useRef([]);
  const [currentValue, setCurrentValue] = useState<SelectOption>();
  const [options, setOptions] = useState<SelectOption[]>();
  const [isLoadingField, setIsLoadingField] = useState(true);
  const [isLoadingValue, setIsLoadingValue] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (currentValue) return;
    if (!initialOptionsRef.current.length) {
      fetch(`/api/${entity}/options`)
        .then((res) => res.json())
        .then((options) => {
          initialOptionsRef.current = options.data.map((option: any) => {
            return {
              id: option.id,
              name: option.name,
            };
          });
          setIsLoadingField(false);
        });
    }

    if (!isLoadingField && value) {
      const defaultCurrentValue = initialOptionsRef.current.find(
        (option: { id: string }) => option.id === value
      );
      setCurrentValue(defaultCurrentValue);

      setIsLoadingValue(false);
    } else if (!isLoadingField && !isLoading && !value) {
      setIsLoadingValue(false);
    }
  }, [entity, isLoading, isLoadingField, value, currentValue, setCurrentValue]);

  const handleChange = (newValue: SelectOption | null) => {
    if (newValue === null) return;
    setCurrentValue(newValue);
    handleInputChange(keyName, newValue.id);
  };

  const handleFilter = (filterString: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (!filterString) {
        setOptions(initialOptionsRef.current);
        return;
      }

      fetch(`/api/${entity}/options?name=${filterString}`)
        .then((res) => res.json())
        .then((options) => {
          setOptions(
            options.data.map((option: any) => {
              return {
                id: option.id,
                name: option.name,
              };
            })
          );
        });
    }, 1000);
  };

  return (
    <Box key={index} sx={{ width: '100%', marginBottom: 2, ...style }}>
      {!isLoading && !isLoadingValue && !isLoadingField ? (
        <Autocomplete
          fullWidth
          id={`approvers-${index}`}
          value={currentValue}
          options={options ? options : initialOptionsRef.current}
          // @ts-expect-error need to overide options typed objec
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          filterOptions={(x) => x}
          onChange={(_, value) =>
            handleChange(value as unknown as SelectOption)
          }
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(e) => handleFilter(e.target.value)}
              label={label}
            />
          )}
        />
      ) : (
        <Skeleton variant='rounded' height={56} />
      )}
    </Box>
  );
};

export default InputAutocomplete;

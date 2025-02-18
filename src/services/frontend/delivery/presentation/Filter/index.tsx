'use client';

import { useState, useMemo } from '../../lib/react';
import { usePathname, useSearchParams } from '../../lib/next';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from '../../lib/mui';
import {
  ExpandMoreIcon,
  FilterShowIcon,
  FilterHideIcon,
} from '../../lib/mui-icons';
import styles from '../../view/shared/Dashboard.module.css';
import type { Filter } from '@frontend/entity/shared/types';

interface Props<FilterType> {
  isLoading: boolean;
  initialFilterState: Filter<FilterType>[];
  handleApplyFilter: (joinedFilter: string) => void;
}

const FilterPresentation = <FilterType,>({
  isLoading,
  initialFilterState,
  handleApplyFilter,
}: Props<FilterType>) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const prefilledFilter = useMemo(() => {
    return initialFilterState.map((filterKey) => {
      const searchParam = searchParams.get(filterKey.key as string);

      filterKey.value = searchParam ?? '';
      return filterKey;
    });
  }, [initialFilterState, searchParams]);

  const [expanded, setExpanded] = useState('');
  const [values, setValues] = useState(prefilledFilter);

  const handleChange = (expandString: string) => {
    if (expanded) {
      setExpanded('');
    } else {
      setExpanded(expandString);
    }
  };

  const handleFilterChange =
    (prop: string) => (event: { target: { value: string } }) => {
      const newValue = values.map((filterObject) => {
        if (filterObject.key === prop) {
          return { ...filterObject, value: event.target.value };
        }

        return filterObject;
      });

      setValues(newValue);
    };

  const handleResetFilter = () => {
    window.history.replaceState({}, '', pathname);
    setValues(initialFilterState);
  };

  const handleSubmit = () => {
    const filterArray: string[] = [];
    values.forEach((filterObject) => {
      if (filterObject.value) {
        filterArray.push(`${filterObject.key as string}=${filterObject.value}`);
      }
    });

    const joinedFilter = filterArray.join('&');

    handleApplyFilter(joinedFilter);
  };

  return (
    <div className={styles.filterContainer}>
      <Accordion
        expanded={expanded === 'filter'}
        onChange={() => handleChange('filter')}
        disabled={isLoading}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1bh-content'
          id='panel1bh-header'
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            <IconButton>
              {expanded === 'filter' ? <FilterHideIcon /> : <FilterShowIcon />}
            </IconButton>{' '}
            {expanded === 'filter' ? 'Hide' : 'Show'} Filter
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container
            maxWidth={false}
            disableGutters
            sx={{ width: '100%', marginTop: 2 }}
          >
            {values.map((filter) => {
              return (
                <Box
                  key={filter.key as string}
                  sx={{ width: '100%', marginTop: 2 }}
                >
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id={`search-${filter.key as string}`}
                      label={filter.label}
                      variant='outlined'
                      value={filter.value}
                      onChange={handleFilterChange(filter.key as string)}
                    />
                  </FormControl>
                </Box>
              );
            })}
          </Container>
          <Container
            maxWidth={false}
            disableGutters
            sx={{ width: '100%', display: 'flex', marginTop: 2 }}
          >
            <Button
              variant='outlined'
              onClick={handleResetFilter}
              disabled={isLoading}
              sx={{ width: '50%', marginRight: 1 }}
            >
              Reset Filter
            </Button>
            <Button
              variant='contained'
              onClick={handleSubmit}
              disabled={isLoading}
              sx={{ width: '50%', marginLeft: 1 }}
            >
              Apply Filter
            </Button>
          </Container>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FilterPresentation;

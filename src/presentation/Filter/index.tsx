'use client';

import { useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterShowIcon from '@mui/icons-material/FilterAlt';
import FilterHideIcon from '@mui/icons-material/FilterAltOff';
import type { Filter } from '@/entity/ui/type';
import styles from '@/styles/Dashboard.module.css';

interface Props {
  isLoading: boolean;
  initialFilterState: Filter[];
  handleApplyFilter: (joinedFilter: string) => void;
}

const FilterPresentation = ({
  isLoading,
  initialFilterState,
  handleApplyFilter
}: Props) => {
  const [expanded, setExpanded] = useState('');
  const [values, setValues] = useState(initialFilterState);

  const handleChange = (expandString: string) => {
    if (expanded) {
      setExpanded('');
    } else {
      setExpanded(expandString);
    }
  };

  const handleFilterChange = (prop: string) => (event: { target: { value: string } }) => {
    const newValue = values.map(filterObject => {
      if (filterObject.key === prop) {
        return { ...filterObject, value: event.target.value };
      }

      return filterObject;
    });

    setValues(newValue);
  };

  const handleResetFilter = () => {
    setValues(initialFilterState);
  };

  const handleSubmit = () => {
    const filterArray: string[] = [];
    const keys: string[] = Object.keys(values);

    values.forEach(filterObject => {
      if (filterObject.value) {
        filterArray.push(`${filterObject.key}=${filterObject.value}`)
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
            <IconButton>{expanded === 'filter' ? <FilterHideIcon /> : <FilterShowIcon />}</IconButton> {expanded === 'filter' ? 'Hide' : 'Show'} Filter
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container
            maxWidth={false}
            disableGutters
            sx={{ width: '100%', marginTop: 2 }}
          >
            {values.map(filter => {
              return (
                <Box key={filter.key} sx={{ width: '100%', marginTop: 2 }}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id={`search-${filter.key}`}
                      label={filter.label}
                      variant='outlined'
                      value={filter.value}
                      onChange={handleFilterChange(filter.key)}
                    />
                  </FormControl>
                </Box>
                )
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

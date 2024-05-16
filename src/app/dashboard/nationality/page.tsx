'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid } from '@mui/x-data-grid';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
  TextField,
  FormControl,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

import UnifiedHeadTag from '@/presentation/head';
import {
  TABLE_HEADER,
  initialFilterState,
} from '@/entity/nationality/constant';
import { useNotificationContext } from '@/repository/state/notification';
import styles from '@/styles/Dashboard.module.css';

const NationalityPage = () => {
  const router = useRouter();
  const [dispatch] = useNotificationContext();
  const [isLoading, setLoading] = useState<boolean>(true);

  // For Table
  const [data, setData] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);

  // For Filter
  const [expanded, setExpanded] = useState('');
  const [values, setValues] = useState(initialFilterState);

  // For Delete
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetch(`/api/nationality?page=${page}&limit=${rowPerPage}`)
      .then((res) => res.json())
      .then((resObject) => {
        setData(resObject.data);
        setCount(resObject.total);
        setLoading(false);
      });
  }, [page, rowPerPage]);

  const handleChange = (expandString: string) => {
    if (expanded) {
      setExpanded('');
    } else {
      setExpanded(expandString);
    }
  };

  const handleFilterChange = (prop: string) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleResetFilter = () => {
    setValues(initialFilterState);
  };

  const handleApplyFilter = () => {
    setLoading(true);
    const filterArray = [];
    if (values.name && values.name) {
      filterArray.push(`name=${values.name}`);
    }

    if (values.slug && values.slug) {
      filterArray.push(`slug=${values.slug}`);
    }

    const joinedFilter = filterArray.join('&');

    fetch(`/api/nationality?page=${page}&limit=${rowPerPage}&${joinedFilter}`)
      .then((res) => res.json())
      .then((resObject) => {
        setData(resObject.data);
        setCount(resObject.total);
        setLoading(false);
      });
  };

  const handleTriggerAction = (type: string, rowData: any) => {
    if (type === 'view') {
      router.push(`/dashboard/nationality/${rowData.row.id}`);
    } else if (type === 'edit') {
      router.push(`/dashboard/nationality/${rowData.row.id}/edit`);
    } else {
      setSelectedRow(rowData);
      setDeleteDialogOpen(true);
    }
  };

  const handleOnDelete = useCallback(() => {
    if (selectedRow !== null) {
      // @ts-ignore
      fetch(`/api/nationality/${selectedRow.id}`, { method: 'DELETE' })
        .then((res) => res.json())
        .then(() => {
          setDeleteDialogOpen(false);
          // @ts-ignore
          dispatch({
            type: 'OPEN_NOTIFICATION',
            payload: {
              // @ts-ignore
              message: `Successfully delete nationality with name: ${selectedRow?.row?.name}`,
              severity: 'success',
            },
          });
          setSelectedRow(null);

          setLoading(true);
          fetch(`/api/nationality?page=${page}&limit=${rowPerPage}`)
            .then((res) => res.json())
            .then((resObject) => {
              setData(resObject.data);
              setCount(resObject.total);
              setLoading(false);
            });
        });
    }
  }, [selectedRow, page, rowPerPage, dispatch]);

  return (
    <div className={styles.container}>
      <UnifiedHeadTag title='Nationalities' />

      <main className={styles.main}>
        <Container
          maxWidth={false}
          disableGutters
          sx={{ width: '100%', display: 'flex', marginBottom: 1 }}
        >
          <Box sx={{ width: '70%', paddingRight: 1 }}>
            <Typography
              variant='h4'
              color='primary'
              sx={{ fontWeight: 600, marginBottom: 3 }}
            >
              Nationalities
            </Typography>
          </Box>
          <Box
            sx={{
              width: '30%',
              display: 'flex',
              justifyContent: 'flex-end',
              alignSelf: 'center',
            }}
          >
            <Button
              variant='contained'
              onClick={() => router.push('/dashboard/nationality/add')}
              disabled={isLoading}
              sx={{ textTransform: 'none' }}
            >
              Add Nationality
            </Button>
          </Box>
        </Container>
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
                Filter
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Container
                maxWidth={false}
                disableGutters
                sx={{ width: '100%', marginTop: 2 }}
              >
                <Container
                  maxWidth={false}
                  disableGutters
                  sx={{ width: '100%', display: 'flex', marginBottom: 1 }}
                >
                  <Box sx={{ width: '50%', paddingRight: 1 }}>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id='search-name'
                        label='Name'
                        variant='outlined'
                        value={values.name}
                        onChange={handleFilterChange('name')}
                      />
                    </FormControl>
                  </Box>
                  <Box sx={{ width: '50%', paddingLeft: 1 }}>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id='search-slug'
                        label='Slug'
                        variant='outlined'
                        value={values.slug}
                        onChange={handleFilterChange('slug')}
                      />
                    </FormControl>
                  </Box>
                </Container>
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
                  sx={{ width: '30%', textTransform: 'none', marginRight: 1 }}
                >
                  Reset Filter
                </Button>
                <Button
                  variant='contained'
                  onClick={handleApplyFilter}
                  disabled={isLoading}
                  sx={{ width: '70%', textTransform: 'none', marginLeft: 1 }}
                >
                  Terapkan Filter
                </Button>
              </Container>
            </AccordionDetails>
          </Accordion>
        </div>
        <Box style={{ height: 700, width: '100%' }}>
          <DataGrid
            rows={data}
            rowCount={count}
            columns={TABLE_HEADER(handleTriggerAction)}
            disableSelectionOnClick
            disableColumnMenu
            loading={isLoading}
            pagination
            page={page}
            pageSize={rowPerPage}
            paginationMode='server'
            rowsPerPageOptions={[10, 20, 50]}
            onPageChange={setPage}
            onPageSizeChange={setRowPerPage}
          />
        </Box>
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Apakah Anda yakin?</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {/* @ts-ignore */}
              Data akan hilang dan tidak dapat dikembalikan setelah dihapus.
              Lokasi dengan nama {/* @ts-ignore */}
              <i style={{ fontWeight: 800 }}>{selectedRow?.row?.name}</i> akan
              dihapus?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Tidak</Button>
            <Button onClick={handleOnDelete} autoFocus>
              Ya
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  );
};

export default NationalityPage;

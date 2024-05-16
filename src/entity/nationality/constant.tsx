import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const initialFilterState = {
  name: '',
  slug: '',
};

export const TABLE_HEADER = (
  callbackFunction: (type: string, dataRow: any) => void
) => [
  { field: 'name_en', headerName: 'Name (EN)', width: 300, sortable: false },
  { field: 'name_id', headerName: 'Name (ID)', width: 300, sortable: false },
  { field: 'slug', headerName: 'Slug', width: 300, sortable: false },
  { field: 'flag', headerName: 'Flag', width: 200, sortable: false },
  {
    field: 'action',
    headerName: 'Tindakan',
    sortable: false,
    width: 370,
    renderCell: (params: any) => (
      <ButtonGroup variant='outlined' aria-label='text button group'>
        <Button
          onClick={() => callbackFunction('view', params)}
          sx={{ textTransform: 'none' }}
          startIcon={<VisibilityIcon />}
        >
          Detail
        </Button>
        <Button
          onClick={() => callbackFunction('edit', params)}
          sx={{ textTransform: 'none' }}
          startIcon={<EditIcon />}
        >
          Ubah
        </Button>
        <Button
          onClick={() => callbackFunction('delete', params)}
          sx={{ textTransform: 'none' }}
          startIcon={<DeleteForeverIcon />}
        >
          Hapus
        </Button>
      </ButtonGroup>
    ),
  },
];

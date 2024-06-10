import FlagIcon from '@mui/icons-material/Flag';
import WorkIcon from '@mui/icons-material/Work';
import OfferIcon from '@mui/icons-material/LocalOffer';
import QuoteIcon from '@mui/icons-material/FormatQuote';
import PaidIcon from '@mui/icons-material/Paid';
import AccountIcon from '@mui/icons-material/AccountCircle';
import BookIcon from '@mui/icons-material/MenuBook';
import CategoryIcon from '@mui/icons-material/Category';
import MMSIcon from '@mui/icons-material/Mms';
import LogIcon from '@mui/icons-material/History';

export const DRAWER_WIDTH = 240;
export const DRAWER_MENU_LIST = [
  {
    text: 'Nationalities',
    icon: FlagIcon,
    path: '/dashboard/nationality',
  },
  {
    text: 'Professions',
    icon: WorkIcon,
    path: '/dashboard/profession',
  },
  {
    text: 'Authors',
    icon: AccountIcon,
    path: '/dashboard/author',
  },
  {
    text: 'Category',
    icon: CategoryIcon,
    path: '/dashboard/category',
  },
  {
    text: 'Tags',
    icon: OfferIcon,
    path: '/dashboard/tag',
  },
  {
    text: 'Quotes',
    icon: QuoteIcon,
    path: '/dashboard/quote',
  },
  {
    text: 'Products',
    icon: PaidIcon,
    path: '/dashboard/product',
  },
  {
    text: 'Books',
    icon: BookIcon,
    path: '/dashboard/book',
  },
  {
    text: 'Media',
    icon: MMSIcon,
    path: '/dashboard/media',
  },
  {
    text: 'Log Histories',
    icon: LogIcon,
    path: '/dashboard/log',
  },
];

import type { DrawerItem } from './types';

export const TITLE = 'Kutipanku Dashboard';
export const DESCRIPTION = 'Content Management for Kutipanku App';
export const DRAWER_WIDTH = 240;
export const DRAWER_MENU_LIST: DrawerItem[] = [
  {
    text: 'Nationalities',
    icon: 'flag',
    path: '/dashboard/nationality',
  },
  {
    text: 'Professions',
    icon: 'work',
    path: '/dashboard/profession',
  },
  {
    text: 'Authors',
    icon: 'account',
    path: '/dashboard/author',
  },
  {
    text: 'Category',
    icon: 'category',
    path: '/dashboard/category',
  },
  {
    text: 'Tags',
    icon: 'offer',
    path: '/dashboard/tag',
  },
  {
    text: 'Quotes',
    icon: 'quote',
    path: '/dashboard/quote',
  },
  // {
  //   text: 'Products',
  //   icon: 'paid',
  //   path: '/dashboard/product',
  // },
  // {
  //   text: 'Books',
  //   icon: 'book',
  //   path: '/dashboard/book',
  // },
  // {
  //   text: 'Media',
  //   icon: 'multimedia',
  //   path: '/dashboard/media',
  // },
  {
    text: 'Log Histories',
    icon: 'log',
    path: '/dashboard/log',
  },
];

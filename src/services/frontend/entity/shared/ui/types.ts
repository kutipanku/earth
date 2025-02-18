export type DrawerIcon =
  | 'flag'
  | 'work'
  | 'account'
  | 'category'
  | 'offer'
  | 'quote'
  | 'paid'
  | 'book'
  | 'multimedia'
  | 'log';

export interface DrawerItem {
  text: string;
  icon: DrawerIcon;
  path: string;
}

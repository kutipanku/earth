import { dynamic } from '../../lib/next';
import type { DrawerIcon } from '@frontend/entity/shared/types';

const getMenuIcon = (name: DrawerIcon) => {
  switch (name) {
    case 'account':
      const AccountIcon = dynamic(
        () => import('.').then((module) => module.AccountIcon),
        {
          ssr: false,
        }
      );
      return AccountIcon;
    case 'book':
      const BookIcon = dynamic(
        () => import('.').then((module) => module.BookIcon),
        {
          ssr: false,
        }
      );
      return BookIcon;
    case 'category':
      const CategoryIcon = dynamic(
        () => import('.').then((module) => module.CategoryIcon),
        {
          ssr: false,
        }
      );
      return CategoryIcon;
    case 'flag':
      const FlagIcon = dynamic(
        () => import('.').then((module) => module.FlagIcon),
        {
          ssr: false,
        }
      );
      return FlagIcon;
    case 'log':
      const LogIcon = dynamic(
        () => import('.').then((module) => module.LogIcon),
        {
          ssr: false,
        }
      );
      return LogIcon;
    case 'multimedia':
      const MultimediaIcon = dynamic(
        () => import('.').then((module) => module.MultimediaIcon),
        {
          ssr: false,
        }
      );
      return MultimediaIcon;
    case 'offer':
      const OfferIcon = dynamic(
        () => import('.').then((module) => module.OfferIcon),
        {
          ssr: false,
        }
      );
      return OfferIcon;
    case 'paid':
      const PaidIcon = dynamic(
        () => import('.').then((module) => module.PaidIcon),
        {
          ssr: false,
        }
      );
      return PaidIcon;
    case 'quote':
      const QuoteIcon = dynamic(
        () => import('.').then((module) => module.QuoteIcon),
        {
          ssr: false,
        }
      );
      return QuoteIcon;
    case 'work':
      const WorkIcon = dynamic(
        () => import('.').then((module) => module.WorkIcon),
        {
          ssr: false,
        }
      );
      return WorkIcon;

    default:
      const BrokenIcon = dynamic(
        () => import('.').then((module) => module.BrokenImageIcon),
        {
          ssr: false,
        }
      );
      return BrokenIcon;
  }
};

export default getMenuIcon;

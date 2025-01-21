import { dynamic } from '../../lib/next';
import type { DrawerIcon } from '@frontend/entity/core/types';

const getMenuIcon = (name: DrawerIcon) => {
  switch (name) {
    case 'account':
      const AccountIcon = dynamic(() =>
        import('.').then((module) => module.AccountIcon)
      );
      return AccountIcon;
    case 'book':
      const BookIcon = dynamic(() =>
        import('.').then((module) => module.BookIcon)
      );
      return BookIcon;
    case 'category':
      const CategoryIcon = dynamic(() =>
        import('.').then((module) => module.CategoryIcon)
      );
      return CategoryIcon;
    case 'flag':
      const FlagIcon = dynamic(() =>
        import('.').then((module) => module.FlagIcon)
      );
      return FlagIcon;
    case 'log':
      const LogIcon = dynamic(() =>
        import('.').then((module) => module.LogIcon)
      );
      return LogIcon;
    case 'multimedia':
      const MultimediaIcon = dynamic(() =>
        import('.').then((module) => module.MultimediaIcon)
      );
      return MultimediaIcon;
    case 'offer':
      const OfferIcon = dynamic(() =>
        import('.').then((module) => module.OfferIcon)
      );
      return OfferIcon;
    case 'paid':
      const PaidIcon = dynamic(() =>
        import('.').then((module) => module.PaidIcon)
      );
      return PaidIcon;
    case 'quote':
      const QuoteIcon = dynamic(() =>
        import('.').then((module) => module.QuoteIcon)
      );
      return QuoteIcon;
    case 'work':
      const WorkIcon = dynamic(() =>
        import('.').then((module) => module.WorkIcon)
      );
      return WorkIcon;

    default:
      const BrokenIcon = dynamic(() =>
        import('.').then((module) => module.BrokenImageIcon)
      );
      return BrokenIcon;
  }
};

export default getMenuIcon;

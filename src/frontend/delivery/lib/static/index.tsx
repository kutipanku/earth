import { Image, dynamic } from '../next';

export type DrawerIcon = 'static_flag_english' | 'static_flag_indonesia';

const getStaticImages = (name: DrawerIcon) => {
  switch (name) {
    case 'static_flag_english':
      return dynamic(() =>
        import('/public/icons/gb.png').then((image) => () => (
          <Image src={image} priority alt='english' width={24} height={24} />
        ))
      );

    case 'static_flag_indonesia':
      return dynamic(() =>
        import('/public/icons/id.png').then((image) => () => (
          <Image src={image} priority alt='indonesia' width={24} height={24} />
        ))
      );

    default:
      return <Image src={''} priority alt='' width={0} height={0} />;
  }
};

export default getStaticImages;

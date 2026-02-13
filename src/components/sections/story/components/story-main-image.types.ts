export type StoryMainImageProps = {
  image: {
    asset: {
      url: string;
      metadata?: {
        lqip?: string;
      };
    };
    alt?: string;
  };
  secondImage?: {
    asset: {
      url: string;
      metadata?: {
        lqip?: string;
      };
    };
    alt?: string;
  };
  className?: string;
};

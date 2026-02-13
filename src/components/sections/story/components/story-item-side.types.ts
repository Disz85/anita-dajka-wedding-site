export type StoryItemSideProps = {
  image: {
    asset: {
      url: string;
      metadata?: {
        lqip?: string;
      };
    };
    alt?: string;
  };
  title: string | null | undefined;
  description: string | null | undefined;
  className?: string;
  imageContainerClassName?: string;
  contentContainerClassName?: string;
  style?: React.CSSProperties;
};

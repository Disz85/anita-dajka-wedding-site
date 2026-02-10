export type LocalizedString = {
  hu?: string;
  en?: string;
};

export type PageHeaderProps = {
  title: string;
  subtitle: string;
  description?: LocalizedString;
};

export type itemsData = {
  name: string;
  price: number;
  imgSrc: string;
  amountOfColors: number;
};

export type ImageType = {
  id: string;
  url: string;
  image: File;
  fileName: string;
};

export type reviewData = {
  username: string;
  review: string;
  rating: number;
};

export type dataType = {
  value: string;
  label: string;
};

export type data = {
  name: string;
  icon: React.ReactNode;
  link: string;
};

export type burgerData = {
  link: string;
  title: string;
};

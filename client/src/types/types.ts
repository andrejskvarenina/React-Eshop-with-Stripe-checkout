export type Item = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number,
    count: number,
  }
}

export type DataType = {
  data?: Item[];
  isLoading: boolean;
  isError: boolean;
}
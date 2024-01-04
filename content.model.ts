export interface ContentModel {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  tags: string;
  selectedCategory: string;
  content: string;
  image: File | string;
}

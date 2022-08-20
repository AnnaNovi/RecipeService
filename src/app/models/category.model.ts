export interface categoriesNamesResponse {
  meals: {
    strCategory: string;
  }[];
}

export interface categoriesResponse {
  categories: categoriesResponseData[];
}

export interface categoriesResponseData {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface categories {
  id: string;
  title: string;
  imageURL: string;
  description: string;
}

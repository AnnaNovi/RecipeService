//interfaces
export interface recipeResponse {
  meals: recipeResponseData[];
}
export interface recipeResponseData {
  [key: string]: any;
  dateModified: null | Date;
  idMeal: string;
  strArea: string;
  strCategory: string;
  strCreativeCommonsConfirmed: string | null;
  strDrinkAlternate: string | null;
  strImageSource: string | null;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strIngredient16: string | null;
  strIngredient17: string | null;
  strIngredient18: string | null;
  strIngredient19: string | null;
  strIngredient20: string | null;
  strInstructions: string;
  strMeal: string;
  strMealThumb: string;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
  strMeasure16: string | null;
  strMeasure17: string | null;
  strMeasure18: string | null;
  strMeasure19: string | null;
  strMeasure20: string | null;
  strSource: string;
  strTags: null | string;
  strYoutube: string;
}
export interface recipe extends recipePreview {
  category: string;
  instruction: string;
  ingredients: Map<string, string>;
  videoURL: string;
  source: string;
}
export interface recipePreview {
  id: string;
  title: string;
  tags: string[] | null;
  imageURL: string;
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

export interface ingredientsNamesResponse {
  meals: ingredientsNamesResponseData[];
}
export interface ingredientsNamesResponseData {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
}
export interface ingredients {
  id: string;
  title: string;
  description: string | null;
}

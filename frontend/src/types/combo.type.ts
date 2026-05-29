export interface FoodCombo {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  price: number;
  stockQuantity: number;
  isActive: boolean;
}

export interface SelectedCombo {
  combo: FoodCombo;
  quantity: number;
}

import { create } from "zustand";

const useItemsStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (index) =>
    set((state) => ({
      items: state.items.filter((_, i) => i !== index),
    })),
  asyncAddItem: async (newItem) => {
    setTimeout(() => {
      set((state) => ({
        items: [...state.items, newItem],
      }));
    }, 2000);
  },
  deepItemsArray: [[[]]],
  addItemAtLevel3: (item) =>
    set((state) => {
      const newDeepItemsArray = [...state.deepItemsArray];
      if (!newDeepItemsArray[0][0]) newDeepItemsArray[0][0] = []; // Asegurarse que el nivel 3 existe
      newDeepItemsArray[0][0].push(item + '>'); // Agregar al nivel 3
      return { deepItemsArray: newDeepItemsArray };
    }),
}));

export default useItemsStore;

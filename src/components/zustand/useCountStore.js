import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,
  increaseCount: () => set((state) => ({ count: state.count + 1 })),
  decreaseCount: () => set((state) => ({ count: state.count - 1 })),
  asyncIncrementCount: async (time, amount) =>
    setTimeout(() => {
      set((state) => ({ count: state.count + Number(amount) }));
    }, time * 1000),
  resetCount: () => set({ count: 0 }),
}));
 
export default useStore;

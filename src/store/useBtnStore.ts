import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type BtnState = {
  btnState: Record<string, boolean>;
  setBtnState: (id: string, state: boolean) => void;
};

export const useBtnStore = create<BtnState>()(
  persist(
    (set) => ({
      btnState: {},
      setBtnState: (id, state) =>
        set((stateObj) => ({
          btnState: { ...stateObj.btnState, [id]: state },
        })),
    }),
    {
      name: 'btn-state',
    }
  )
);
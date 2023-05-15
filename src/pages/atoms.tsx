import { atom } from 'recoil';
import { useEffect } from 'react';
const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: any) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const orderInfo = atom({
  key: 'orderInfo',
  default: null,
  effects: [localStorageEffect('orderInfo')],
});
export const OrgInfo = atom({
  key: 'OrgInfo',
  default: null,
  effects: [localStorageEffect('OrgInfo')],
});

export const selectedDateInfo = atom({
  key: 'selectedDateInfo',
  default: null,
  effects: [localStorageEffect('selectedDateInfo')],
});

// function CallLocal() {
//   useEffect(() => {
//     localStorageEffect;
//   }, []);
// }

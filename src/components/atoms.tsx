import { atom } from 'recoil';
import { useEffect } from 'react';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();
// const localStorageEffect =
//   (key: string) =>
//   ({ setSelf, onSet }: any) => {
//     const savedValue = localStorage.getItem(key);
//     if (savedValue != null) {
//       setSelf(JSON.parse(savedValue));
//     }

//     onSet((newValue: any, _: any, isReset: any) => {
//       isReset
//         ? localStorage.removeItem(key)
//         : localStorage.setItem(key, JSON.stringify(newValue));
//     });
//   };

export const orderInfo = atom({
  key: 'orderInfo',
  default: null,
  // effects: [localStorageEffect('orderInfo')],
  effects_UNSTABLE: [persistAtom],
});
export const OrgInfo = atom({
  key: 'OrgInfo',
  default: null,
  // effects: [localStorageEffect('OrgInfo')],
  effects_UNSTABLE: [persistAtom],
});

export const selectedDateInfo = atom({
  key: 'selectedDateInfo',
  default: null,
  // effects: [localStorageEffect('selectedDateInfo')],
  effects_UNSTABLE: [persistAtom],
});

// function CallLocal() {
//   useEffect(() => {
//     localStorageEffect;
//   }, []);
// }

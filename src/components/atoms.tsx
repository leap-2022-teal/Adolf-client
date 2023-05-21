import { selector, atom } from 'recoil';
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
// export const totalPrice = atom({
//   key: 'totalPrice',
//   get: ({get}) => ({

//   }),
//   default: null,
//   effects_UNSTABLE: [persistAtom],
// })
export const totalPriceSelector = selector({
  key: 'totalPrice',
  get: ({ get }) => {
    const UserSelectedService = get(orderInfo);
    let totalPrice = UserSelectedService.selectedService.price;

    if (UserSelectedService.selectedExtraService) {
      totalPrice += UserSelectedService.selectedExtraService.reduce(
        (sum: number, service: any) => sum + service.price,
        0
      );
    }

    return totalPrice;
  },
});

// function CallLocal() {
//   useEffect(() => {
//     localStorageEffect;
//   }, []);
// }

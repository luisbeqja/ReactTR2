import { atom } from 'recoil';

export const langFile = atom({
  key: 'langFile', // unique ID (with respect to other atoms/selectors)
  default: [
    {
      FileContent: '',
      FileName: '',
    },
  ], // default value (aka initial value)
});

export const langKey = atom({
  key: 'langKey', // unique ID (with respect to other atoms/selectors)
  default: [""], // default value (aka initial value)
});

export const folderPath = atom({
  key: 'folderPath', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

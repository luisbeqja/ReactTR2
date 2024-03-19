import { LanguageFile } from '../../types/go';
import { IsKeyPresent } from '../../functions/langFile';
import { langFile } from '../../store/atom';
import { useRecoilValue } from 'recoil';
import DyModal from './DyModal';
import { useState } from 'react';
import { ModalInfoType } from '../../types/types';

function DyTable({
  lang,
  keys,
  onAdd,
}: {
  lang: LanguageFile[];
  keys: string[];
  onAdd: () => void;
}) {
  const files = useRecoilValue<LanguageFile[]>(langFile);
  const keyArray = Object.entries(keys);

  const [modalInfo, setmodalInfo] = useState<ModalInfoType>({
    isOpen: false,
    fileLang: 'en_US',
    key: {
      keyValue: '',
      value: '',
    },
  });

  const openModal = (key: string[], fileLang: string) => {
    setmodalInfo({
      isOpen: true,
      fileLang: fileLang,
      key: {
        keyValue: key[0],
        value: key[1],
      },
    });
  };

  const closeModal = () => {
    setmodalInfo({
      isOpen: false,
      key: {
        keyValue: '',
        value: '',
      },
    });
  };

  return (
    <div className="overflow-x-auto dy-table">
      <table className="table table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th></th>
            <th>KEY</th>
            {lang.map((file: LanguageFile, index: number) => {
              return (
                <th className=" whitespace-nowrap" key={index}>
                  {file.FileName}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {keyArray.map((key, index) => {
            return (
              <tr key={key[0]}>
                <th>{index + 1}</th>
                <td>
                  <div className="lg:tooltip cursor-pointer" data-tip={key[1]}>
                    {key[0]}
                  </div>
                </td>
                {lang.map((file: LanguageFile, index: number) => {
                  return (
                    <td className="whitespace-nowrap" key={index}>
                      {IsKeyPresent(files, file.FileName, key[0]) ? (
                        <p className=" cursor-default w-fit">✅</p>
                      ) : (
                        <p
                          className="cursor-pointer w-fit"
                          onClick={() => openModal(key, file.FileName)}
                        >
                          ❌
                        </p>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <DyModal
        modalInfoProp={modalInfo}
        onClose={() => closeModal()}
        onAdd={() => onAdd()}
      />
    </div>
  );
}

export default DyTable;

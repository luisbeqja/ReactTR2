import { useEffect, useRef } from 'react';
import { ModalInfoType } from '../../types/types';
import {
  AddSingleTranslationHandler,
  AddFolderHandler,
} from '../../../wailsjs/go/main/App';
import { useRecoilValue } from 'recoil';
import { folderPath } from '../../store/atom';

function DyModal({
  modalInfoProp,
  onClose,
  onAdd,
}: {
  modalInfoProp: ModalInfoType;
  onClose: () => void;
  onAdd: () => void;
}) {
  const dialogModal = useRef<HTMLDialogElement>(null);
  const path = useRecoilValue<string>(folderPath);
  useEffect(() => {
    if (modalInfoProp.isOpen) {
      dialogModal?.current?.showModal();
    }
  }, [modalInfoProp]);

  const inputRef = useRef<HTMLInputElement>(null);

  function AddTranslationButton() {
    if (inputRef.current?.value) {
      AddSingleTranslationHandler(
        inputRef.current?.value,
        `${path}/${modalInfoProp.fileLang}`,
        modalInfoProp.key.keyValue
      ).then(() => {
        AddFolderHandler(path).then(() => {
          onAdd();
        });
      });
    }
  }
  return (
    <div className="overflow-x-auto">
      <dialog ref={dialogModal} id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{modalInfoProp.key.keyValue}</h3>
          <p>
            Would you like to provide a translation for this key in the{' '}
            {modalInfoProp.fileLang} file ?
          </p>
          <p className="py-4">
            English Translation is:{' '}
            <span className=" font-bold">{modalInfoProp.key.value}</span>
          </p>
          <input type="text" ref={inputRef} />
          <div className="modal-action justify-center">
            <form method="dialog">
              <button
                className="btn mr-5"
                onClick={() => AddTranslationButton()}
              >
                Add
              </button>
              <button className="btn" onClick={() => onClose()}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default DyModal;

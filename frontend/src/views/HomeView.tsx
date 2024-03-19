import { Link } from 'react-router-dom';
import DyTable from '../components/daisy/DyTable';
import { useRecoilState } from 'recoil';
import { langFile, langKey, folderPath } from '../store/atom';
import { AddFolderHandler } from '../../wailsjs/go/main/App';
import { LanguageFile } from '../types/go';
import { GetUsKey } from '../functions/langFile';
import json5 from 'json5';

function HomeView() {
  const [lang, setLang] = useRecoilState<LanguageFile[]>(langFile);
  const [path, setPath] = useRecoilState<string>(folderPath);
  const [keys, setKeys] = useRecoilState<string[]>(langKey);

  function addFolder() {
    AddFolderHandler(path).then((res) => {
      setKeys(json5.parse(GetUsKey(res)));
      setLang(res);
    });
  }
  function getFolderPath(): string {
    const parts = path.split('/');
    const lastWord = parts[parts.length - 1];
    return lastWord;
  }
  return (
    <div id="App">
      <p>Home View</p>
{/*       <Link className=" underline" to={'/add-translation'}>
        How it works
      </Link> */}
      <div className=" mt-10">
        <input
          type="text"
          placeholder="Type here the folder path"
          className="input input-bordered w-full max-w-xs mr-5"
          value={path}
          onChange={(event) => setPath(event.target.value)}
        />
        <button
          onClick={() => addFolder()}
          className="btn btn-outline btn-primary"
        >
          Add Folder
        </button>
      </div>
      <div>
        {lang.length > 1 && (
          <>
            <DyTable onAdd={() => addFolder()} lang={lang} keys={keys} />
            <div className="add-translation-button flex absolute bottom-0 w-full p-2 justify-center">
              <Link
                className=" underline cursor-pointer"
                to={`/add-translation/${getFolderPath()}`}
              >
                Add new Translation
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HomeView;

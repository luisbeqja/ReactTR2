import { Link, useParams } from 'react-router-dom';
import { AddTranslationHandler } from '../../wailsjs/go/main/App';
import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { folderPath } from '../store/atom';
import { router } from '../router';

function AboutView() {
  
  const path = useRecoilValue<string>(folderPath);
  let { id } = useParams();
  const iputTranslationRef = useRef<HTMLInputElement>(null);
  const iputKeyRef = useRef<HTMLInputElement>(null);
  function addTranslation() {
    if (iputKeyRef.current && iputTranslationRef.current && id) {
      AddTranslationHandler(
        iputTranslationRef.current.value,
        path,
        iputKeyRef.current.value
      ).then(() => {
        router.navigate(`/`); 
      });
    }
  }

  return (
    <div id="AboutView">
      <h2 className="font-bold mt-7">Add new translation to: {id}</h2>
      <Link to={'/'}>Back</Link>
      <div className=" mt-10">
        <input
          ref={iputKeyRef}
          type="text"
          placeholder="Type here the new translation key"
          className="input input-bordered w-full max-w-xs mr-5"
        />
      </div>
      <div className="mt-2">
        <input
          ref={iputTranslationRef}
          type="text"
          placeholder="Type here the translation from Excel"
          className="input input-bordered w-full max-w-xs mr-5"
        />
      </div>
      <button
        className="btn btn-outline btn-primary mt-5"
        onClick={() => addTranslation()}
      >
        Add Translation
      </button>
    </div>
  );
}

export default AboutView;

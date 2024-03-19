import { AddFolderHandler } from '../../wailsjs/go/main/App';
import { LanguageFile } from '../types/go';



export function GetUsKey(array: LanguageFile[]): string {
    const targetFileName = 'en_US.js';
    const resultArray = array.filter(obj => obj.FileName === targetFileName);

    return resultArray[0].FileContent;
}

export function IsKeyPresent(array: LanguageFile[], targetFileName: string, key: string): boolean {
    const resultArray = array.filter(obj => obj.FileName === targetFileName);
    const fileContent = resultArray[0].FileContent;
    return fileContent.includes(key);
}

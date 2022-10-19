import { LocalStorageService } from './LocalStorageService'

const STORAGE_KEY = 'arraySearch'
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";


export const SearchService = {

    setAll () {
        let arr = [];
        for(let i = 0; i < 100; i++){

            for(let j = 0; j < 900; j ++){
                arr.push(getRandomWord())
            }
            setTimeout(() => {}, 0)
        }
        LocalStorageService.setItem(STORAGE_KEY, arr)
    },

    getAll () {
        return LocalStorageService.getItem(STORAGE_KEY, [])
    },
    searchResult(text){
        if(!text)
            return []

        const reg = new RegExp('^' + text)
        return SearchService.getAll().filter(i => reg.exec(i))
    }
}


function getRandomWord(){
    let text = ''
    for (let i = 0; i < 100; i++)
        text += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    return text;
}

import { TRANSLATIONS } from '../constants/translateLanguage';
export const trls = (translate_key) => {
    // var lang = window.localStorage.getItem('lang');
    return(
        TRANSLATIONS["en_US"][translate_key]
    )
};
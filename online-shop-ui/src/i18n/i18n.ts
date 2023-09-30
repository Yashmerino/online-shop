import i18n from "./i18n.xml";
import Lang from "./LangEnum";

export const getTranslation = (lang: Lang, key: string) => {
    let translatedMessage = key;

    if(!i18n.i18n) {
        return key;
    }

    // @ts-ignore
    i18n.i18n.key.forEach(element => {
        if (element.$.value.localeCompare(key) == 0) {
            const messagesArray = element.val;

            // @ts-ignore
            messagesArray.forEach(message => {
                if (message.$.lang.localeCompare(lang.toString()) == 0) {
                    translatedMessage = message._;
                    return;
                }
            })
        }

        if (translatedMessage != key) {
            return;
        }
    });

    return translatedMessage;
}
import moment from 'moment';

// Text translations
import en from './en';

const resources = {
    'en': en,
    'xx': {
        title: 'foobar',
    }
}

const defaultLocale = 'en';
let currentLocale = moment.locale();

console.log(currentLocale);

export const locale = (newLocale) => {
    if (newLocale) {
        currentLocale = moment.locale(newLocale);
    }

    return moment.locale(newLocale);
};

export const locales = () => Object.keys(resources);

export const getResource = (key) => {
    const localizedResource = resources[locale] && resources[locale][key];
    const defaultResource = resources[defaultLocale][key]
    return localizedResource || defaultResource;
};

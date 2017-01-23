import moment from 'moment';
import en from './en';

const resources = {
    'en': en,
}

const locale = moment.locale();
const defaultLocale = 'en';

export const getResource = (key) => {
    return resources[locale] && resources[locale][key] || resources[defaultLocale][key];
};

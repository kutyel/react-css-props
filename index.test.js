const cssProps = require('./index');

// Mock imported theme from CSS Modules
const theme = {
    button: 'Button__button___3_Ozh',
    primary: 'Button__primary___zYyzg'
};

// Prepare the clases according to given theme
const toCSS = cssProps(theme);

describe('react-css-props', () => {

    test('should always return an array', () => {
        expect(toCSS({})).toEqual([]);
    })

    test('should return an array with the specified default class', () => {
        const className = 'button';
        expect(toCSS({}, className)).toEqual([theme[className]]);
    });

    test('should have `undefined` when not finding the default class', () => {
        expect(toCSS({}, 'default')[0]).toBeUndefined();
    });

});

import cssProps from './index';

// Mock imported theme from CSS Modules
const theme = {
    'icon': 'Icon__icon___66GYG',
    'button': 'Button__button___3_Ozh',
    'primary': 'Button__primary___zYyzg',
    'icon-save': 'Icon__icon-save___e4uoa'
};

describe('react-css-props', () => {

    test('should always return a function', () => {
        expect(typeof cssProps({})).toBe('function');
        expect(typeof cssProps(theme)).toBe('function');
    });

    test('generated function should always return an array', () => {
        expect(cssProps(theme)({})).toEqual([]);
    })

    test('should return an array with the specified default class', () => {
        expect(cssProps(theme)({}, 'button')).toEqual([theme.button]);
    });

    test('should have `undefined` when not finding the default class', () => {
        expect(cssProps(theme)({}, 'unexisting')).toEqual([undefined]);
    });

    test('should turn props into existing classNames', () => {
        expect(cssProps(theme)({ icon: true })).toEqual([theme.icon]);
    });

    test('should use the mapper if provided', () => {
        expect(
            cssProps(theme, type => `icon-${type}`)({ save: true })
        ).toEqual([theme['icon-save']]);
    });

});

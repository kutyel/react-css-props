// @flow

export default (theme: Object, mapper?: string => string) =>
    (props: Object, defaultClass?: string): Array<string> => {
        if (Object.keys(props).length) {
            return Object.keys(props)
                .filter(prop => !!props[prop])
                .map(className => mapper ?
                    theme[mapper(className)] :
                    theme[className])
        } else {
            return defaultClass ? [theme[defaultClass]] : [];
        }
    };

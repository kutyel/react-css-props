# React CSS Props

[![Build](https://img.shields.io/travis/kutyel/react-css-props/master.svg?style=flat-square)](https://travis-ci.org/kutyel/react-css-props)
[![Dependencies](https://img.shields.io/david/kutyel/react-css-props.svg?style=flat-square)](https://david-dm.org/kutyel/react-css-props)
[![Dev Dependencies](https://img.shields.io/david/dev/kutyel/react-css-props.svg?style=flat-square)](https://david-dm.org/kutyel/react-css-props#info=devDependencies)
[![Coverage Status](https://img.shields.io/coveralls/kutyel/react-css-props/master.svg?style=flat-square)](https://coveralls.io/github/kutyel/react-css-props?branch=master)
[![Downloads](https://img.shields.io/npm/dm/react-css-props.svg?style=flat-square)](https://npmjs.com/packages/react-css-props)
[![Version](https://img.shields.io/npm/v/react-css-props.svg?style=flat-square)](https://npmjs.com/packages/react-css-props)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/flaviocorpa)

Dynamically turn your props into CSS clases!

## Install

```sh
$ yarn add react-css-props
```

**Note: *any* feedback, contributions or other possible use cases are highly appreciated.**

## Examples

Imagine that you are working in just a regular React project, and you decide to use [**CSS Modules**](https://github.com/css-modules/css-modules) for your styling. At some point, you would like to have the following components:

```jsx
<Block width1of4>
    <Button>Generate report</Button>
    <Button disabled>
        <Icon save />Save search
    </Button>
</Block>
```

OK. Everything looks normal with the `Button` component but, wait, what the hell is that custom property besides `Block` and `Icon`!?
You guessed, those are custom properties already built-in with each component, they *match a specific class in the CSS* for that component, in a way that **you don't have to contemplate every possible prop** that will eventually get rendered into a *hashed, CSS Modules class*.
But first, let's get into each component one at a time.

### Block component

Say you are implementing your own grid system, something like what Bootstrap does with their `col-md-6 col-xs-12` global classes, but you want a wrapper component to do that and, of course, *you don't want to rely on `classNames` to do all the job*.

```scss
.block {
  padding: $padding-layout-block;
  box-sizing: border-box;
  float: left;
  width: 100%;
}

@mixin blockSize($n) {
  width: $column-width * $n * 1%;
  .block & {
    padding-top: 0;
  }
}

@media (#{$breakpoint-phablet-up}) {
  .width1of12 {
    @include blockSize(1);
  }
  .width2of12, .width1of6 {
    @include blockSize(2);
  }
  .width3of12, .width1of4 {
    @include blockSize(3);
  }
  .width4of12, .width2of6, .width1of3 {
    @include blockSize(4);
  }
}
```

As you might have noticed, this code us using [SASS](http://sass-lang.com/) to show an use case with a preprocessor, but you *don't need one at all* as long as you are using **CSS Modules**.
This is where **react-css-props** takes action:

```jsx
import React from 'react';
import cn from 'classnames';
import cssProps from 'react-css-props';

import theme from './Block.scss';

// First customize it with your theme, then use it!
const toCSS = cssProps(theme);

const Block = ({ children, ...props }) => (
    <div className={cn(theme.block, ...toCSS(props))}>
        {children}
    </div>
);

export default Block;
```

Obviously, the *magic* is that `cssProps` is a HOF ([Higher Order Function](http://eloquentjavascript.net/05_higher_order.html)), that gets ready to use the props ass CSS clases using the imported theme from CSS Modules.
As you can imagine, the code before *react-css-props* was as weird as `<Block className="block block-width-1-of-4">`.

### Icon component

Now let's move into a more complex example. We have the following CSS and we don't have control over it cause it's auto-generated (maybe, by our *Designer*):

```scss
@font-face {
  font-family: $icon-font;
  src: url("./Icon.woff");
}

.icon {
  font-family: $icon-font, "Helvetica", "sans-serif";
  font-style: normal !important;
  margin-right: $size0_5;
}

.icon-arrow-down:before {
  content: "\e900";
}

.icon-arrow-left:before {
  content: "\e901";
}

.icon-arrow-right:before {
  content: "\e902";
}

.icon-arrow-up:before {
  content: "\e903";
}
```

Of course, you **really** want to avoid as much `className` duplication as possible, and you notice the pattern of every icon: `icon-${type}`.
Well, luckily, you have a second *optional* parameter to the **react-css-props** module to specify a **lambda with your given pattern**, as follows:

```jsx
import React from 'react';
import cn from 'classnames';
import cssProps from 'react-css-props';

import theme from './Icon.scss';

// Prepare it with your custom mapper function
const toCSS = cssProps(theme, type => `icon-${type}`);

const Icon = (props) => (
    <i className={cn(theme.icon, ...toCSS(props))} />
);

export default Icon;
```

Isn't that *neat*? No longer need for code like this: `<Icon className="icon icon-save" />`, where you had to type **three times** the word "icon" to finnally render it!

## API

### `cssProps(theme: Object, [mapper: (string) => string])`

The first argument is the `theme` imported from CSS Modules which, as [confirmed](https://twitter.com/markdalgleish/status/804033901161156608) by **Mark Dalgleish** (the creator of CSS Modules), it's "just a regular JavaScript *object* :)".
The second argument is **optional** and corresponds to a mapper *function* in case your CSS clases follow a defined pattern.
This method **returns** the next function (you can name any of these two literally *whatever* you like):

### `toCSS(props: Object, [defaultClass: string])`

The first argument are the `props` of your component, likely to have been delegated to only your plausible CSS classes with the **spread operator (`...props`)**.
The second argument is also **optional** and consists on a default CSS class, if you have any.
This method will **always return an arraw** of matching CSS classes between your *theme* and your *props*.
This plays along very well with [**classnames**](https://github.com/JedWatson/classnames) to customize your components, as shown in the examples.

## License

MIT © [Flavio Corpa](http://flaviocorpa.com)

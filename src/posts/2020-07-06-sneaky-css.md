---
title: 'Sneaky CSS: Concepts and Features I Never Knew'
modified: 2020-07-06
description: Some CSS concepts and features I have only learned more recently.
tags:
  - CSS
---

I have been a full time frontend developer for over 3.5 years, and I am always learning new CSS syntax and concepts. I thought I would share some concepts and features I have only learned in the last year or so that have helped me style and build UIs faster and more easily.

## Collapsing Margins

<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">TIL about collapsing margins in CSS. This explains SO many of weird problems I&#39;ve had over the years! 🤯</p>&mdash; Brian Mitchell (@BrianMitchL) <a href="https://twitter.com/BrianMitchL/status/1244749160751837186?ref_src=twsrc%5Etfw">March 30, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I didn't notice this for a long time, but if you have a series of elements that have a `margin-top` and `margin-bottom` set, the browser uses the largest (when the values are positive) value for the margin between the elements. This concept, called [margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing), becomes important with spacing block elements, using borders, set height, or clearing floats. To help with preventing this from happening (and better component isolation), I've even seen the argument for [Margin considered harmful](https://mxstbr.com/thoughts/margin). If you need to override collapsed margins you can add wrapper elements, use padding, or fixed height spacer elements.

### Example

Each `p` has a `margin-top` of `0.25rem` and `margin-bottom` of `1rem`, but because the bottom is larger than the top, the resulting space is `1rem`. Each `p` still has the margin set, but if the parent element does not have any padding or borders of its own, it collapses the margins for its height, and the margin of the children might be outside the parent.

<details>
  <summary>See the code!</summary>

```html
<style rel="stylesheet" type="text/css">
  .collapsing-margins-example {
    background-color: yellow;
    color: black;
  }
  .collapsing-margins-example.add-padding {
    padding: 0.5rem;
  }
  .collapsing-margins-example p {
    margin-top: 0.25rem;
    margin-bottom: 1rem;
    background: lightsteelblue;
  }
  .collapsing-margins-example div {
    margin-top: 2rem;
    margin-bottom: 2rem;
    background: lightsalmon;
  }
</style>

This wrapper has no padding or border, so it's height uses the collapsed margins
of the first and last elements.

<div class="collapsing-margins-example">
  <p>Paragraph</p>
  <p>Paragraph</p>
  <p>Paragraph</p>
</div>

This wrapper has a padding of `0.5rem`, so it's height uses the margins of its
children.

<div class="collapsing-margins-example add-padding">
  <p>Paragraph</p>
  <p>Paragraph</p>
  <p>Paragraph</p>
</div>

Each `p` still has a `margin-top` of `0.25rem` and `margin-bottom` of `1rem`,
but we introduce a `div` which has a `margin-top` and `margin-bottom` of `2rem`.
Because the bottom margin on the `p` is smaller than the margin on the `div`, it
collapses, and the resulting space is the `2rem` from the `div`.

<div class="collapsing-margins-example">
  <p>Paragraph</p>
  <p>Paragraph</p>
  <div>
    <p>Paragraph</p>
    <p>Paragraph</p>
  </div>
  <p>Paragraph</p>
</div>
```

</details>

<style rel="stylesheet" type="text/css">
  .collapsing-margins-example {
    background-color: yellow;
    color: black;
  }
  .collapsing-margins-example.add-padding {
    padding: 0.5rem;
  }
  .collapsing-margins-example p {
    margin-top: 0.25rem;
    margin-bottom: 1rem;
    background: lightsteelblue;
  }
  .collapsing-margins-example div {
    margin-top: 2rem;
    margin-bottom: 2rem;
    background: lightsalmon;
  }
</style>

This wrapper has no padding or border, so it's height uses the collapsed margins of the first and last elements.

<div class="collapsing-margins-example">
  <p>Paragraph</p>
  <p>Paragraph</p>
  <p>Paragraph</p>
</div>

This wrapper has a padding of `0.5rem`, so it's height uses the margins of its children.

<div class="collapsing-margins-example add-padding">
  <p>Paragraph</p>
  <p>Paragraph</p>
  <p>Paragraph</p>
</div>

Each `p` still has a `margin-top` of `0.25rem` and `margin-bottom` of `1rem`, but we introduce a `div` which has a `margin-top` and `margin-bottom` of `2rem`.
Because the bottom margin on the `p` is smaller than the margin on the `div`, it collapses, and the resulting space is the `2rem` from the `div`.

<div class="collapsing-margins-example">
  <p>Paragraph</p>
  <p>Paragraph</p>
  <div>
    <p>Paragraph</p>
    <p>Paragraph</p>
  </div>
  <p>Paragraph</p>
</div>

## Stacking Contexts

This isn't as new of a concept to me, but it's so important I think it's worth calling out. Have you ever been working on a site and come across z-indexes of hundreds or thousands? It's wild, right? I've found that once I understood [stacking contexts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context) and how positioning works with `z-index` and DOM order, I almost never needed to use a `z-index` above `1` or `2` (unless I needed to override or stack on top of a 3rd party library that had it set very high). I can't think of a better example than the one on the MDN page linked above, check it out!

## focus-visible

The [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) pseudo selector is an [upcoming feature](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo) that lets you style the focus state of an element differently based on how the user is interacting with the web page (mouse/tap vs keyboard). This lets you create focus rings around elements only when using the <kbd>Tab</kbd>, <kbd>Shift + Tab</kbd>, or arrow keys, while keeping the page clean from focus rings when interacting with a mouse. Browser support is not universal yet, but there is a wonderful [focus-visible polyfill](https://github.com/WICG/focus-visible) maintained by the Web Incubator Community Group which provides the feature in the form of a class or data attribute that you can use as a selector instead.

<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">Different browsers and OSes have different behavior for focusing buttons when clicking on them. How do you handle these differences? <a href="https://t.co/RVs1swlogE">https://t.co/RVs1swlogE</a></p>&mdash; Brian Mitchell (@BrianMitchL) <a href="https://twitter.com/BrianMitchL/status/1253039009283989504?ref_src=twsrc%5Etfw">April 22, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## currentColor

The [currentColor keyword](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentColor) is the value of the `color` property (you know, to set text color). This lets you use the value of `color` for other uses, like backgrounds, borders, shadows, etc. It becomes especially powerful when combined with things like setting border and SVG fill colors to match the text color of a button or other element that might change when a user interacts with it.

### Example

Toggle the checkbox to see that all colors change, even though we set the color property in only one place.

<details>
  <summary>See the code!</summary>

```html
<style rel="stylesheet" type="text/css">
  .currentcolor-example input ~ div {
    color: orangered;
    padding: 0.5rem;
  }
  .currentcolor-example input:checked ~ div {
    color: rebeccapurple;
  }
</style>
<div class="currentcolor-example">
  <input id="checkbox-0" type="checkbox" />
  <label for="checkbox-0">Toggle color</label>
  <div style="border: 2px dotted currentColor;">
    This color is set with CSS, and the border is set to currentColor.
    <div style="border-top: 1px dashed currentColor;">
      The border-top that's set to currentColor, the same color as the parent
      color!
    </div>
  </div>
</div>
```

</details>

<style rel="stylesheet" type="text/css">
  .currentColor-example input ~ div {
    color: orangered;
    padding: 0.5rem;
  }
  .currentColor-example input:checked ~ div {
    color: rebeccapurple;
  }
</style>
<div class="currentColor-example">
  <input id="checkbox-0" type="checkbox" />
  <label for="checkbox-0">Toggle color</label>
  <div style="border: 2px dotted currentColor;">
    This color is set with CSS, and the border is set to currentColor.
    <div style="border-top: 1px dashed currentColor;">
      The border-top that's set to currentColor, the same color as the parent color!
    </div>
  </div>
</div>

## position: sticky

[Sticky positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/position#Sticky_positioning) has been around for years, but IE11 doesn't (and will never) support it, so I hadn't ever actually used it. This lets you have an element flow as if it were relatively positioned until it reaches the edge of the containing block (through scrolling). From there it behaves more closely to fixed positioning, but only on the axis anchored with a `top`, `left`, `right`, or `bottom` property and within the bounds of its parent element. For the site I used it, we accepted that IE would have a slightly degraded experience by not supporting it, due to the difficulty of writing a replacement to sticky positioning with JavaScript for our scenario.

## Accessibility with display: none

<blockquote class="twitter-tweet" data-dnt="true" data-theme="light"><p lang="en" dir="ltr">Also TIL, when styling labels that wrap radio inputs, _of course_ they won&#39;t be keyboard navigable if the inputs are set to `display: none`. (Absolutely position them behind the labels)</p>&mdash; Brian Mitchell (@BrianMitchL) <a href="https://twitter.com/BrianMitchL/status/1194044909428363264?ref_src=twsrc%5Etfw">November 12, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

While it seems obvious now, when I was looking at fixing keyboard and accessibility support for a custom checkbox-like input in an app, I realized that `display: none` all but removes an element from the document. It still exists in the DOM, and can be toggled through clicking on a linked label, but otherwise it's effectively not there. To avoid this from happening, I found that the following CSS is a great way to visually hide the input while keeping it visible for focus management, tabbing with a keyboard, and being spoken with screen readers.

```css
position: absolute;
// use clip for legacy browsers
clip: rect(0, 0, 0, 0);
clip-path: circle(0);
```

### Example

Note: Depending on your OS and browser, you may need to enable additional features for keyboard navigation. On Safari for macOS, you need to go to _System Preferences > Keyboard > Shortcuts_ then select the "Use keyboard navigation to move focus between controls".

With a mouse, both checkboxes work the same, but if you use <kbd>Tab</kbd> to focus on them, you'll see that the first checkbox isn't focusable, while the second one is. This is despite the fact that they both visually look and work the same. An <span style="display:inline-block;border: 0.25rem solid orangered;">orangered border</span> indicates that a checkbox is checked.

<details>
  <summary>See the code!</summary>
  
```html
<style rel="stylesheet" type="text/css">
  .checkbox-example button {
    margin: 0 0 0.5rem;
  }
  .checkbox-example input {
    margin: 0;
    padding: 0;
    cursor: pointer;
  }
  .checkbox-example input + label {
    transition: none;
    display: block;
    border: 0.25rem dotted lightseagreen;
    padding: 0.25rem;
    margin: 0 0 0.5rem;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
  }
  .checkbox-example input:focus + label {
    outline: dodgerblue solid 0.25rem;
    outline-offset: 0.25rem;
  }
  .checkbox-example input:checked + label {
    border: 0.25rem solid orangered;
  }
  .checkbox-example input#checkbox-1 {
    display: none;
  }
  .checkbox-example input#checkbox-2 {
    position: absolute;
    // use clip for legacy browsers
    clip: rect(0, 0, 0, 0);
    clip-path: circle(0);
  }
</style>

<div class="checkbox-example">
  <button>Click me for focus</button>
  <input id="checkbox-1" type="checkbox" />
  <label for="checkbox-1">Custom checkbox with <code>display: none</code></label>
  <input id="checkbox-2" type="checkbox" />
  <label for="checkbox-2">Custom checkbox with styling to hide the input</label>
</div>
  ```
</details>

<style rel="stylesheet" type="text/css">
  .checkbox-example button {
    margin: 0 0 0.5rem;
  }
  .checkbox-example input {
    margin: 0;
    padding: 0;
    cursor: pointer;
  }
  .checkbox-example input + label {
    transition: none;
    display: block;
    border: 0.25rem dotted lightseagreen;
    padding: 0.25rem;
    margin: 0 0 0.5rem;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
  }
  .checkbox-example input:focus + label {
    outline: dodgerblue solid 0.25rem;
    outline-offset: 0.25rem;
  }
  .checkbox-example input:checked + label {
    border: 0.25rem solid orangered;
  }
  .checkbox-example input#checkbox-1 {
    display: none;
  }
  .checkbox-example input#checkbox-2 {
    position: absolute;
    // use clip for legacy browsers
    clip: rect(0, 0, 0, 0);
    clip-path: circle(0);
  }
</style>

<div class="checkbox-example">
  <button>Click me for focus</button>
  <input id="checkbox-1" type="checkbox" />
  <label for="checkbox-1">Custom checkbox with <code>display: none</code></label>
  <input id="checkbox-2" type="checkbox" />
  <label for="checkbox-2">Custom checkbox with styling to hide the input</label>
</div>

---
layout: 'layouts/page.njk'
title: Styleguide
description: A page for testing the common styles and layouts on the site.
modified: 2021-07-03
disableSubNav: true
---

A single page for showcasing and testing the common styles and layouts for pages and posts on the site.

{% include "toc.md" %}

## Headings (this is an h2)

Heading level 2

### H3

Heading level 3

#### H4

Heading level 4

##### H5

Heading level 5

###### H6

Heading level 6

## Text

### Body Text

<div style="font-family: var(--font-body)">

Text is important, there are lots of things you can do with it!

This paragraph is for testing font features. The quick brown fox jumps over the lazy dog. 0987654321. tt TT Qq. Artificial, practical. Those words were for testing the ligatures from a 't' or an 'f' to an 'i'. _italic_ **bold** _**italic bold**_

</div>

### Heading Text

<div style="font-family: var(--font-heading)">

Text is important, there are lots of things you can do with it!

This paragraph is for testing font features. The quick brown fox jumps over the lazy dog. 0987654321. tt TT Qq. Artificial, practical. Those words were for testing the ligatures from a 't' or an 'f' to an 'i'. _italic_ **bold** _**italic bold**_

</div>

### Monospace Text

<div style="font-family: var(--font-mono)">

Text is important, there are lots of things you can do with it!

This paragraph is for testing font features. The quick brown fox jumps over the lazy dog. 0987654321. tt TT Qq. Artificial, practical. Those words were for testing the ligatures from a 't' or an 'f' to an 'i'. _italic_ **bold** _**italic bold**_

</div>

### Markdown

A paragraph of text with a [link](https://brianm.me)! Here's an emoji {% emoji "👍", "thumbs up" %}. We can have _italicized text_, **bold text**, <q>quoted text</q>, and ~~striked text~~. **A mix of bold and _italicized text_**

> A blockquote, how cool is this!?

How about some inline `code` or keyboard sequences, <kbd>Command + Tab</kbd>?

We can also be super fancy and add footnotes[^short] to our text to reference things[^long]. You can also make them inline^[This footnote is defined right next to the text that it's noting.].

[^short]: Here is the footnote.
[^long]: Here's one with multiple blocks.

    Indented paragraphs belong to the previous footnote. Find the docs on the [markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote) docs.

### HTML

Here are some HTML elements to format text outside of markdown. I could configure it, but I don't really use these much, so inlining HTML on a static site seems fine if I do.

<samp>Computer output example with a &lt;samp&gt; element.</samp>

What if we want to <mark>highlight</mark> some text?

What do <ins>inserts</ins> look like?

Here is a <sub>subscript</sub> and a <sup>superscript</sup>!

## Lists

- Here
- Is
- An
- Unordered list
  - First nested list item
    - Second nested list item

1. And
2. Here
3. Is
4. An
5. Ordered list

## Definition Lists

Examples pulled from the [Pandoc example](https://pandoc.org/MANUAL.html#definition-lists). This uses the [markdown-it-deflist](https://github.com/markdown-it/markdown-it-deflist) plugin.

Term 1

: Definition 1

Term 2 with _inline markup_

: Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

Term 3

: Definition
with lazy continuation.

    Second paragraph of the definition.

Term 4
~ Definition 1

Term 5
~ Definition 2a
~ Definition 2b

## Block of Code

```typescript
function shuffle<T = unknown>(array: T[]) {
  let i = array.length;
  let j;

  while (i !== 0) {
    j = Math.floor(Math.random() * i);
    i -= 1;

    const swap = array[i];
    array[i] = array[j];
    array[j] = swap;
  }

  return array;
}
```

## Tables

| Column 1 |    Column 2, Right Aligned |
| -------- | -------------------------: |
| Thing 1  |       Some more data here. |
| Thing 2  |            Text text text. |
| Thing 3  | Did you know that `1+2=3`? |

## Photos and Figures

<div class="grid-thumbs">
  <figure>
    <img loading="lazy" src="https://cdn.brianm.me/images/posts/2020-review/bde-maka-ska.jpg" alt="Dusk at Bde Maka Ska">
    <figcaption>Dusk at Bde Maka Ska</figcaption>
  </figure>
  <figure>
    <img loading="lazy" src="https://cdn.brianm.me/images/posts/2020-review/lake-of-the-isles-1.jpg" alt="Lake of the Isles Sunset 1">
    <figcaption>Sunset at Lake of the Isles</figcaption>
  </figure>
  <figure>
    <img loading="lazy" src="https://cdn.brianm.me/images/posts/2020-review/lake-of-the-isles-2.jpg" alt="Lake of the Isles Sunset 2">
    <figcaption>Dusk at Lake of the Isles</figcaption>
  </figure>
</div>

<figure class="video-container">
  <div>
    <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/woQsKqtrhfQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
    <figcaption>Juelz at Skyway Theater, February 29th, 2020</figcaption>
</figure>

## Colors

Colors are set with CSS Custom Properties. This site supports a light and dark mode. The current theme is always set to your browser/operating system's preference, as set by the `(prefers-color-scheme: dark)` media query. Change your preference to see the different variations below.

<noscript>JavaScript is required to view this content.</noscript>

{% renderTemplate "webc" %}
<css-custom-properties></css-custom-properties>
{% endrenderTemplate %}

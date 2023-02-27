---
title: Eleventy Redirect From
description: An Eleventy drop-in replacement for the jekyll-redirect-from style of redirect files.
modified: 2021-01-22
tags:
  - Eleventy
  - Jekyll
  - JavaScript
---

When migrating my site from Jekyll on GitHub Pages to Eleventy on GitHub Pages, I wanted to continue to use my page redirects to preserve old links.

Caveat: Emitting new HTML files with redirect content is best for webservers that just serve files. Hosts like [Netlify](https://docs.netlify.com/routing/redirects/), [Vercel](https://vercel.com/docs/configuration#project/redirects), [AWS Amplify](https://docs.aws.amazon.com/amplify/latest/userguide/redirects.html), or your own webserver all offer ways to centrally configure redirects. Using your host or webserver to configure redirects is probably a better approach than serving redirect HTML files that are handled on the client side.

## Backstory

GitHub Pages supports automatically building a Jekyll site when we commit to the target branch. There are a [collection of plugins](https://pages.github.com/versions/) that we can use on top of base Jekyll installation. One of these is [jekyll-redirect-from](https://github.com/jekyll/jekyll-redirect-from). This lets us specify pages/routes to redirect from, to the current page.

Let's say we have a page with the following front-matter. This will emit a page at `/new-page.html`.

```yaml
---
title: My Cool Page
permalink: /new-page
redirect_from: /old-page
---
```

With the `jekyll-redirect-from` plugin, it will also emit a page at `/old-page.html`, with the following content. This causes a browser to immediately load the page at the new URL, while preserving any links to the old page.

```html
<!DOCTYPE html>
<html lang="en-US">
  <meta charset="utf-8" />
  <title>Redirecting&hellip;</title>
  <link rel="canonical" href="https://example.com/new-page" />
  <script>
    location = 'https://example.com/new-page';
  </script>
  <meta http-equiv="refresh" content="0; url=https://example.com/new-page" />
  <meta name="robots" content="noindex" />
  <h1>Redirecting&hellip;</h1>
  <a href="https://example.com/new-page">
    Click here if you are not redirected.
  </a>
</html>
```

## Eleventy Template

With Eleventy, I was able to replicate this functionality with a single template utilizing the [pagination](https://www.11ty.dev/docs/pagination/) feature with a [before callback](https://www.11ty.dev/docs/pagination/#the-before-callback). This lets us reduce the collection of all pages into a list of redirect pairs (the source path and the destination path).

Using this template allows for drop-in replacement from the `jekyll-redirect-from` style of creating redirects. We are able to check if the value is a string or an array in order to handle one or multiple redirects.

### Single

```yaml
redirect_from: /old-url/page
```

### Multiple

```yaml
redirect_from: [/old-url/page, /some-other-page]
```

### eleventy-redirect.njk

We use a [JavaScript front matter](https://www.11ty.dev/docs/data-frontmatter/#javascript-front-matter) block in order to create a `before` function.

<!-- prettier-ignore-start -->
```html
{% raw %}---js
{
  pagination: {
    data: "collections.all",
    size: 1,
    alias: "redirect",
    before: function (data) {
      return data.reduce((redirects, page) => {
        if (Array.isArray(page.data.redirect_from)) {
          for (let url of page.data.redirect_from) {
            redirects.push({ to: page.url, from: url });
          }
        } else if (typeof page.data.redirect_from === 'string') {
          redirects.push({ to: page.url, from: page.data.redirect_from });
        }
        return redirects;
      }, []);
    },
    addAllPagesToCollections: false,
  },
  permalink: "{{ redirect.from }}/index.html",
  eleventyExcludeFromCollections: true,
}
---
<!DOCTYPE html>
<html lang="en-US">
  <meta charset="utf-8" />
  <title>Redirecting&hellip;</title>
  <link rel="canonical" href="{{ redirect.to | url }}" />
  <script>
    location = '{{ redirect.to | url }}';
  </script>
  <meta http-equiv="refresh" content="0; url={{ redirect.to | url }}" />
  <meta name="robots" content="noindex" />
  <h1>Redirecting&hellip;</h1>
  <a href="{{ redirect.to | url }}">Click here if you are not redirected.</a>
</html>
{% endraw %}
```
<!-- prettier-ignore-end -->

Eleventy emits files in their own directory and as an `index.html` file, so watch out for trailing slashes and how your webserver handles them. For example, `/new-page.html` and `/new-page/index.html` may be handled differently.

Let me know if this works for you and if there's anything you think could be improved. Hope this helped!

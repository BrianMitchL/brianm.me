---
layout: post
title: How to Make a Jekyll Site/Blog
modified: 2018-09-02 19:35 CDT
description: A tutorial on making a Jekyll based site/blog.
author: brian
seo.type: BlogPosting
image:
---

Because I put a lot of time into this site in the last few months, I figured I might as well share my experience so others can jump right in as well! You can view the source for this site on the [GitHub repository](https://github.com/BrianMitchL/BrianMitchL.github.io).

## Introduction

[Jekyll](https://jekyllrb.com) is a static site generator, written in [Ruby](https://www.ruby-lang.org/en/). It takes a series of templates and static files, and outputs to a ready to host directory of files. For simple websites like a blog or portfolio, a static site generator is perfect. Additionally, with a generator like Jekyll and its [Liquid templating engine](https://shopify.github.io/liquid/), you are still able to use many powerful features like markdown, layouts, partials, and iterating through data to build files. As an added bonus, GitHub Pages can build a Jekyll site and host it, making it perfect for personal and project websites and blogs.

## Installation

Jekyll officially supports Linux, Unix, and macOS, though it seems you can get it to [install on Windows](https://jekyllrb.com/docs/installation/windows/) as well.

As Jekyll is written in Ruby, you will need Ruby installed. Apple ships the now unmaintained `2.0.0p648` version of Ruby on El Capitan, so I installed the latest version of Ruby (`2.3.1`) with [Homebrew](https://brew.sh) (:heart: Homebrew, I love a good package manager). I deploy this site with GitHub Pages, so to start off, I installed the `github-pages` gem. To maintain dependencies, create a file called `Gemfile` and add the following:

```ruby
source 'https://rubygems.org'
gem 'github-pages'
```

There is a nice tool called `bundler` that manages packages and environments for you. This is the recommended way to use Jekyll (as far as I can tell). To install that and your project dependencies, run

```sh
gem install bundler
bundle install
```

Now you're all set and ready to start building your site! Check out the [Jekyll installation docs](https://jekyllrb.com/docs/installation/) for more info.

## Getting Started

You can either create all of the files yourself, or run the following to generate a new scaffold site:

```sh
jekyll new path/to/directory
```

## Configuring and Structure

To build your site, run:

```sh
bundle exec jekyll build
# build the site

bundle exec jekyll serve --livereload
# build the site and serve it, auto-regenerating on changes
# access from http://localhost:4000/
```

By default, the site is built to `_site` and is sourced from the current directory. These paths can be configured in `_config.yml` or by passing in flags when running `jekyll`.

### \_config.yml

To start off, you will need a `_config.yml` file for configuration and a place to store global variables. Here is a good starter example for the file.

```yaml
markdown: kramdown

timezone: America/Chicago

permalink: /posts/:slug

exclude:
  - README.md
  - .gitignore
  - Gemfile
  - Gemfile.lock
  - .sass-cache
  - CNAME
  - LICENSE
```

The `markdown: kramdown` line tells Jekyll to use [kramdown](https://kramdown.gettalong.org) as the markdown interpreter.

The `timezone` setting will make sure dates used across the site will be localized to a timezone that you want, if not specified, Jekyll defaults to UTC.

The `permalink` setting tells Jekyll how to route the blog posts. For historical reasons, I have mine at `/posts/:slug`. You can format your permalink to include any information available on the page, ie. front matter or built in variables. Check out [Jekyll permalink docs](https://jekyllrb.com/docs/permalinks/) for much more information.

The `exclude` setting tells Jekyll to ignore certain files when building the site and will not copy them to the `_site` directory.

### Front Matter

Front matter is a [YAML](http://yaml.org) block in-between a set of triple-dashed lines. It is how to set page level variables and metadata. Liquid will only add tags and variables if a file contains front matter. Below is the front matter from this post:

<!-- prettier-ignore-start -->
```yaml
---
layout: {{ page.layout }}
title: {{ page.title }}
slug: {{ page.slug }}
modified: {{ page.modified }}
description: {{ page.description }}
author: {{ page.author }}
seo.type: BlogPosting
image: {{ page.title }}
---
```
<!-- prettier-ignore-end -->

Variables included in the front matter or that come standard on any page or post can be accessed on the page by using the Liquid template engine:

```html
<h1>{% raw %}{{ page.title }}{% endraw %}</h1>
```

That's pretty neat, what else can you do?

Good question, I'm glad you asked!

```html
{% raw %}{% assign author = site.data.authors[page.author] %}{% endraw %}
<p>
  Written by {% raw %}{{ author.name }}{% endraw %} on {% raw %}{{ page.date |
  date: "%B %-d, %Y" }}{% endraw %}
</p>
```

Woah.

What's going on here? To begin, we using a data file to store authors. This can be found at `_data/authors.yml`. Content in this file becomes available to Liquid at `site.data.authors`. More info on data files can be found on the [Jekyll data files docs](https://jekyllrb.com/docs/datafiles/). We're assigning the `author` variable to `site.data.authors[page.author]`. `page.author` refers to the front matter above, which resolves to `brian`. So now `author` contians everything inside of the `brian` object in `_data/authors.yml`. Inside that file we have:

```yaml
brian:
  name: Brian Mitchell
  bio: 'Web developer, emoji lover :wave:, and an avid fan of electronic music.'
  twitter: BrianMitchL
  gravatar: 89e0d7d3d9370c45517960c8a12f92b9
  web: https://brianm.me
```

Information can be accessed just as if it were front matter, which is what {% raw %}`{{ author.name }}`{% endraw %} is doing above.

As you can see in the example above, Liquid can also filter data. Here, the date is being formatted. This is just the beginning of what Liquid can do, but it's two things that I think are really useful. Checkout other filters and Liquid features on the [Jekyll template docs](https://jekyllrb.com/docs/templates/).

If you have a file that you don't need to declare any variables, but want to use Liquid you must still use the set of triple-dashed lines for Jekyll to process that file. For example, here's my [humans.txt](/humans.txt) file:

```plaintext
{% raw %}---
---
/* TEAM */
Name: {{ site.data.authors.brian.name }}
Twitter: @{{ site.data.authors.brian.twitter }}
Location: Minneapolis, MN, USA.

/* THANKS */
Name: mom

/* SITE */
Last update: {{ site.time | date: "%Y/%m/%d"}}
Language: English
Doctype: HTML5
Components: Jekyll, UIkit, fontawesome, SCSS, GitHub
Software: WebStorm, Safari, Photoshop
```

For a full list of features, check out the Jekyll docs on [front matter](https://jekyllrb.com/docs/frontmatter/) and [variables](https://jekyllrb.com/docs/variables/).

### Layouts and Includes

#### Layouts

When writing pages and posts, you don't want to have to keep track of every occurrence of a navbar, or page head. This is where a layouts and includes are extremely useful. Store any layouts you use in `_layouts/`. In my site, I have a file at `_layouts/default.html` which more or less contains the following:

```html
{% raw %}<!DOCTYPE html>
<html lang="en">
  <head>
    {% include head.html %}
  </head>
  <body>
    {{ content }} {% include footer.html %}

    <!-- some script tags and Google Analytics are located here -->
  </body>
</html>
{% endraw %}
```

Every page I make in some way uses this layout. If I created a new page, I would include the following in it's front matter, and the content of that file would be rendered into the `{% raw %}{{ content }}{% endraw %}` of the default layout:

<!-- prettier-ignore-start -->
```yaml
---
layout: default
---
```
<!-- prettier-ignore-end -->

Another layout can also use a layout. It's content will be loaded in the `{% raw %}{{ content }}{% endraw %}` of it's parent layout.

#### Includes

In the layout above, I also have `{% raw %}{% include head.html %}{% endraw %}` and `{% raw %}{% include footer.html %}{% endraw %}`. These are known as includes (or partials). Includes are a file that can be inserted into any page. They're perfect for a navbar or footer, where you want to keep the markup consistent throughout the site. Store any includes you use in `_includes/`. Here is a portion of my `nav.html` code:

```html
{% raw %}{% assign url = page.url | remove:'/index.html' %}
{% for link in site.navigation %}
<li {% if url == link.url %}class="uk-active"{% endif %}>
    <a href="{{ link.url }}" title="{{ link.title }}">{{ link.text }}</a>
</li>{% endfor %}{% endraw %}
```

Here, I get the URL from the current page (while removing unwanted possible filenames) and store it as `url`. Next, I iterate through a list of link dictionaries and build the list in HTML. While iterating through this list, I check if the page URL is the same as the current link in the loop and, if so, set the item's class to active, which then applies a different background color, indicating that the user is on the said page.

### Creating Pages

Your homepage needs to be named `index.html` (or `index.md` if you're writing it in markdown) and be located at the root level of your project. For any other page at the root level, you can create a file such that the title of the file will be the URL to that page. For example, if you create a file at `/about.md`, Jekyll will make that available at `https://example.com/about.html` (or `example.com/about` if you set `permalink: /about` in the file's front matter). If you wish to have a page in a subdirectory (or [many subdirectories](https://github.com/BrianMitchL/heygetbacktowork/tree/gh-pages/it/looks/like/you/are/distracted/%2C/maybe/you/should/get/back/to/work!)), title that subdirectory what you wish the URL path to be, then drop in an `index.html` (or markdown equivalent) at that directory. For example, if I created `/this/is/a/test/index.html`, I could access that page at `https://example.com/this/is/a/test`.

Check the Jekyll documentation on [creating pages](https://jekyllrb.com/docs/pages/).

### Writing Posts

All posts live inside the appropriately named `_posts` directory.

#### Files

Each post is it's own file, and must have a filename formatted as:

```plaintext
YYYY-MM-DD-title.MARKUP
```

`YYYY-MM-DD` represents the year, month, and day of the post, `title` is the title of the post. I always specify this in the front matter of the file, and generally set my own slug and use that for the filename. `MARKUP` refers to the file extension and format the file uses. Here are a few examples filenames:

```sh
2016-05-29-tech-crew.md
2016-07-04-happy-independence-day.html
```

#### Front Matter

Unlike pages, a post _must_ contain front matter. I like to set a more specific `date`, as well as `title`, `slug`, `description`, and of course what `layout` I'm using.

#### Indexing Posts

So now you have a bunch of well written and entertaining posts, but how do you show links to them?
It's quite easy, you can use Liquid to iterate through your posts to show them in a list:

```html
{% raw %}
<ul>
  {% for post in site.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a>
  </li>
  {% endfor %}
</ul>
{% endraw %}
```

If you have a lot of posts, be sure to check out the [Pagination](#pagination) plugin for showing your posts on more than one page.

##### Excerpts

By default, the first paragraph of each post is available at {% raw %}`{{ post.excerpt }}`{% endraw %}. Alternatively, you can set your own by including the `excerpt` variable in your post's front matter. You can configure exceprts even more, such as setting an `excerpt_separator` and filtering on the excerpt. Check out [post excerpts](https://jekyllrb.com/docs/posts/#post-excerpts) for more.

## Themes

Jekyll supports site-wide themes. If you use the `jekyll new` command to create a scaffolded site, it wll use the theme `minima`. You can install and swap in other themes by installing the `gem` for the theme you are using, and by specifying it in your `_config.yml` file. For more information on using and creating a theme package, check out the [Jekyll theme docs](https://jekyllrb.com/docs/themes/).

Note, GitHub Pages _only_ supports the `minima` theme. If you want to use something else, you must roll your own, bundle the entire source within your project, or use an externally hosted solution.

## Plugins and More

GitHub Pages only supports a limited set of plugins. I will cover the ones that I use on this site (most of the ones GitHub supports). View the [github-pages gem](https://rubygems.org/gems/github-pages) dependencies for a list on available plugins.

### GitHub Pages 404 Page

If you are using GitHub Pages to host your site, you can create your own 404 error page. Instead of showing a visitor of your site a standard GitHub 404 page, you can create your own that fits your site. _Note, this can only be done if you use a custom domain, see the GitHub page on [Creating a custom 404 page for your GitHub Pages site](https://help.github.com/articles/creating-a-custom-404-page-for-your-github-pages-site/) for more information._

If this applies to you, all you need to do is create a `404.html` or `404.md` file in the project root and add `permalink: /404.html` to the front matter, and you're all set!

### SASS/SCSS

To add support for SASS/SCSS (which you totally should :grin:), add the following to your `_config.yml` file:

```yml
sass:
  sass_dir: assets/css/_sass
  style: compressed

plugins:
  - jekyll-sass-converter
```

Set the `sass_dir` to where you store your Sass/SCSS files.
You can change the output style to `nested`, `expanded`, `compact`, `compressed`, or remove it entirely to keep everything.

Check out the [Sass/SCSS docs](https://jekyllrb.com/docs/assets/#sassscss).

### Pagination

Here's what the official docs say about pagination:

> With many websites — especially blogs — it’s very common to break the main listing of posts up into smaller lists and display them over multiple pages. Jekyll offers a pagination plugin, so you can automatically generate the appropriate files and folders you need for paginated listings.

So really, why not? To add pagination, add the following to your `_config.yml` file:

```yml
paginate: 5
paginate_path: /blog/page/:num/

plugins:
  - jekyll-paginate
```

The `paginate` number sets how many posts to be included on every page. It makes sense to show many if you only show the title and a link, but fewer if you show the entire contents of each post on one page. The `paginate_path` string sets how the pages paths/URLs are formed. Note: the `/blog` page cannot have a permalink for pagination to work. To get around this, I make a blog directory, and put my page there: `blog.html` &rarr; `blog/index.html`.

To update your page, simply replace your posts loop to `{% raw %}{% for post in paginator.posts %}{% endraw %}`. To show the appropriate previous/next buttons, I recommend checking out the [Jekyll Pagination Docs](https://jekyllrb.com/docs/pagination/).

### Syntax Highlighting

Before you can use syntax highlighting, you must add a few things to your `_config.yml` file:

```yaml
highlighter: rouge

kramdown:
  syntax_highlighter: rouge

plugins:
  - rouge
```

This sets [rouge](http://rouge.jneen.net) for syntax highlighting. Jekyll also supports the Pygments highlighter, but GitHub Pages does not, so I will only talk about Rouge in this post. The `kramdown:` list configures kramdown, the markdown converter.

In order to use syntax highling in your site, you can use the default setting or use GitHub Flavored Markdown's backticks to denote a code block.
Default:
Use `{% raw %}{% highlight python %}{% endraw %}` followed by some sweet Python code, closed with `{% raw %}{% endhighlight %}{% endraw %}`.

When building the site, rouge will seek through the code block and add span tags with classes on parts of the code. These tags can then be styled to have different colors, hence syntax highlighting. I've been a huge fan of JetBrain's darcula theme, so I adapted a version from [https://smasue.github.io/pygments-darcula](https://smasue.github.io/pygments-darcula) to use on this site. You can find the code in [\_darcula.scss](https://github.com/BrianMitchL/BrianMitchL.github.io/blob/master/assets/css/_sass/_darcula.scss). Any Rouge or Pygments CSS theme will work. You can generate CSS files from Pygments or by downloading themes, for example, from [https://github.com/richleland/pygments-css/](https://github.com/richleland/pygments-css/).

### Search Engine Optimization (SEO)

It is ridiculously easy to get pretty good SEO with Jekyll. The `jekyll-seo-tag` plugin does nearly all of the heavy lifting to properly make the correct meta tags (description, open graph, Twitter card), and title. All that's really required is to be sure to set some variables in `_config.yml`, be sure to set the `title` and `description` in a page or post's front matter, and include `{% raw %}{% seo %}{% endraw %}` in the head of your page.
Below is what I have added to my `_config.yml` file:

```yaml
plugins:
  - jekyll-sitemap
  - jekyll-seo-tag

# seo
title: Brian Mitchell
description: Blog posts, projects, social media presence, and more!
url: https://brianm.me

twitter:
  username: BrianMitchL

facebook:
  app_id:
  publisher:
  admins:

logo: /assets/images/BM-Logo.png

social:
  name: Brian Mitchell
  links:
    - https://github.com/BrianMitchL
    - https://facebook.com/BrianMitchL
    - https://twitter.com/BrianMitchL
    - https://plus.google.com/+BrianMitchell16/
    - https://www.instagram.com/BrianMitchL
    - https://www.last.fm/user/BrianMitchL
    - https://www.linkedin.com/in/brianscottmitchell
    - https://open.spotify.com/user/1237277662
    - https://soundcloud.com/brianmitchl
    - https://steamcommunity.com/id/MagicBriBri
    - https://vine.co/bman4789
    - https://www.youtube.com/user/bman112234
    - https://www.snapchat.com/add/bman4789

google_site_verification: 4-mwXA7aYqZalRm3UuWpPv-aMyFT_zUtA_ks_RK7r5I
```

The `title`, `description`, `logo`, and `url` are used as site wide defaults. Jekyll computes each page's URL for you, so don't worry about setting that for every page. Use `twitter` for setting your site Twitter account. This will be used for the `twitter:site` field. In a post with a separate author, be sure to set the `author` in the front matter to the Twitter username of the author. You can also set the author to be an object with a `twitter` field as seen in `_data/_authors.yml`. Set the appropriate `facebook` fields if you wish to track your shares and page with a facebook application.

The `social` section is used for creating a site card on search engines. Enter the name of the website/person/company, followed by a list of other official pages. Set the `google_site_verification` string with your Google Webmaster site verification key to have it inserted as a meta tag.

On any page or post, you may define the `seo.type` variable. This uses the [schema.org](https://schema.org) types to define what kind of content is on the page.

### Feed

Be sure to add `jekyll-sitemap` to your `_config.yml`.

```yaml
plugins:
  - jekyll-feed
```

From there all you need to do is add `{% raw %}{% feed_meta %}{% endraw %}` to the head of your page. This will create a file called `sitemap.xml` that will link to every page on your site. This maintains an index of your site that helps search engines find everything.

### jemoji - GitHub-flavored Emoji

As usual with plugins, add `jemoji` to your `_config.yml` file.

```yaml
plugins:
  - jemoji
```

This plugin will allow you to insert GitHub-flavored Emojis into your pages and posts. For example:

```
:+1: :heart: :smile:
```

would produce: :+1: :heart: :smile:

### Redirect

Add `jekyll-redirect-from` to your `_config.yml` file.

```yaml
plugins:
  - jekyll-redirect-from
```

This plugin allows you to give your pages and posts multiple URLs. Redirects are performs by creating new HTML files with an HTTP-REFRESH meta tag pointing to the current page. To use, add the `redirect_from` variable to the front matter of a page. It accepts a string, or list of strings. If multiple `redirect_from`s are set, only the first one will be used.

```yaml
redirect_from: /contact
redirect_from:
  - /contact
  - /other-sites
```

### Travis CI

From what I've found, the best way to test your Jekyll site is to use the gem `html-proofer`.
This package will look through your build site for HTML errors. To set this up, add the following to your `_config.yml`:

```yaml
exclude: [vendor]
```

Also add the following to your `Gemfile`:

```ruby
gem 'html-proofer'
```

This is due to Travis CI bundling gems in the `vendor` directory.
Next, create a `.travis.yml` file and include the following:

```yaml
sudo: false
language: ruby
cache: bundler
rvm:
  - 2.5.1
script:
  - bundle exec jekyll build
  - bundle exec htmlproofer ./_site --disable-external --assume-extension
env:
  global:
    - NOKOGIRI_USE_SYSTEM_LIBRARIES=true
```

The `--disable-external` flag disables the checking on 3rd party links. Some websites will block scrapers like the one used in `html-proofer`, which will cause the check to fail, so this just skips em' all. The `--assume-extension` flag will assume that an href like `/about` is the same as `about.html`.
For more detailed information, check out the [Jekyll documentation on continuous integration](https://jekyllrb.com/docs/deployment/automated/#continuous-integration-service).

Update 2018-09-02: I have refactored this to use a [Rakefile](https://github.com/BrianMitchL/BrianMitchL.github.io/blob/master/Rakefile) and tell Travis CI to use that (see the [.travis.yml](https://github.com/BrianMitchL/BrianMitchL.github.io/blob/master/.travis.yml)). I was having problems with html-proofer matching URLs with a hyphen in them, and needed to use the `url_swap` configuration, which I thought was easier to configure in a Rakefile.

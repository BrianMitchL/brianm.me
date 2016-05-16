---
layout: post
title: Writing a Python Bot
slug: writing-a-python-bot
date: 2015-05-08
description: My experience with writing a Python based Twitter bot (for weather)
seo.type: BlogPosting
image:
excerpt: I have toyed with the idea of writing a Twitter bot for posting weather updates for a while now. I've had one or two conversations with friends about if a Twitter account reported the weather in vulgar ways. It seemed like an entertaining idea. With that sitting in my head for a few weeks I set out on what would be a now almost two month project (and still going), to write a Twitter bot that did just that (it's changed a little).
---

*Before I begin, you may wish to check out the source for weatherBot on [GitHub](https://github.com/bman4789/weatherBot), or my live Twitter bot running the latest version, [@MorrisMNWeather](https://twitter.com/MorrisMNWeather). I figured that at my 100th commit and my neglected "blog", I should write about weatherBot, so here it is.*

I have toyed with the idea of writing a Twitter bot for posting weather updates for a while now. I've had one or two conversations with friends about if a Twitter account reported the weather in vulgar ways. It seemed like an entertaining idea. With that sitting in my head for a few weeks I set out on what would be a now almost two month project (and still going), to write a Twitter bot that did just that (it's changed a little).

#Timeline

###March 12-15
I decided to use Python and Tweepy due to Google searching "how to make a Twitter bot." :stuck_out_tongue_closed_eyes: I had used Jython (Python built on top of Java) in an intro computer science class, but that was two years ago. I had always wanted to use Python again, so I decided why not now? I started off with a good old [hello world](https://github.com/bman4789/weatherBot/commit/c24200ad415f9367d3cbc94427cd08f84acd0468), and continued from there.

Over the next few days I added some vulgar tweets for special weather conditions, a loop so it would run forever, scheduled tweets, normal condition tweet templates, tweeting with location, forking the process to daemonize it, proper logging, reimplemented that logging, logging to a file, and a separate version for Python 3. This was all done over four days while I stayed up way to late over Spring Break. I thought I was pretty close to being done with the bot, but I was just getting started.

###March 16-29
Once I started the scheduled tweets on my Twitter account, I realized that dropping the f-bomb in nearly every tweet wasn't going to work. I re-worded all of the templates so that they were still sarcastic and amusing (at least some are, I hope), but for the most part free of swearing. My work on weatherBot slowed a little during this time. I tweaked thresholds and minor refactoring here and there, but the features remained the same.

###March 31-April 1
I merged the Python 2.7 and Python 3 files into one (see Python 2.7 vs 3 for more). I also added support for setting the units to be metric or imperial. During this time I also tried to fix the numerous crashes that were happening.

###April 2-14
I started to write some tests during this time. As a result of testing, a good amount of code got refactored in order to make it easier. I also changed a fair number of things to follow PEP 8 and started using [TravisCI](https://travis-ci.org/bman4789/weatherBot) and [Coveralls](https://coveralls.io/r/bman4789/weatherBot?branch=master). I narrowed down the crashes to be YQL returning JSON that wasn't properly formatted, but didn't yet fix my code to handle that.

###April 15-26
I finally fixed my exception handling and refactored the handling of the weather data, weatherBot was now actually (more) stable. I kept adding tests and refactored the twitter auth keys to be used via environmental variables.

###April 28-May 7
I started deploying weatherBot on Heroku and added some documentation about that. I also fixed my apparently broken environmental variables. I added a global variable for a hashtag, and a daily forecast every morning. I also refactored how timed and special events were triggered. Additional test writing happened too.

#Thoughts

Other than web development, this has been my first real project outside of a classroom or school setting. It has been exciting and refreshing to come back to something that is entirely my own where I'm not restricted by an assignment. I know that there are issues with several parts of weatherBot, but overall I'm happy with what I've created. When I started writing tests, I was a major refactor away from weatherBot's current state, and never expected to get to 80% code coverage (although I'm sure many tests are not ther most effective).

#Python 2.7 vs 3

I started writing the bot in Python 2.7 as that is what OS X has installed. I added a Python 3 version in order to learn about the new version and to support the latest and greatest. From using both versions, I quickly realized how good of a job the Python team did in cross version support. Python 3 was obviously known about for a long time, and Python 2.7 supports many older styles as well as the newer ones. The most notable things that come to mind are using `print "Hello world!` vs `print("Hello world!")` and catching exceptions (using 'as' or not). I know there are several libraries that allows a Python file to support both versions, but I figured that, with the relatively small size of my bot and the desire to keep it to a small footprint, I'd stick with my own if statements. As weatherBot stands today, it runs different code by checking  `if sys.version < '3':` or by excepting an ImportError for imports.

The largest annoyance in working with both versions at once was how they each handle unicode. For me, the issues all revolved around the degree (º) symbol. For Python 2.7 I have to decode it with utf-8 for it to work. With Python 3 it just works as everything uses utf-8. At first I used a separate file for each version of Python, but I learned very quickly that that was not the right way to handle it. I did the initial version conversion using 2to3. This worked very well aside from the urllib libraries used for fetching data from Yahoo's YQL service.

#Tools Used

I use Tweepy for using the Twitter API, Yahoo! Weather via YQL to get weather data, and python-daemon for easy daemonizing. I use Heroku to deploy my [@MorrisMNWeather](https://twitter.com/MorrisMNWeather) account. I had previously used my own server, but Heroku being always up and at a remote location won me over.
---
title: Moving to React Testing Library
modified: 2020-04-20
description: This post covers why using React Testing Library improves testing patterns and practices to your React component tests.
excerpt: I co-wrote a post about using React Testing Library for the C.H. Robinson Engineering Blog. I've been using React Testing Library for over a year now, but it's recently been enabled by default for new apps across the company. This post covers why we think this is a better approach for testing.
tags:
  - React
  - Testing
  - Cross-post
---

This is a cross-post with [Moving to React Testing Library](https://engineering.chrobinson.com/technology/moving-to-react-testing-library/) on the C.H. Robinson Engineering Blog, check out the full post there!

> At C.H. Robinson, we continuously strive to keep in line with industry and community best practices and patterns. React Testing Library has come to be the next generation standard for testing React applications. We made a change to our templates to use this and want to share why we think this is a better approach for testing.

Create React App and the ReactJS Documentation now recommend using React Testing Library. We recently changed our internal tooling to use React Testing Library for rendering components in tests for new applications. I've been using React Testing library since React hooks were released in February 2019 and found that it brings many benefits to testing. I've been advocating for teams to use React Testing Library and am thrilled to see it used as the new default.

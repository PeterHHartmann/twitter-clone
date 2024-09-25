---
layout: post
title: 'Getting Started'
date: 2023-01-25 21:21:25 +0100
---

## Requirements

- Nodejs Runtime Environment version 18.12.1 or [newer](https://nodejs.org/en/ 'Title').
  Check if Node is installed by executing the following command:
  {% highlight bash %}
  node --version
  {% endhighlight %}

- Installation or running container of Postgres version 14.6 or [higher](https://www.postgresql.org/)

- [Yarn](https://classic.yarnpkg.com/en/) installed globally:
  {% highlight bash %}
  npm install --global yarn
  {% endhighlight %}

## Installation

While this project is a mono-repository the frontend and backend have been split into seperate directories with their own respective package.json for managing dependencies. 
In order to run the project in development both the frontend and the backend server must have its dependencies installed and their server running.
Commands for installing and starting up each server are nearly identical and are executed while in their respective directories:

To install dependencies execute the following command:
{% highlight bash %}
yarn
{% endhighlight %}

Once dependencies are installed the frontend server can be started locally by executing the following command:
{% highlight bash %}
yarn dev
{% endhighlight %}

Additional scripts such as linting or running tests can by found in their respective package.json files.

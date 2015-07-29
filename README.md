# Tik Tok (DRAFT)

Tik Tok is a Javascript tool to easily create beautiful, mobile-friendly, vertical timelines.

[![Build Status](https://travis-ci.org/datanews/tik-tok.svg?branch=master)](https://travis-ci.org/datanews/tik-tok) [![Sauce Browser Test Status](https://saucelabs.com/buildstatus/tik-tok)](https://saucelabs.com/u/tik-tok)

## Install

The easiest way to get the code is to use [Bower](https://bower.io) or [npm](https://www.npmjs.com/); this will also get the **[Underscore](http://underscorejs.org/) and [Moment.js](http://momentjs.com/docs/) dependencies**.

    bower install tik-tok

or

    npm install tik-tok (coming soon)

You can also [download](https://github.com/datanews/tik-tok/archive/master.zip) the code from Github and separately download the dependencies.

## Include

Include the files on your page

    <!-- Optionally include the Lato font for headings. -->
    <link href="http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext" rel="stylesheet" type="text/css">

    <script src="moment.js"></script>
    <script src="underscore.js"></script>

    <link href="dist/tik-tok.css" rel="stylesheet" type="text/css">
    <script src="dist/tik-tok.js"></script>

The library also supports module loaders like RequireJS, AMD, or Browserify.

## Use

Tik Tok is simply a object your create and give it configuration:

    var t = new TikTok({
      el: 'example-tik-tok-container',
      entries: [ ... entries data here (see below) ... ]
    });

### Entries

Entry data should be either an array of objects or a CSV string with the following keys or column headings respectively.  The `date` field is the only absolutely necessary field, though, you probably want at least a title.

JSON example:

    {
      date: '2014-04-01', // String date, see format option below for what is supported.
      title: 'This is an awesome event',
      body: 'This is the optional main text',
      // Media should be a URL to an image or the embed URL.  This will automatically look
      // for the following types: Youtube, SoundCloud, general iframe/embed, or image
      media: 'http://url.com/to/image.png',
      source: 'This is a source line for your media',
      // Override the media type with this field (this is not usually needed).  Possible values:
      // youtube, soundcloud, soundcloud_large, embed, image
      type: embed
    }

CSV example:

    date,title,body,media,source
    2013-01-01,Great event,"Why not some <em>HTML</em>",,
    2013-01-01,Awesome event,"This has a comma, in it.",http://url.com/to/image.png,Cool image

The term "entry" is used instead of "event" as JS uses the term "event" for many things internally.

### Options

You can use the following options when defining a Tik Tok timeline:

* `el`: The ID string of the DOM element to put your Tik Tok container in.  This is required.  You can also use CSS selectors if you want.
* `dateFormat`: A string or array of strings that will be used to parse dates.  The default is: `['MMM DD, YYYY', 'MM/DD/YYYY', 'M/D/YYYY', 'DD MMM YYYY', 'YYYY-MM-DD']`.  For more details see the Moment.js [parsing docs](http://momentjs.com/docs/#/parsing/string-formats/).
* `dateDisplay`: A string for how the entry date will be displayed for each entry in the timeline.  See the docs [Moment.js formating](http://momentjs.com/docs/#/displaying/format/) for a complete list of options.  The default is `MMM DD, YYYY`.
* `descending`: Boolean that will make the order of entries descending (newest to oldest) by date if set to true.  The default is `false` which is ascending (oldest to newest).
* `csvDelimiter`: The delimiting chracter if you are using a CSV string.  The default is `,`.
* `csvQuote`: The quote chracter if you are using a CSV string.  The default is `"`.
* `groupBy`: Tik Tok will automatically group your entries depending on what kind of time they all span.  This may not be exactly what you want, so you can override it with this option.  Use one of the following values: `'hours', 'days', 'months', 'years', or 'decades'`.  Default is `undefined`.
* `keyMapping`: If you have entry data that is keyed differently, you can provide a basic object to convert when it is processed.  For instance:  
    ```
  {
    'needed-key': 'provided-key',
    'date': 'this is our crazy keyed date field'
  }
    ```
* `template`: If you want to override the HTML output of the timeline, use your own template.  See the `src/tik-tok.tpl.html` for a starting point.  You can provide a string that will be processed with [Underscore's template function](http://underscorejs.org/#template), or provide your own templating function.  The function will be passed the `groups` of entries, `_` (Underscore), the timeline `title`, and the whole `tiktok` object.

### Methods

* The `update` method will re-render the timeline.  This method takes the same `options` object as described above and will override any new options defined.  For example:  
    ```
  var t = new TikTok({
    el: 'example-tik-tok-container',
    entries: [ ... entries data here ... ]
  });

  // Change grouping type
  t.update({
    groupBy: 'months'
  });
    ```
* The `add` method will add an entry to the timeline and re-render.  This can take in an array of entries, a single object, or a CSV.  The second argument can be used to update any options (like the `update` method).  For example:  
    ```
  var t = new TikTok({
    el: 'example-tik-tok-container',
    entries: []
  });

  // Add entries
  t.add([
    { date: '1984-01-01', title: 'Dystopian future starts' },
    { date: '1984-01-02', title: 'Dystopian future a lot like last week' },
  ]);
    ```

## Development and contributing

Instructions on how to do development and make contributions to the project.

### Install and environment

Install dependencies.  All commands are assumed to be from the [Command Line](http://en.wikipedia.org/wiki/Command-line_interface) and from the root directory of the project (except for the initial getting of the code).

1. Install [Git](http://git-scm.com/).
    * On a Mac, install [Homebrew](http://brew.sh/) and run: `brew install git`
    * On common Linux systems: `apt-get install git-core`
1. Install [NodeJS](https://nodejs.org/) (io.js should work as well).
    * On a Mac: `brew install node`
    * On common Linux systems: `apt-get install nodejs`
1. Install [Gulp](http://gulpjs.com/) command line tool: `npm install gulp -g`
1. Install [Bower](http://bower.cio/) command line tool: `npm install bower -g`
1. Get the code (replace with your fork's repository URL) and enter into the code directory: `git clone https://github.com/datanews/tik-tok.git && cd tik-tok`
1. Install Node dependencies: `npm install`
1. Install Bower dependencies: `bower install`

### Development

Edit files in the `src` directory; these need to get built into the `dist` directory.  Use these handy Gulp tasks to ease in development:

* `gulp server`
    * Runs (and opens) a basic, local web server at port `8089`.
    * Automatically builds the source files when they are changes.
    * Runs [Livereload](http://livereload.com/) and will update the browser when changes are made.  Requires installation of the Livereload application or the browser extensions.
* `gulp watch`
    * Running tasks that automatically builds the source files when they are changes.  The `server` command does this as well.

### Build

After edits are made, run checks and tests and create build version with the following command.  Note that building will happen automatically with the above Development tasks.

    gulp

### Testing

Note that tests are run against the build (`dist`), not the source, and get run during the main build step, `gulp`.

* `gulp test`: Will run the tests through Node environment and will miss some browser based tests.  This will get run automatically when running `gulp server`.
* `gulp browser-test`: Will run tests in given browsers.  By default, this will just run the tests in a PhantomJS and Chrome browser through Karma.
    * Multiple cross-browser testing is done with the [Sauce Labs](https://saucelabs.com/) service.  To run this locally, you will need a Sauce Labs account, and you will need to set the `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` environment variables.  There's a [handy copy and paste tool](https://docs.saucelabs.com/tutorials/node-js/) at this page if you already have an account.

### Continuous integration

Test are run automatically on each push with [Travis CI](https://travis-ci.org/).  This will not run the cross-browser tests in Sauce Labs as these seem to timeout or otherwise fail in ways that we have no control over.

### Release

(TODO)

### Code style and quality

Use the following to get your development environment setup.  Having consistent code style leads to smoother contributions, easier reviewing, and better and more stable code.

1. Install an [Editorconfig plugin for your favorite code editor](http://editorconfig.org/#download).
    * [Editorconfig](http://editorconfig.org/) helps to standardize editor settings like indent spacing.
1. (optinal) Install a [JSCS plugin for your favorite code editor](http://jscs.info/overview.html).
    * [JSCS](http://jscs.info/) is a JS code style enforcer.
    * This is optional since the main build task will run this.
1. (optional) Install a [JSHint plugin for your favorite code editor](http://jshint.com/install/)
    * [JSHint](http://jshint.com/) is a JS error detection tool.
    * This is optional since the main build task will run this.

### Project page

The main project page is hosted on Github Pages through this repository.

We want to include the Bower dependencies in this branch, so this is a helpful command to make that all happen at once (assuming `master` is up to date).

* `git checkout gh-pages && git merge master && bower install && git add bower_components -f && git commit -m "Adding bower dependencies for project page" && git push origin gh-pages && git checkout master && bower install`
* If you are not updating the Bower dependencies: `git checkout gh-pages && git merge master && git push origin gh-pages && git checkout master && bower install`

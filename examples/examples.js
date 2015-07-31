/* global hljs:false, Egg:false, $:false */

/**
 * JS specific to the examples.
 */
 'use strict';

(function() {
  // Determine path to examples
  var examplesPath = (window.location.pathname.match(/^\/examples\//gi)) ?
    './' : './examples/';

  // Get example HTML output
  var html = $('<div>').append($('.example-html').clone()).html()
    .replace(/\s+\n/gi, '\n')
    .replace(/^    /gm, '');
  $('.example-html-output pre code').text(html);

  // Need to do things when all is ready
  $(document).ready(function() {
    // Get example JS output
    var js = $('#example-javascript').html();
    if (js && js.trim && js.trim()) {
      js = js.trim().replace(/\s+\n/gi, '\n').replace(/^      /gm, '');
      $('.example-javascript-output').show();
      $('.example-javascript-output pre code').text(js);
    }

    // Get example CSS output
    var css = $('#example-css').html();
    if (css && css.trim && css.trim()) {
      css = css.trim().replace(/\s+\n/gi, '\n').replace(/^      /gm, '');
      $('.example-css-output').show();
      $('.example-css-output pre code').text(css);
    }

    // Load highlightJS
    hljs.initHighlightingOnLoad();
  });

  // Egg$ all around
  var egg = new Egg();
  var tikTok = true;
  var orig = {};
  egg.addCode([52, 52, 52], function() {
    if (tikTok) {
      $('#tik-tok-image').attr('src', examplesPath + 'images/tik-tok-replacement.png');
      $('.menu ul li img').attr('src', examplesPath + 'images/tik-tok-head-100-replacement.png');
      $('.tik-tok-container, .tik-tok-container .tt-spine-bottom').css({
        'background-image': 'url(' + examplesPath + 'images/tik-tok-bg-replacement.jpg)',
        'backgroun-position': 'top left'
      });
      $('.tik-tok-container .tt-entry').css('background');
      $('.tik-tok-container .tt-entry').css('background', 'rgba(255, 255, 255, 0.9)');
      $('*').each(function() {
        var $this = $(this);
        if (!$this.html().match(/<|>/g)) {
          $this.html($this.html().replace(/s/gi, '$'));
        }
      });

      $('.tik-tok-container img').each(function() {
        $(this).data('orig-src', $(this).attr('src'));
        $(this).attr('src', examplesPath + 'images/tik-tok-main-replacement-01.jpg');
      });

      $('.tik-tok-container iframe').each(function() {
        $(this).data('orig-src', $(this).attr('src'));
        $(this).attr('src', 'https://www.youtube.com/embed/iP6XpLQM2Cs');
      });
    }
    else {
      $('#tik-tok-image').attr('src', examplesPath + 'images/tik-tok-medium.png');
      $('.menu ul li img').attr('src', examplesPath + 'images/tik-tok-head-right-grey-100.png');
      $('.tik-tok-container, .tik-tok-container .tt-spine-bottom').css('background-image', 'none');
      $('.tik-tok-container .tt-entry').css('background', orig.entryBG);
      $('*').each(function() {
        var $this = $(this);
        if (!$this.html().match(/<|>/g)) {
          $this.html($this.html().replace(/\$/gi, 's'));
        }
      });

      $('.tik-tok-container img').each(function() {
        $(this).attr('src', $(this).data('orig-src'));
      });

      $('.tik-tok-container iframe').each(function() {
        $(this).attr('src', $(this).data('orig-src'));
      });
    }

    tikTok = !tikTok;
  }).listen();
})();

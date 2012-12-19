impress-console
===============

.. image:: https://github.com/regebro/impress-console/raw/master/screenshot_thumb.png
   :align: right
   :target: https://github.com/regebro/impress-console/raw/master/screenshot.png

This module provides a speaker console for impress.js. It shows speaker notes,
a small view of the current slide, a preview of the next slide in order,
a clock and a resettable timer.

This started as an update of David Souther's notes.js, but is now not longer
recognizable as such, but some parts of his code may remain.

Usage
=====

To use it put impressConsole.js in the js directory under your presentation, and
put impressConsole.css in the css directory under your presentation. The
console will look for css/impressConsole.css, so you need to locate it there.

Then add the following to the bottom of your presentation HTML::

    <script src="js/impressNotes.js"></script>
    
And add this to the script where you call impress.init()::

    notes().init();

You can then open the speaker window with the <P> key. You can also open it automatically with::

    notes().open();


All in all, the impress.js initialization at the end of the file hence should look something like this::

    <script src="js/impress.js"></script>
    <script src="js/impressConsole.js"></script>
    <script>
        impress().init();
        console().init();
        console().open(); // If you want them to open automatically
    </script>

The timer at the bottom of the screen starts automatically, and will reset if you click on it.

Advanced Usage
==============

The default css file location is ``css/impressConsole.css``, but you can now pass in a css parameter to
``init()`` to change this::

    console().init(css="/path/to/my.css");

Credits
=======

* Lennart Regebro, regebro@gmail.com

* David Souther, davidsouther@gmail.com, author of the original notes.js

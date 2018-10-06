impress-console is now a part of impress.js
===========================================

Further development is done at https://github.com/impress/impress.js/
This repository will remain here for backwards compatibility.


impress-console
===============

.. image:: https://github.com/regebro/impress-console/raw/master/screenshot_thumb.png
   :align: right
   :target: https://github.com/regebro/impress-console/raw/master/screenshot.png

This module provides a speaker console for impress.js. It shows speaker
notes, a small view of the current slide, a preview of the next slide in
order, a clock and a resettable timer.

This started as an update of David Souther's notes.js, but is now not longer
recognizable as such, but some parts of his code may remain.

It can be seen in action at http://regebro.github.io/hovercraft/


Usage
=====

To use it put impressConsole.js in the js directory under your presentation,
and put impressConsole.css in the css directory under your presentation. The
console will look for css/impressConsole.css, so you need to locate it there.

Then add the following to the bottom of your presentation HTML::

    <script src="js/impressConsole.js"></script>

And add this to the script where you call impress.init()::

    impressConsole().init();

You can then open the speaker window with the <P> key. You can also open it
automatically with::

    impressConsole().open();


All in all, the impress.js initialization at the end of the file hence should
look something like this::

    <script src="js/impress.js"></script>
    <script src="js/impressConsole.js"></script>
    <script>
        impress().init();
        impressConsole().init();
        impressConsole().open(); // If you want them to open automatically
    </script>

The timer at the bottom of the screen starts automatically, and will reset if
you click on it.


Adding notes
============

You add presenter notes to your impress.js presentation by simply
adding a <div class="notes">The notes go here</div> to any
step/slide that you want to have notes. The contents of that <div>
will be picked up by the console.

You will also need to hide these notes with CSS in the main presentation.
You can for example include the following rule in your CSS::

   .step .notes {
     display: none;
   }


Navigation
==========

The main key to move "forward" is <space>. It will move to the next slide,
unless there is more text in the Notes window than can be displayed without
scrolling. If there is, it will instead scroll down one page.

<right>, <down> and <page down> will move to the next slide, even when the
text needs scrolling. <left>, <up> and <page up> will move to the previous
<slide.

<g> Will ask for a slide number and then move to that slide.

The preview is based on the assumption that the presentation is linear and
that the next slide is well, the next slide. If it isn't and you move around
the presentation by clicking with the mouse, then the preview will not be
very useful, for obvious reasons.


Advanced Usage
==============

The default css file location is ``css/impressConsole.css``, but you can now
pass in a css parameter to ``init()`` to change this::

    impressConsole().init(css="/path/to/my.css");

You can also add special css that will only affect the presentation previews.
This is only necessary if you for some reason need to have different styles in
the previews and the actual presentation.

    impressConsole().init(cssPreview="/path/to/myPreview.css");

You can now also easily register extra key-events with the
``registerKeyEvent()`` function. This is just a convenience method, but it is
convenient. The function takes three parameters, of which the last one is
optional, the first is a list of key values that should trigger the event,
the second is the function that should be called, and the third is the window
the even should be bound to. This defaults to the console window.

This code will make the <N> key (value 78) call the showSlideNumbers function
for both the console window and the main window::

      impressConsole().registerKeyEvent([78], showSlideNumbers);
      impressConsole().registerKeyEvent([78], showSlideNumbers, window);


Credits
=======

* Alberto Sartori and Frederik Möllers for additions to what became 1.4.

* Heiko Richler, Aico.Richler@gmx.net, major changes in rev. 1.3

* Lennart Regebro, regebro@gmail.com, main author of impressConsole

* David Souther, davidsouther@gmail.com, author of the original notes.js

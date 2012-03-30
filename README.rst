impressNotes.js
===============

This file provides a window with speaker notes for impress.js.

This is a rewrite of David Souther's notes.js to OO JavaScript, compatibility


To use it you add the following to the bottom of your presentation HTML::

    <script src="js/impressNotes.js"></script>
    <script>
        notes().init();
    </script>

You can then open the speaker window with the N key. You can also open it automatically with::

    notes().open();


All in all, the impress.js initialization at the end of the file hence should look something like this::

    <script src="js/impress.js"></script>
    <script src="js/impressNotes.js"></script>
    <script>
        impress().init();
        notes().init();
        notes().open();
    </script>

Credits
=======

* David Souther, davidsouther@gmail.com, author of the original notes.js

* Lennart Regebro, regebro@gmail.com, author of impressNotes.js

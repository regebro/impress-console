/**
 * impress.js notes
 *
 * Adds support for inline speaker notes.
 *
 * MIT Licensed.
 *
 * Copyright 2012 David Souther (davidsouther@gmail.com), Lennart Regebro, regebro@gmail.com
 *
 * This is a rewrite of David Souther's notes.js to OO JS and compatibility with impress.js 0.5.
 * 
 */

(function ( document, window ) {
    'use strict';

    // This is the default template for the speaker notes window
    var notesTemplate = document.getElementById('impress-notes-template') ?
        document.byId('notesTemplate').innerHTML :
        '<div id="notes"></div>' +
          '<div class="controls"> ' +
            '<a href="#" onclick="impress().prev(); return false;" />Prev</a>' +
            '<a href="#" onclick="impress().next(); return false;" />Next</a>' +
          '</div>';
        '</div>';

    // helper methods
    
    var byId = function ( id ) {
        return document.getElementById(id);
    };
    
    // note object

    var notes = window.notes = function (rootId) {

        rootId = rootId || "impress";
        // root presentation elements
        var root = byId( rootId );
        
        var notesWindow = null;
        
        // Replace the HTML
        var onStepEnter = function(){
            if(notesWindow) {
                var newNotes = document.querySelector('.active .notes');
                if (newNotes) {
                    newNotes = newNotes.innerHTML;
                } else {
                    newNotes = "No notes for this step";
                }
              
                notesWindow.document.getElementById('notes').innerHTML = newNotes;
            }
        };

        var open = function() {
            if (notesWindow && !notesWindow.closed) {
                notesWindow.focus();
            } else {
                notesWindow = window.open();
                notesWindow.document.title = "Speaker Notes (" + document.title + ")";
                notesWindow.impress = window.impress;
                notesWindow.document.body.innerHTML = notesTemplate;
                onStepEnter();
            }
        };
        
        var init = function() {
            // Register the event
            root.addEventListener("impress:stepenter", onStepEnter)
            
            //When the window closes, clean up after ourselves.
            window.onunload = function(){
                notesWindow && !notesWindow.closed && notesWindow.close();
            };
            
            //Open speaker notes when they press 'n'
            document.addEventListener("keyup", function ( event ) {
                if ( event.keyCode === 78 ) {
                    open();
                }
            }, false);
            
        }
        
        return {init: init, open: open}
        
    }
    
})(document, window);


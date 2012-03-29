/**
 * impressNotes.js
 *
 * Adds support for inline speaker notes to impress.js
 *
 * MIT Licensed.
 *
 * Copyright 2012 David Souther (davidsouther@gmail.com), Lennart Regebro (regebro@gmail.com)
 *
 *  version: 0.1
 * 
 */

(function ( document, window ) {
    'use strict';

    // This is the default template for the speaker notes window
    var notesTemplate = '<!DOCTYPE html>' + 
        '<html><head>' + 
          '<link rel="stylesheet" type="text/css" media="screen" href="css/impressNotes.css">' +
        '</head><body>' + 
        '<div id="notes"></div>' +
          '<div class="controls"> ' +
            '<a href="#" onclick="impress().prev(); return false;" />Prev</a>' +
            '<a href="#" onclick="impress().next(); return false;" />Next</a>' +
          '</div>' +
        '</div>' +
        '</body></html>';

    // All notes windows, so that you can call notes() repeatedly.
    var allNotes = {};

    // The notes object
    var notes = window.notes = function (rootId) {

        rootId = rootId || "impress";
        
        if (allNotes[rootId]) {
            return allNotes[rootId];
        }
        
        // root presentation elements
        var root = document.getElementById( rootId );
        
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
                notesWindow.document.open();
                notesWindow.document.write(notesTemplate);
                notesWindow.document.title = "Speaker Notes (" + document.title + ")";
                notesWindow.impress = window.impress;
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
        
        return allNotes[rootId] = {init: init, open: open}
        
    }
    
})(document, window);


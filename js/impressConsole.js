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
        '<div id="console">' +
          '<div id="views">' +
            '<iframe id="slideView" scrolling="no"></iframe>' +
            '<iframe id="preView" scrolling="no"></iframe>' +
            '<div id="blocker"></div>' + 
          '</div>' +
          '<div id="notes"></div>' +
        '</div>' +
        '<div id="controls"> ' +
          '<div id="prev"><a  href="#" onclick="impress().prev(); return false;" />Prev</a></div>' +
          '<div id="next"><a  href="#" onclick="impress().next(); return false;" />Next</a></div>' +
          '<div id="clock">00:00:00 AM</div>' +
          '<div id="timer" onclick="timerReset()">00m 00s</div>' +
        '</div>' +
        '</body></html>';

    // All notes windows, so that you can call notes() repeatedly.
    var allNotes = {};
    
    var useAMPM = false;
    
    // Zero padding helper function:
    function zeroPad(i) {
        return (i < 10 ? '0' : '') + i
    }
    

    // The notes object
    var notes = window.notes = function (rootId) {

        rootId = rootId || 'impress';
        
        if (allNotes[rootId]) {
            return allNotes[rootId];
        }
        
        // root presentation elements
        var root = document.getElementById( rootId );
        
        var notesWindow = null;
        
        // Sync the notes to the step
        var onStepLeave = function(){
            if(notesWindow) {
                // Set notes to next steps notes.
                // This may in certain cases be the wrong notes, as you may go through
                // steps in arbitrary orders, for example backwards.
                var nextSlideNo = parseInt(document.URL.substring(document.URL.search('/step-')+6), 10) + 1;
                var newNotes = document.querySelector('#step-' + nextSlideNo + ' .notes');
                if (newNotes) {
                    newNotes = newNotes.innerHTML;
                } else {
                    newNotes = 'No notes for this step';
                }
                notesWindow.document.getElementById('notes').innerHTML = newNotes;
            }
        };

        // Sync the previews to the step
        var onStepEnter = function(){
            if(notesWindow) {
                // Set notes again. This is to make sure they are the current notes, even
                // when you aren't going through them in the "wrong" order.
                var newNotes = document.querySelector('.active .notes');
                if (newNotes) {
                    newNotes = newNotes.innerHTML;
                } else {
                    newNotes = 'No notes for this step';
                }
                notesWindow.document.getElementById('notes').innerHTML = newNotes;
            
                notesWindow.document.getElementById('slideView').src = document.URL;
                var nextSlideNo = parseInt(document.URL.substring(document.URL.search('/step-')+6), 10) + 1;
                var nextSlide = document.URL.substring(0, document.URL.search('/step-')+6);
                notesWindow.document.getElementById('preView').src = nextSlide + nextSlideNo;
            }
        };

        var timerReset = function () {
            notesWindow.timerStart = new Date();
        }
        
        // Show a clock
        var clockTick = function () {
            var now = new Date();
            var hours = now.getHours();
            var minutes = now.getMinutes();
            var seconds = now.getSeconds();
            var ampm = '';
        
            if (useAMPM) {
                ampm = ( hours < 12 ) ? 'AM' : 'PM';
                hours = ( hours > 12 ) ? hours - 12 : hours;
                hours = ( hours == 0 ) ? 12 : hours;
            }
          
            // Clock
            var clockStr = zeroPad(hours) + ':' + zeroPad(minutes) + ':' + zeroPad(seconds) + ' ' + ampm;
            notesWindow.document.getElementById('clock').firstChild.nodeValue = clockStr;
            
            // Timer
            seconds = Math.floor((now - notesWindow.timerStart) / 1000);
            minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            notesWindow.document.getElementById('timer').firstChild.nodeValue = zeroPad(minutes) + 'm ' + zeroPad(seconds) + 's';
        }

        var open = function() {
            if(top.isNotesWindow){ 
                return;
            }
            
            if (notesWindow && !notesWindow.closed) {
                notesWindow.focus();
            } else {
                notesWindow = window.open();
                // This sets the window location to the main window location, so css can be loaded:
                notesWindow.document.open();
                // Write the template:
                notesWindow.document.write(notesTemplate);
                notesWindow.document.title = 'Speaker Notes (' + document.title + ')';
                notesWindow.impress = window.impress;
                // We set this flag so we can detect it later, to prevent infinite popups.
                notesWindow.isNotesWindow = true;
                // Add clock tick
                notesWindow.timerStart = new Date();
                notesWindow.timerReset = timerReset;
                notesWindow.clockInterval = setInterval('notes("' + rootId + '").clockTick()', 1000 );
                // Cleanup
                notesWindow.onbeforeunload = function() {
                    // I don't know why onunload doesn't work here.
                    clearInterval(notesWindow.clockInterval);
                };
                // Show the current slide
                onStepLeave();
                onStepEnter();
            }
        };
        
        var init = function() {
            // Register the event
            root.addEventListener('impress:stepleave', onStepLeave)
            root.addEventListener('impress:stepenter', onStepEnter)
            
            //When the window closes, clean up after ourselves.
            window.onunload = function(){
                notesWindow && !notesWindow.closed && notesWindow.close();
            };
            
            //Open speaker notes when they press 'n'
            document.addEventListener('keyup', function ( event ) {
                if ( event.keyCode === 78 ) {
                    open();
                }
            }, false);
            
        }
                
        // Return the object        
        return allNotes[rootId] = {init: init, open: open, clockTick: clockTick}
        
    }
    
})(document, window);


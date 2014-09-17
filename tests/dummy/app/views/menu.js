import Ember from 'ember';

export default Ember.View.extend({

    didInsertElement: function() {
        Ember.$( document ).on( 'keypress.menu', function( e ) {
            if ( e.charCode >= 49 && e.charCode <= 57 ) {
                var keypressed = e.charCode - 48;
                this.get( 'controller.keyHandler' ).childSelection( keypressed );
            } else if ( e.charCode === 45 ) {
                this.get( 'controller.keyHandler' ).drillDown( '-' );
            } else if ( e.charCode === 48 ) {
                this.get( 'controller.keyHandler' ).showAll();
            }
        }.bind( this ));

        // keypress doesn't appear to catch escape or tab key
        Ember.$( document ).on( 'keyup.menu', function( e ) {
            if ( e.keyCode === 27 ) {
                this.get( 'controller.keyHandler' ).closeAll();
            } else if ( e.shiftKey && e.keyCode === 72 ) { //9 tab  72 h
                this.get( 'controller.keyHandler' ).cycleRootSelectionPrevious();
            } else if ( e.keyCode === 72 ) { //9 tab  72 h
                this.get( 'controller.keyHandler' ).cycleRootSelectionNext();
            }

        }.bind( this ));
    },

    willDestroyElement: function() {
        Ember.$( document ).off( 'keypress.menu' ).off( 'keyup.menu' );
    }

});

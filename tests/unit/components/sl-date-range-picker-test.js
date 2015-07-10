import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent( 'sl-date-range-picker', 'Unit | Component | sl date range picker', {
    needs: [
        'component:sl-date-picker'
    ],
    unit: true
});

var convertDateToUTC = function( date ) {
    return new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    );
};

test( 'Default classNames are present', function( assert ) {
    this.subject();

    assert.ok(
        this.$().hasClass( 'sl-date-range-picker' ),
        'Default rendered component has class "sl-date-range-picker"'
    );
});

test( 'Change focus to end date input upon start date change', function( assert ) {
    assert.expect( 1 );

    this.subject();

    this.$( '.sl-daterange-end-date input' ).on( 'focus', () => {
        assert.ok( true, 'End date input receives focus upon start date change' );
    });

    Ember.run( () => {
        this.$( '.sl-daterange-start-date input' ).trigger( 'change' );
    });
});

test( 'Earliest end date is the based on min date and start date', function( assert ) {
    let component = this.subject();

    assert.strictEqual(
        component.get( 'earliestEndDate' ),
        null
    );

    component.set( 'minDate', '01/01/2001' );

    assert.equal(
        component.get( 'earliestEndDate' ),
        '01/01/2001'
    );

    component.set( 'startDateValue', '01/01/2015' );

    assert.equal(
        component.get( 'earliestEndDate' ),
        '01/01/2015'
    );
});

test( 'Latest start date is the based on max date and end date', function( assert ) {
    let component = this.subject();

    assert.strictEqual(
        component.get( 'latestStartDate' ),
        null
    );

    component.set( 'maxDate', '01/01/2029' );

    assert.equal(
        component.get( 'latestStartDate' ),
        '01/01/2029'
    );

    component.set( 'endDateValue', '01/01/2015' );

    assert.equal(
        component.get( 'latestStartDate' ),
        '01/01/2015'
    );
});

test( 'Events from start date input are removed upon willClearRender', function( assert ) {
    let component = this.subject();
    let startDateInput = this.$( '.sl-daterange-start-date input' )[0];

    assert.equal(
        Ember.typeOf( $._data( startDateInput, 'events' ).change ),
        'array',
        'Start date input has change event listener after render'
    );

    component.trigger( 'willClearRender' );

    assert.strictEqual(
        $._data( startDateInput, 'events' ),
        undefined,
        'Start date input has no event listeners after willClearRender'
    );
});

test( 'label, startDatePlaceholder, and endDatePlaceholder are undefined by default', function( assert ) {
    let component = this.subject();

    assert.strictEqual(
        component.get( 'label' ),
        undefined,
        'label is undefined by default'
    );

    assert.strictEqual(
        this.$( 'label' )[0],
        undefined,
        'No label is created when label is undefined'
    );

    assert.strictEqual(
        component.get( 'startDatePlaceholder' ),
        undefined,
        'startDatePlaceholder is undefined by default'
    );

    assert.strictEqual(
        this.$( '.sl-daterange-start-date input' ).prop( 'placeholder' ),
        '',
        'Start date input placeholder is empty when startDatePlaceholder is undefined'
    );

    assert.strictEqual(
        component.get( 'endDatePlaceholder' ),
        undefined,
        'endDatePlaceholder is undefined by default'
    );

    assert.strictEqual(
        this.$( '.sl-daterange-end-date input' ).prop( 'placeholder' ),
        '',
        'End date input placeholder is empty when endDatePlaceholder is undefined'
    );
});

test( 'label is accepted as a parameter', function( assert ) {
    let labelText = 'lorem ipsum';
    let component = this.subject({ label: labelText });

    assert.equal(
        this.$( 'label' ).html(),
        labelText,
        'label element was created with label parameter text'
    );

    assert.equal(
        this.$( 'label' ).prop( 'for' ),
        component.get( 'inputElementId' ),
        'label element has the correct for property'
    );

    assert.equal(
        this.$( 'label' ).prop( 'for' ),
        this.$( '.sl-daterange-start-date input' ).prop( 'id' ),
        'label is used for start date input'
    );
});

test( 'startDatePlaceholder is accepted as a parameter', function( assert ) {
    let placeholderText = 'lorem ipsum';
    let component = this.subject({ startDatePlaceholder: placeholderText });

    assert.equal(
        this.$( '.sl-daterange-start-date input' ).prop( 'placeholder' ),
        placeholderText,
        'Start date input placeholder was passed through correctly'
    );
});

test( 'endDatePlaceholder is accepted as a parameter', function( assert ) {
    let placeholderText = 'lorem ipsum';
    let component = this.subject({ endDatePlaceholder: placeholderText });

    assert.equal(
        this.$( '.sl-daterange-end-date input' ).prop( 'placeholder' ),
        placeholderText,
        'End date input placeholder was passed through correctly'
    );
});

test( 'Default format gets passed to child date pickers', function( assert ) {
    let component = this.subject();

    assert.equal(
        this.$( '.sl-daterange-start-date input.date-picker' ).data().datepicker.o.format,
        component.get( 'format' ),
        'Default format gets passed to start date picker'
    );

    assert.equal(
        this.$( '.sl-daterange-end-date input.date-picker' ).data().datepicker.o.format,
        component.get( 'format' ),
        'Default format gets passed to end date picker'
    );
});

test( 'Format parameter gets passed to child date pickers', function( assert ) {
    let format = 'yyyy/mm/dd';
    let component = this.subject({ format: format });

    assert.equal(
        this.$( '.sl-daterange-start-date input.date-picker' ).data().datepicker.o.format,
        format,
        'Format parameter gets passed to start date picker'
    );

    assert.equal(
        this.$( '.sl-daterange-end-date input.date-picker' ).data().datepicker.o.format,
        format,
        'Format parameter gets passed to end date picker'
    );
});

test( 'Date pickers have unbound start and end dates by default', function( assert ) {
    let component = this.subject();

    assert.equal(
        this.$( '.sl-daterange-start-date input.date-picker' ).data().datepicker.o.startDate,
        -Infinity,
        'Start date picker start date is unboundt'
    );

    assert.equal(
        this.$( '.sl-daterange-start-date input.date-picker' ).data().datepicker.o.endDate,
        Infinity,
        'Start date picker end date is unbound'
    );

    assert.equal(
        this.$( '.sl-daterange-end-date input.date-picker' ).data().datepicker.o.startDate,
        -Infinity,
        'End date picker start date is unbound'
    );

    assert.equal(
        this.$( '.sl-daterange-end-date input.date-picker' ).data().datepicker.o.endDate,
        Infinity,
        'End date picker end date is unbound'
    );
});

test( 'Date pickers respects minDate', function( assert ) {
    let minDate = new Date( '01/01/2009' );
    let component = this.subject({
        minDate: minDate
    });

    assert.equal(
        convertDateToUTC( this.$( '.sl-daterange-start-date input.date-picker' ).data().datepicker.o.startDate ).getTime(),
        minDate.getTime(),
        'Start date picker respects minDate'
    );

    assert.equal(
        convertDateToUTC( this.$( '.sl-daterange-end-date input.date-picker' ).data().datepicker.o.startDate ).getTime(),
        minDate.getTime(),
        'End date picker respects minDate'
    );
});

test( 'Date pickers respects maxDate', function( assert ) {
    let maxDate = new Date( '01/01/2009' );
    let component = this.subject({
        maxDate: maxDate
    });

    assert.equal(
        convertDateToUTC( this.$( '.sl-daterange-start-date input.date-picker' ).data().datepicker.o.endDate ).getTime(),
        maxDate.getTime(),
        'Start date picker respects maxDate'
    );

    assert.equal(
        convertDateToUTC( this.$( '.sl-daterange-end-date input.date-picker' ).data().datepicker.o.endDate ).getTime(),
        maxDate.getTime(),
        'End date picker respects maxDate'
    );
});

test( 'End date picker respects startDateValue over minDate due to earliestEndDate', function( assert ) {
    let minDate = new Date( '01/01/2009' );
    let startDateValue = new Date( '05/05/2015' );
    let component = this.subject({
        minDate: minDate,
        startDateValue: startDateValue
    });

    assert.equal(
        convertDateToUTC( this.$( '.sl-daterange-end-date input.date-picker' ).data().datepicker.o.startDate ).getTime(),
        startDateValue.getTime(),
        'End date picker respects startDateValue'
    );
});

test( 'Start date picker respects endDateValue over maxDate due to latestStartDate', function( assert ) {
    let maxDate = new Date( '01/01/2009' );
    let endDateValue = new Date( '05/05/2005' );
    let component = this.subject({
        maxDate: maxDate,
        endDateValue: endDateValue
    });

    assert.equal(
        convertDateToUTC( this.$( '.sl-daterange-start-date input.date-picker' ).data().datepicker.o.endDate ).getTime(),
        endDateValue.getTime(),
        'Start date picker respects endDateValue'
    );
});
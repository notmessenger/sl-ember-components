import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent( 'sl-drop-button', 'Integration | Component | sl drop button', {
    integration: true
});

test( 'Default rendered state', function( assert ) {
    this.render( hbs`
        {{sl-drop-button}}
    ` );

    assert.ok(
        this.$( '>:first-child' ).hasClass( 'sl-ember-components-drop-button' ),
        'Has class "sl-ember-components-drop-button"'
    );

    assert.ok(
        this.$( '>:first-child' ).hasClass( 'btn-group' ),
        'Has class "btn-group"'
    );

    assert.ok(
        this.$( '>:first-child' ).find( 'button' ).hasClass( 'dropdown-toggle' ),
        'Has class "dropdown-toggle"'
    );

    assert.ok(
        this.$( '>:first-child' ).find( 'button' ).hasClass( 'btn-default' ),
        'Button has class "btn-default"'
    );

    assert.ok(
        this.$( '>:first-child' ).find( 'ul' ).hasClass( 'dropdown-menu' ),
        'Has class "dropdown-menu"'
    );

    assert.strictEqual(
        this.$( '>:first-child' ).find( 'ul' ).attr( 'role' ),
        'menu',
        'ARIA role is properly set to "menu"'
    );
});

test( 'Theme property applies theme class', function( assert ) {
    this.render( hbs`
        {{sl-drop-button theme="hover"}}
    ` );

    assert.ok(
        this.$( '>:first-child' ).find( 'button' ).hasClass( 'btn-hover' ),
        'Rendered drop-button has new theme class'
    );
});

test( 'Label property is supported', function( assert ) {
    this.render( hbs`
        {{sl-drop-button label="test"}}
    ` );

    assert.strictEqual(
        this.$( '>:first-child' ).text().trim(),
        'test',
        '"label" property is rendered correctly'
    );
});

test( 'size property is supported', function( assert ) {
    this.render( hbs`
        {{sl-drop-button size="large"}}
    ` );

    assert.ok(
        this.$( '>:first-child' ).find( 'button' ).hasClass( 'btn-lg' ),
        '"size" property renders expected class "btn-lg"'
    );
});

test( 'align property is supported', function( assert ) {
    this.render( hbs`
        {{sl-drop-button align="right"}}
    ` );

    assert.ok(
        this.$( '>:first-child' ).find( 'ul' ).hasClass( 'dropdown-menu-right' ),
        '"align" property renders expected class "dropdown-menu-right"'
    );
});

test( 'Icon class property is supported', function( assert ) {
    this.render( hbs`
        {{sl-drop-button label="test"}}
    ` );

    assert.strictEqual(
        this.$( '>:first-child' ).find( 'span.sl-icon-dropdown' ).length,
        1,
        'Default rendered component includes sl-icon-dropdown icon span'
    );

    this.render( hbs`
        {{sl-drop-button label="test" iconClass="test"}}
    ` );

    assert.strictEqual(
        this.$( '>:first-child' ).find( 'span.test' ).length,
        1,
        'Rendered component includes test icon span'
    );
});

test( 'label is set properly on "sl-drop-option"', function( assert ) {
    this.render( hbs`
        {{#sl-drop-button label="test"}}
            {{sl-drop-option label="red"}}
        {{/sl-drop-button}}
    ` );

    assert.strictEqual(
        this.$( '>:first-child' ).find( 'ul' ).text().trim(),
        'red',
        '"sl-drop-option" sets label properly'
    );
});

test( 'Content is yielded when label is not set', function( assert ) {
    this.render( hbs`
        {{#sl-drop-button}}
           <div class="test"></div>
        {{/sl-drop-button}}`
    );

    assert.strictEqual(
        this.$( '>:first-child' ).find( '.test' ).length,
        1
    );
});

test( 'sl-drop-option label is supported', function( assert ) {
    const testContent = {
        label : 'test'
    };

    this.set( 'content', [ testContent ] );

    this.render( hbs`
        {{sl-drop-button content=content}}
    ` );

    assert.strictEqual(
        this.$( '>:first-child' ).find( 'ul' ).text().trim(),
        'test',
        '"label" property on sl-drop-option is supported'
    );
});

test( 'Click action triggers bound action', function( assert ) {
    assert.expect( 1 );

    const done = assert.async();

    this.render( hbs`
        {{#sl-drop-button}}
            {{sl-drop-option action="testAction" label="red"}}
        {{/sl-drop-button}}
    ` );

    this.on( 'testAction', () => {
        assert.ok(
            true,
            'The test action was called'
        );

        done();
    });

    this.$( '>:first-child' ).find( 'a' ).click();
});

test( 'Tooltip properties are set correctly when title parameter is set', function( assert ) {
    const title = 'test title';

    this.set( 'title', title );

    this.render( hbs`
        {{#sl-alert title=title}}
            Default info alert
        {{/sl-alert}}
    ` );

    const data = this.$( '>:first-child' ).data();
    const tooltipData = data[ 'bs.tooltip' ];
    const options = tooltipData.getOptions();

    assert.strictEqual(
        tooltipData.enabled,
        true,
        'tooltip is enabled'
    );

    assert.strictEqual(
        tooltipData.getTitle(),
        title,
        'Title text is set correctly'
    );

    assert.strictEqual(
        options.trigger,
        'hover focus',
        'Default trigger is "hover focus"'
    );
});

test( 'Popover properties are set correctly when popover parameter is set', function( assert ) {
    const title = 'test title';
    const popover = 'popover text';

    this.set( 'title', title );
    this.set( 'popover', popover );

    this.render( hbs`
        {{#sl-alert popover=popover}}
            Default info alert
        {{/sl-alert}}
    ` );

    let data = this.$( '>:first-child' ).data();
    let popoverData = data[ 'bs.popover' ];

    assert.strictEqual(
        popoverData.enabled,
        true,
        'Popover is enabled'
    );

    this.render( hbs`
        {{#sl-alert title=title popover=popover}}
            Default info alert
        {{/sl-alert}}
    ` );

    data = this.$( '>:first-child' ).data();
    popoverData = data[ 'bs.popover' ];
    const options = popoverData.getOptions();

    assert.strictEqual(
        popoverData.getTitle(),
        title,
        'Popover title was set correctly'
    );

    assert.strictEqual(
        popoverData.getContent(),
        popover,
        'Popover text is set correctly'
    );

    assert.strictEqual(
        options.trigger,
        'click',
        'Default trigger is "click"'
    );
});

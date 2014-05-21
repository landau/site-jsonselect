/*jshint esnext: true*/
'use strict';

var React = require('react');
var dom = React.DOM;
var JSONSelect = require('JSONSelect');


var defaultJSON = {
  name: {
    first: 'Lloyd',
    last: 'Hilaiel'
  },
  favoriteColor: 'yellow',
  languagesSpoken: [
    {
      lang: 'Bulgarian',
      level: 'advanced'
    },
    {
      lang: 'English',
      level: 'native',
      preferred: true
    },
    {
      lang: 'Spanish',
      level: 'beginner'
    }
  ],
  seatingPreference: [
    'window',
    'aisle'
  ],
  drinkPreference: [
    'whiskey',
    'beer',
    'wine'
  ],
  weight: 156
};

var app = React.createClass({
  getInitialState: function() {
    return {
      json: JSON.stringify(defaultJSON, null, ' '),
      selector: '.languagesSpoken .lang'
    };
  },

  onChange: function(e) {
    var s = {};
    s[e.target.name] = e.target.value;
    this.setState(s);
  },

  format: function() {
    try {
      this.setState({
        json: JSON.stringify(JSON.parse(this.state.json), null, ' ')
      });
    } catch(e) {}
  },

  render: function() {
    var err = null;
    var parsed = null;
    var comp = null;
    try {
      parsed = JSON.parse(this.state.json);
      comp = JSONSelect.compile(this.state.selector).match(parsed);
    } catch (e) {
      err = e;
    }

    return dom.div(
      { className: 'container-fluid' },
      // Input
      dom.div(
        { className: 'row' },
        dom.div(
          { className: 'col-md-12' },
          dom.h2(null, 'JSONSelect Playground'),
          dom.div(
            { className: 'form-group' },

            /*jshint indent:false */
            dom.input({
              className: 'form-control',
              type: 'text',
              placeholder: 'Enter a selector',
              onChange: this.onChange,
              value: this.state.selector,
              name: 'selector'
            })
            /*jshint indent:2 */
          )
        )
      ),

      // Output
      dom.div(
        { className: 'row' },
        dom.div(
          { className: 'col-md-6' },
          dom.button({ className: 'btn btn-sm btn-primary', onClick: this.format }, 'Format'),
          dom.textarea({
            /*jshint indent:false */
            className: 'form-control',
            name:'json',
            onChange: this.onChange,
            value: this.state.json
          })
          /*jshint indent:2 */
        ),
        dom.div({ className: 'col-md-6' }, err ? err.message : JSON.stringify(comp, null, ' '))
      )
    );
  }
});

React.renderComponent(app(null), document.getElementById('app'));

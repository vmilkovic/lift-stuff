'use strict';

const $ = require('jquery');
require('bootstrap');

require('bootstrap/dist/css/bootstrap.css');
require('font-awesome/css/font-awesome.css')
require('../css/main.css');

require('@babel/polyfill');

jQuery(() => {
    $('[data-toggle="tooltip"]').tooltip();
});

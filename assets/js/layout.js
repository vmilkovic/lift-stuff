'use strict';

const $ = require('jquery');
require('bootstrap-sass');

require('../css/main.scss');

require('@babel/polyfill');

jQuery(() => {
    $('[data-toggle="tooltip"]').tooltip();
});

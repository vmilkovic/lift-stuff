'use strict';

import $ from 'jquery';
import 'bootstrap-sass';
// make sure the polyfill library is loaded in this main entry
import '@babel/polyfill';
import '../css/main.scss';

jQuery(() => {
    $('[data-toggle="tooltip"]').tooltip();
});

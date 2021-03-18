'use strict';

import $ from 'jquery';
import 'bootstrap-sass';
import '../css/main.scss';
import 'core-js/es/promise';

jQuery(() => {
    $('[data-toggle="tooltip"]').tooltip();
}); 

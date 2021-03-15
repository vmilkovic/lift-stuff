const $ = require('jquery')
const RepLogApp = require('./Components/RepLogApp');

jQuery(() => {
    var $wrapper = $('.js-rep-log-table');
    var repLogApp = new RepLogApp($wrapper);
});

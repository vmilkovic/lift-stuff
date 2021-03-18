'use strict';

import $ from 'jquery';
import '../css/login.css'

jQuery(() => {
    $('.js-recommended-login').on('click', '.js-show-login', function(e) {
        e.preventDefault();

        $('.js-recommended-login-details').toggle();
    });

    $('.js-login-field-username').on('keydown', function(e) {
        const $usernameInput = $(e.currentTarget);
        // remove any existing warnings
        $('.login-long-username-warning').remove();

        if ($usernameInput.val().length >= 20) {
            import('./Components/username_validation_error').then(username_validation_error => {
                username_validation_error.default($usernameInput);
            });
        }
    });
});

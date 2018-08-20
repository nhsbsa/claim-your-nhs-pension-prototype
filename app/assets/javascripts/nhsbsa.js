$(document).ready(function(){

    // GOVUK.toggle.init();

    // the following javascript code is just for demo purposes //
    // not for production, please remove when developing the real thing //
    if($('.add-search').length > 0){
        $('.phase-banner').append($('<a href="login" class="log-out-link">Search again</a>'));
    }
    if($('.add-log-out').length > 0 && !document.location.href.includes("administrate")){
        $('.service-header').prepend($('<a href="login" class="log-out-link" id="logout-link">Logout</a>'));
    }
    if ($('.add-log-out').length > 0 && document.location.href.includes("administrate")){
        $('.service-header').prepend($('<a href="admin-login" class="log-out-link" id="logout-link">Logout</a>'));
    }

    var $errorLayer = $('.form-group'),
    $errSummary = $('.error-summary'),
    $errMessage = $('.error-message');

    function displayPageErrors(errorMessageClass){
        $errSummary.removeClass('display-none');
        if(errorMessageClass){
            $('.'+errorMessageClass).removeClass('display-none').parents('.form-group').addClass('error');
        } else {
            $errMessage.removeClass('display-none');
            $errorLayer.addClass('error');
        }
    }

    function displayFieldErrorWithClass(errorMessageClass) {
        var $errorLayer = $(errorMessageClass).parents('.form-group');
        // var $checkboxError = $(errorMessageClass).parents('fieldset')[0]; // FIC amends for checkbox error-styles
        $errorLayer.addClass('error');
        // if ($checkboxError) {
        //     $($checkboxError).addClass('form-control-error'); // FIC amends for checkbox error-styles
        // }
        $(errorMessageClass, $errorLayer).removeClass('display-none');
    }

    function displayFieldError($inputField){
        var i;
        var $errorLayer = $inputField.parents('.form-group');
        var $radioField;
        $errorLayer.addClass('error');
        // if ($inputField.type == "INPUT") {
        //     $inputField.addClass('form-control-error'); // FIC amends for input error-styles
        // } else {
        if ($radioField = $($inputField)) { // [array]
            for (i = 0; i < $radioField.length; i++){
                $radioField.addClass('form-control-error'); // FIC amends for radio error-styles
            };
        };

        $('.error-message', $errorLayer).removeClass('display-none');
        $($inputField[0].parentElement.parentElement.previousElementSibling).removeClass('js-hidden');
    }

    function clearFormErrors($form){
        $('.form-group', $form).removeClass('error');
        $('.form-control-error').removeClass('form-control-error'); // FIC amends for input error-styles
        $('.error-message', $form).addClass('display-none');
        $('.error-summary').addClass('display-none');
    }

    // for cleaner urls after using form navigation
    var $jumpForm = $('.jump-form');
    $jumpForm.on('submit', function (evt) {
        evt.preventDefault();
        location.assign($jumpForm.attr('action'));
    });

    // radio type input fields
    var $formWithRadioButtons = $('.demo-validation-radio');
    if($formWithRadioButtons.length > 0){
        $formWithRadioButtons.on('submit', function (evt) {
            evt.preventDefault();
            if($('input:checked').length < 1){
                displayPageErrors();
            } else {
                location.assign($formWithRadioButtons.attr('action'));
            }
        });
    }

    // text type input fields
    var $demoValidationInputsForm = $('.demo-validation-input');
    if($demoValidationInputsForm.length > 0){
        $demoValidationInputsForm.on('submit', function (evt) {
            evt.preventDefault();
            var isValid = true;

            $('input', $demoValidationInputsForm).each(function() {
                if($(this).val() == ""){
                    isValid = false;
                }
            });

            if(isValid){
                location.assign($demoValidationInputsForm.attr('action'));
            } else {
                displayPageErrors();
            }
        });
    }

    // general and used for multiple forms
    var $formToValidated = $('.form-to-validate');

    var messages = {
        "exists" : "An account using this email address already exists.",
        "unmatched" : "We could not match the information you provided."
    };

    if($formToValidated.length > 0){

        $formToValidated.on('submit', function (evt) {
            evt.preventDefault();

            // clears error displays and resets error flag
            clearFormErrors($formToValidated);
            var isValid = true;
            var submitFormIfValid = function(){
                if(isValid){
                    location.assign($formToValidated.attr('action'));
                } else {
                    $('.error-summary').removeClass('display-none');
                    $('html, body').animate({ scrollTop: 0 }, 'fast');
                }
            };

            // validates text input fields
            $('.validate-text-input', $formToValidated).each(function() {
                if($.trim($(this).val()) == ""){
                    displayFieldError($(this));
                    isValid = false;
                }
            });

            // validates radio button via group name
            $('.validate-radio-input', $formToValidated).each(function() {
                var radioGroupName = $(this).attr('data-validate-radio-input');
                var radioGroupValue = $("input[name='" + radioGroupName + "']:checked").val();
                if(radioGroupValue == undefined){
                    displayFieldError($(this));
                    isValid = false;
                }
            });

            // form specific code
            if ($formToValidated.attr('id') == 'login-form') {
                submitFormIfValid();
            }
        });
    }

    // all back buttons
    var $topBackLinks = $('.back-nav');
    $topBackLinks.each(function (i, obj) {
        $('a', $(obj)).on('click', function(evt){
            evt.preventDefault();
            window.history.back();
        })
    });

    // all back buttons
    var $backLinks = $('.back-link');
    $backLinks.each(function (i, obj) {
        var $link = $('a', $(obj));
        if(!$link.hasClass('link')){
            $('a', $(obj)).on('click', function(evt){
                evt.preventDefault();
                window.history.back();
            })
        }
    });
});

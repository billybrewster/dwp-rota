//Using http://parsleyjs.org/
$(function() {
    var $addRiskForm = $('#add-risk-form');

    if (!$addRiskForm.length) {
        return;
    }

    $addRiskForm.parsley().on('form:submit', function() {
        $addRiskForm.find('#submit-add-risk').attr('disabled', 'disabled').val('Saving...');
    });

    //This displays the error messages box at the top of the page.
    $addRiskForm.parsley({}).on('field:validated', function() {
        var ok = $('.parsley-error').length === 0;
        var $formErrors = $('#add-risk-form-errors');

        if (ok === true) {
            $formErrors.attr('aria-hidden', 'true');
        } else {
            $formErrors.attr('aria-hidden', 'false');
        }
        location.hash = 'add-risk-form-errors';
    });

    // Title field, if validated. Removes error messaging
    $('#risk-title').parsley().on('field:success', function() {
        $('#error-message-risk-title').attr('aria-hidden', 'true');
        $('#risk-title-link-list').attr('aria-hidden', 'true');

        $('#risk-title-group').removeClass('error');
        $('#risk-title').removeClass('error');
    });

    // Title field, if error. displays error code. (works once form has been submitted)
    $('#risk-title').parsley().on('field:error', function() {
        $('#error-message-risk-title').attr('aria-hidden', 'false');
        $('#risk-title-link-list').attr('aria-hidden', 'false');

        $('#risk-title-group').addClass('error');
        $('#risk-title').addClass('error');
    });

    // Risk field, if validated. Removes error messaging
    $('#risk-cause').parsley().on('field:success', function() {
        $('#error-message-risk-cause').attr('aria-hidden', 'true');
        $('#risk-cause-link-list').attr('aria-hidden', 'true');

        $('#risk-cause-group').removeClass('error');
        $('#risk-cause').removeClass('error');
    });

    // Risk field, if error. displays error code. (works once form has been submitted)
    $('#risk-cause').parsley().on('field:error', function() {
        $('#error-message-risk-cause').attr('aria-hidden', 'false');
        $('#risk-cause-link-list').attr('aria-hidden', 'false');

        $('#risk-cause-group').addClass('error');
        $('#risk-cause').addClass('error');
    });

    // Because field, if validated. Removes error messaging
    $('#risk-effect').parsley().on('field:success', function() {
        $('#error-message-risk-effect').attr('aria-hidden', 'true');
        $('#risk-effect-link-list').attr('aria-hidden', 'true');

        $('#risk-effect-group').removeClass('error');
        $('#risk-effect').removeClass('error');
    });

    // Because field, if error. displays error code. (works once form has been submitted)
    $('#risk-effect').parsley().on('field:error', function() {
        $('#error-message-risk-effect').attr('aria-hidden', 'false');
        $('#risk-effect-link-list').attr('aria-hidden', 'false');

        $('#risk-effect-group').addClass('error');
        $('#risk-effect').addClass('error');
    });
});

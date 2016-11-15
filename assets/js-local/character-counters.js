 // Uses Character Counter
 // https://github.com/dtisgodsson/jquery-character-counter

$(document).ready(function() {
    $('#risk-title').characterCounter({
        counterFormat : '%1 characters remaining.',
        counterWrapper : 'span',
        counterCssClass : 'form-hint',
        counterExceededCssClass : 'gds-red',
        limit : 128
    });

    $('#mitigation-description').characterCounter({
        counterFormat : '%1 characters remaining.',
        counterWrapper : 'span',
        counterCssClass : 'form-hint',
        counterExceededCssClass : 'gds-red',
        limit : 128
    });

    $('#risk-cause').characterCounter({
        counterFormat : '%1 characters remaining.',
        counterWrapper : 'span',
        counterCssClass : 'form-hint',
        counterExceededCssClass : 'gds-red',
        limit : 1000
    });

    $('#risk-effect').characterCounter({
        counterFormat : '%1 characters remaining.',
        counterWrapper : 'span',
        counterCssClass : 'form-hint',
        counterExceededCssClass : 'gds-red',
        limit : 1000
    });

    $('#add-mitigation-note').characterCounter({
        counterFormat : '%1 characters remaining.',
        counterWrapper : 'span',
        counterCssClass : 'form-hint',
        counterExceededCssClass : 'gds-red',
        limit : 1000
    });

    $('#status-update').characterCounter({
        counterFormat : '%1 characters remaining.',
        counterWrapper : 'span',
        counterCssClass : 'form-hint-small',
        counterExceededCssClass : 'gds-red',
        limit : 1000
    });

    return true;
});

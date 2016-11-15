function ShowHideContent() {
    var self = this;

    self.escapeElementName = function(str) {
        var result;

        result = str.replace('[', '\\[').replace(']', '\\]');
        return result;
    };

    self.showHideRadioToggledContent = function() {
        $(".block-label input[type='radio']").each(function() {
            var $radio = $(this);
            var $radioGroupName = $radio.attr('name');
            var $radioLabel = $radio.parent('label');
            var dataTarget = $radioLabel.attr('data-target');

            // Add ARIA attributes
            // If the data-target attribute is defined
            if (dataTarget) {
                // Set aria-controls
                $radio.attr('aria-controls', dataTarget);
                $radio.on('click', function() {
                    var $dataTarget = $('#' + dataTarget);

                    // Select radio buttons in the same group
                    $radio.closest('form').find('.block-label input[name=' + self.escapeElementName($radioGroupName) + ']').each(function() {
                        var $this = $(this);
                        var groupDataTarget = $this.parent('label').attr('data-target');
                        var $groupDataTarget = $('#' + groupDataTarget);

                        // Hide toggled content
                        $groupDataTarget.addClass('js-hidden');
                        // Set aria-expanded and aria-hidden for hidden content
                        $this.attr('aria-expanded', 'false');
                        $groupDataTarget.attr('aria-hidden', 'true');
                    });

                    $dataTarget.removeClass('js-hidden');
                    // Set aria-expanded and aria-hidden for clicked radio
                    $radio.attr('aria-expanded', 'true');
                    $dataTarget.attr('aria-hidden', 'false');
                });
            } else {
                // If the data-target attribute is undefined for a radio button,
                // hide visible data-target content for radio buttons in the same group
                $radio.on('click', function() {
                    // Select radio buttons in the same grou
                    $('.block-label input[name=' + self.escapeElementName($radioGroupName) + ']').each(function() {
                        var groupDataTarget = $(this).parent('label').attr('data-target');
                        var $groupDataTarget = $('#' + groupDataTarget);

                        // Hide toggled content
                        $groupDataTarget.addClass('js-hidden');
                        // Set aria-expanded and aria-hidden for hidden content
                        $(this).attr('aria-expanded', 'false');
                        $groupDataTarget.attr('aria-hidden', 'true');
                    });
                });
            }
        });
    };

    self.showHideCheckboxToggledContent = function() {
        $(".block-label input[type='checkbox']").each(function() {
            var $checkbox = $(this);
            var $checkboxLabel = $(this).parent();
            var $dataTarget = $checkboxLabel.attr('data-target');
            var state = $(this).attr('aria-expanded') === 'false';

            // Add ARIA attributes
            // If the data-target attribute is defined
            if (typeof $dataTarget !== 'undefined' && $dataTarget !== false) {
                // Set aria-controls
                $checkbox.attr('aria-controls', $dataTarget);
                // Set aria-expanded and aria-hidden
                $checkbox.attr('aria-expanded', 'false');
                $('#' + $dataTarget).attr('aria-hidden', 'true');
                // For checkboxes revealing hidden content
                $checkbox.on('click', function() {
                    // Toggle hidden content
                    $('#' + $dataTarget).toggleClass('js-hidden');

                    // Update aria-expanded and aria-hidden attributes
                    $(this).attr('aria-expanded', state);
                    $('#' + $dataTarget).attr('aria-hidden', !state);
                });
            }
        });
    };
}

$(document).ready(function() {
    var toggleContent = new ShowHideContent();
    var $radios = $('input:radio[id=mitigation-status-open]');
    var state = $(this).attr('aria-expanded') === 'false';
    var $riskStatusClosedRadio = $('#risk-status-closed');
    var $riskStatusRejectedRadio = $('#risk-status-rejected');

    jQuery.fx.off = true;
    toggleContent.showHideRadioToggledContent();
    toggleContent.showHideCheckboxToggledContent();

    if ($radios.is(':checked') === true) {
        $('#mitigation-status-date-closed').addClass('js-hidden');
    }

    if ($radios.is(':checked') !== true) {
        $('#mitigation-status-date-closed').removeClass('js-hidden');
        $('#mitigation-status-date-closed').attr('aria-hidden', state);
    }

    if ($riskStatusClosedRadio.is(':checked') === true) {
        $('#risk-status-date-closed')
            .removeClass('js-hidden')
            .attr('aria-hidden', state);
    }

    if ($riskStatusRejectedRadio.is(':checked') === true) {
        $('#risk-status-date-rejected')
            .removeClass('js-hidden')
            .attr('aria-hidden', state);
    }
});

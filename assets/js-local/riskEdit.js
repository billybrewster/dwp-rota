var ucRiskClient = window.ucRiskClient || {};

ucRiskClient.riskEditForm = (function() {
    var $editForm;
    var fields;

    function updateScore() {
        var newScore;
        var impactVal = fields.$impact.val();
        var likelihoodVal = fields.$likelihood.val();

        if (Number(impactVal) && Number(likelihoodVal)) {
            newScore = impactVal * likelihoodVal;
        } else {
            newScore = '';
        }
        fields.$score.val(newScore);
    }

    function watch() {
        fields.$impact.on('keyup blur change', updateScore);
        fields.$likelihood.on('keyup blur change', updateScore);
    }

    function init() {
        $editForm = $('#edit-risk-form');
        if ($editForm.length) {
            fields = {
                $impact : $editForm.find('#risk-impact'),
                $likelihood : $editForm.find('#risk-likelihood'),
                $score : $editForm.find('#risk-score')
            };
            watch();
        }
    }

    return {
        init : init
    };
})();

$(document).ready(function() {
    ucRiskClient.riskEditForm.init();
    return true;
});

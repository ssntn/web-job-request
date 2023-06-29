$(document).ready(function() {
    var prob_div = $('#problem-div');
    prob_div.hide();

    $('input[type=radio][name=service-type]').change(function(){
        if($(this).attr('id') === 'type-2') prob_div.show();
        else prob_div.hide();
    })

});



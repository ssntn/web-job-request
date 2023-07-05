$(document).ready(function() {    
    
    var d = $('select[name="devices"] option:selected');
    var prob_div = $('#problem-div');

    $('.form-select').change(function(){ 
        
        if($(this).attr('id')!='Temporary') $('#temporary').remove();

        if($(this).find(":selected").attr('id')==='other') $('#other-device-div').show();
        else $('#other-device-div').hide();        
    });
    
    $('input[type=radio][name=service-type]').change(function(){
        if($(this).attr('id') === 'type-2') prob_div.show();
        else prob_div.hide();
    });

});

$(document).ready(function() {    
    
    var d = $('select[name="devices"] option:selected');
    var sof = $('.soft-serv');
    var pub = $('.pub-serv');

    $('.form-select').change(function(){ 
        var r = $('input[name="sub-serv"] option:checked');
        alert(r.attr('id'));
        
        if($(this).attr('id')!='Temporary') $('#temporary').remove();

        if($(this).find(":selected").attr('id')==='other') $('#other-device-div').show();
        else $('#other-device-div').hide();        
    });
    
    $('input[type=radio][name=service-type]').change(function(){
        if($(this).attr('id') === 'type-2') {
            sof.show();
            pub.hide();
        } else {
            sof.hide();
            pub.show();
        }
    });

});

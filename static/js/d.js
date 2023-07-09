$(document).ready(function() {    
    
    var d = $('select[name="devices"] option:selected');
    var prob_div = $('#problem-div');

    var m_serv = $("#serv-modal");
    var m_dev = $("#dev-modal");
    var m_odev = $("#odev-modal");
    var m_pro = $('#prob-modal'); 
    var m_loc =  $('#loc-modal'); 

    $('.form-select').change(function(){ 
        if($(this).attr('id')!='Temporary') $('#temporary').remove();

        if($(this).find(":selected").attr('id')==='other') $('#other-device-div').show();
        else $('#other-device-div').hide();        
    });
    
    $('input[type=radio][name=service-type]').change(function(){
        if($(this).attr('id') === 'type-2') prob_div.show();
        else prob_div.hide();
    });
    
    $("#modal-button").click(function(){
        
        m_serv.text($('input[name="service-type"]:checked').val());
        m_dev.text($('#devices').find(":selected").text());
        m_odev.text(
            ($('#other-device').val() != "")
                ? $('#other-device').val()
                : "Not set"
        );
        if(m_odev.text().toLowerCase().includes("not")) m_odev.parent().hide()
        else m_odev.parent().show();
        
        m_pro.text(
            ($('#problem').val() != "")
                ? $('#problem').val()
                : "N/A"
        );
        if(!(m_pro.text().toLowerCase().includes("repair"))) m_pro.parent().hide()
        else m_pro.parent().show();


        m_loc.text(
            ($('#location').val() != "")
                ? $('#location').val()
                : "Not set"
            
        );
    });
    
    d_hide => d => d.hide();
    d_show => d => d.show();
    m_hide => modal => d_hide(modal.parent());
    m_show => modal => d_show(modal.parent());
});

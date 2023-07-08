$(document).ready(function() {
    var prob_div = $('#problem-div');
    prob_div.hide();

    var m_serv = $("#serv-modal");
    var m_con = $("#conn-modal");
    var m_loc =  $('#loc-modal'); 
    var m_pro = $('#prob-modal'); 
    

    $('input[type=radio][name=service-type]').change(function(){
        if($(this).attr('id') === 'type-2') prob_div.show();
        else prob_div.hide();
    })

    
    $("#modal-button").click(function(){
        // $("#service-modal").text("Type: "+$('input[name="service"]:checked').val());
        // $("#date-modal").text("Date: "+$('#month').find(":selected").text() +" "+ $("#year").val());
        // $("#service-modal").text("Type: "+$('input[name="service"]:checked').val());
        
        m_serv.text($('input[name="service-type"]:checked').val())
        m_con.text($('input[name="connection-type"]:checked').val());
        m_loc.text(
            ($('#location').val() != "")
                ? $('#location').val()
                : "N/A"
        );
        m_pro.text(
            ($('#problem').val() != "")
                ? $('#problem').val()
                : "N/A"
            
        );
    })

});



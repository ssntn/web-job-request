$(document).ready(function() {    
    
    var sof = $('.soft-serv');
    var pub = $('.pub-serv');
    var m_serv = $("#serv-modal");
    var m_sp = $("#sopu-modal");
    var m_aut = $('#aut-modal'); 
    var m_edi =  $('#edi-modal'); 
    var m_date =  $('#date-modal'); 
    
    $('input[type=radio][name=service-type]').change(function(){
        if($(this).attr('id') === 'type-2') {
            sof.show();
            pub.hide();
        } else {
            sof.hide();
            pub.show();
        }
        
        if($('input[name="sub-serv"]:checked').attr('id') != null)
            $('input[name="sub-serv"]:checked').prop('checked', false);
    });

    
    $("#modal-button").click(() => {

        m_serv.text($('input[name="service-type"]:checked').val());
        m_sp.text($('input[name="sub-serv"]:checked').val());

        var serv = $('input[name="service-type"]:checked').val()
        var pub = serv.toLowerCase().includes("publication");

        $('#from').prop('required', pub);
        $('#to').prop('required', pub);
        if(pub){
            m_edi.parent().show();
            m_aut.parent().show();
            m_date.parent().show();

        }  else {
            m_edi.parent().hide();
            m_aut.parent().hide();
            m_date.parent().hide();
        }
    
        m_aut.text(($('#author').val() != "")
            ? $('#author').val()
            : "Not set"
        );
        
        m_edi.text(($('#editor').val() != "")
            ? $('#editor').val()
            : "Not set"
        );

        
        var from_date = new Date($('#from').val());
        var from_day = from_date.getDate();
        var from_month = from_date.getMonth() + 1;
        var from_year = from_date.getFullYear();
        var from = [from_month, from_day, from_year].join('/');

        var to_date = new Date($('#to').val());
        var to_day = to_date.getDate();
        var to_month = to_date.getMonth() + 1;
        var to_year = to_date.getFullYear();
        var to = [to_month, to_day, to_year].join('/');

        m_date.text([from, to].join(' - '));
    });

});

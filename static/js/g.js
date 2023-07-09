$(document).ready(() => {

    var m_docu = $('#serv-modal')
    
    $("#modal-button").click(() => {

        m_docu.text(($('#docu').val() != "")
            ? $('#docu').val()
            : "Not set"
        );
    });

});
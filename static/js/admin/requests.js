$(document).ready(function() {

    // DROPDOWN
    $('.status-filters').click(function(){
        var sta = $(this)
        var ser = $('.service-filters').val();
        $('#triggerId-status').text(sta.text());
        add_rows(state_filter=sta.val(), service_filter=ser);
    });

    $('.service-filters').click(function(){
        var ser = $(this).val();
        var sta = $('.status-filters').val();
        $('#triggerId-service').text((ser=='null')?'All':ser);
        add_rows(status_filter=sta,service_filter=ser);
    });

    // UTILS    
    const SERVICE_STATE = {
        REJECTED: 0,
        PENDING: 1,
        ACCEPTED: 2,
        ONGOING: 3,
        COMPLETED: 4
    }
    
    const s_SERVICE_STATE = { 
        'rejected': SERVICE_STATE.REJECTED,
        'pending': SERVICE_STATE.PENDING,
        'accepted': SERVICE_STATE.ACCEPTED,
        'ongoing': SERVICE_STATE.ONGOING,
        'completed': SERVICE_STATE.COMPLETED
    }

    $('.modal').on('hidden.bs.modal', function (e) {
        $('.modal-body').empty();
    });
    
    function get_status (status) {
        if (status === 0) return 'REJECTED';
        else if(status === 1) return 'PENDING';
        else if(status === 2) return 'ACCEPTED';
        else if(status === 3) return 'ONGOING';
        else if(status === 4) return 'COMPLETED';
        else return '';
    }

    // ROW CLICK
    $('#table-body').on('click', '.request-data-row', function() {

        var rowId = $(this).attr('id');
        var modal = $('.modal-body');
        $('#the-actual-modal-button').click();
        $('.modal-title').text('Loading..')

        read_request(rowId).then(function(data) {
            $('#loading-modal').show();

            if(!data) return;
            id = data.id
            data = data.data;
            
            $('.modal-title').text(data.service.name +" | "+data.service.type);
            var h5 = $('<h5>');
            var p = $('<p class="ps-3">');

            modal.append(h5.clone().text("User Info"));
            modal.append(p.clone().html("<b>Name:</b> "+data.user.name));
            modal.append(p.clone().html("<b>Email:</b> "+data.user.email));
            modal.append(p.clone().html("<b>Contact:</b> "+data.user.contact));
            modal.append(h5.clone().text("Request Info"));

            for(var s in data.service){
                modal.append(p.clone().html("<b>"+s.charAt(0).toUpperCase()+s.slice(1)+"</b>: "+data.service[s]));
            }
            
            modal.append(h5.clone().text("Date"));
            for(var s in data.dates){
                if(data.dates[s] == null) continue;
                modal.append(p.clone().html("<b>"+s.charAt(0).toUpperCase()+s.slice(1)+"</b>: "+data.dates[s]));
            }
            $('#loading-modal').hide();

            

            $('.modal-btn').click(function(){                
                if($(this).val().toLowerCase() === 'accept') update_request(id, data.state);
                else update_request(data.id, SERVICE_STATE.REJECTED);
            })

        });


    });

    // Server side
    function add_rows(state_filter = null, service_filter = null, m = null) {
        read_request(id = null, state_filter, service_filter).then(data => {
            
            $('#table-body').empty();
            $('#loading-overlay').show();
        d = JSON.parse(data)
            if (d != '') {
                                
                d.forEach(element => {
                    var row = $('<tr></tr>');
                    row.attr('id', element.id);
                    row.attr('class', 'request-data-row');
                    row.append($('<td></td>').text(element.data.user.name));
                    row.append($('<td></td>').text(element.data.service.name));
                    row.append($('<td></td>').text(element.data.dates.requested));
                    row.append($('<td></td>').text(get_status(element.data.state)));
                    $("#table-body").append(row);
                });

            } else {
                var row = $('<tr></tr>');
                var state = $('#triggerId-status').text();
                row.append($('<td colspan="4">').text("No "+state+" data"));
                $("#table-body").append(row);
            }   
            $('#loading-overlay').hide();

        });
    }
    
    update_request = (id, status) => {
        data = {'id': id, 'state': status}
        $.ajax({         

            type: 'POST', 
            url: '/update_request/',
            data: JSON.stringify(data),
            contentType: 'application/json', 

            success: (response) => {
                alert(response);

            }, error: (xhr, status, error) => {
                alert(error);
        
        }});  
    }

    read_request = (id = null, state_filter = null, service_filter = null) => {
        return new Promise((resolve, reject) => {

            fetch(`/fetch_request?id=${id}&state_filter=${state_filter}&service_filter=${service_filter}`, {
                method: 'GET'
            })
              .then((response) => {
                return response.json();

            }).then((data) => {                
                // id filter
                if (id) {
                    var foundData = data.find(element => { return element.id === id; });
                    resolve(foundData || null);
                } 
                
                //   NO ID
                else resolve(JSON.stringify(data) || null);

            }).catch((error) => {
                reject(error);
            });

    })}

    add_rows(state_filter=1);
});

var deleteModal = function(row, title) {
    var html = '<div class="modal fade" id="deleteModal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">Delete ';
    html += title + '</h4></div><div class="modal-body">';
    html += 'Are you sure you want to delete ' + title +  '?</div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-danger">Delete</button></div></div></div></div>';

    $('body').append(html);
    $('#deleteModal').modal()

    $('#deleteModal .btn-default').click(function() {
        $('#deleteModal').modal('hide');
    });

    $('#deleteModal .btn-danger').click(function() {
        $.ajax({
            url: row.data('uri'),
            type: "DELETE"
        });
        row.remove();
        $('#deleteModal').modal('hide');
    });

    $('#deleteModal').on('hidden.bs.modal', function() {
        $('#deleteModal').remove();
    });
}

var makeAnchor = function(url) {
    return '<a href="' + url.replace('localhost', window.location.hostname) + '" target="_blank">' + url.replace('localhost', window.location.hostname) + '</a>';
}

var apps = {};

$.get('/api/devices/', function(data) {
    $.each(data, function(index, device) {
        //var row = $('<tr><td>' + device.uuid.substring(0, 28) + '</td><td><select class="form-control"><option value="">--- not selected ---</option></select></td><td class="admin_url"></td><td><button class="btn btn-danger" data-toggle="tooltip" title="Delete device from list"><span class="glyphicon glyphicon-remove-sign"></span></button> <a target="_blank" href="http://' + window.location.hostname + ':8150/browse/device/' + device.uuid + '/status" class="btn btn-primary"  data-toggle="tooltip" title="Open Network Manager"><span class="glyphicon glyphicon-cog"></span></a></td></tr>');
        var row = $('<tr><td>' + device.uuid.substring(0, 28) + '</td><td><input type="text" class="url" value="'+device.url+'" title="Url for the device"/></td><td><button class="btn btn-danger" data-toggle="tooltip" title="Delete device from list"><span class="glyphicon glyphicon-remove-sign"></span></button> <a target="_blank" href="http://' + window.location.hostname + ':8150/browse/device/' + device.uuid + '/status" class="btn btn-primary"  data-toggle="tooltip" title="Open Network Manager"><span class="glyphicon glyphicon-cog"></span></a></td></tr>');
        row.data('uri', device.uri);
        var select = row.find('input')
        select.data('url', device.url);

        select.change(function() {
            $.ajax({
                type: 'PUT',
                url: row.data('uri'),
                data: {uuid: device.uuid, url: select.val()}
            });
            // if (apps[select.val()]) {
            //     row.find('.admin_url').html(makeAnchor(apps[select.val()].admin_url));
            // }
        });
        
        row.find('button').click(function(){
            if ($(this).hasClass('btn-danger')) {
                deleteModal(row, 'device ' + device.uuid);
            } else {
                select.val(select.data('old'));
                select.prop('disabled', true);
                row.find('button').last().removeClass('btn-primary').addClass('btn-danger');
                row.find('button').first().removeClass('btn-success').addClass('btn-primary').html('<span class="glyphicon glyphicon-pencil"></span>');
            }
        });

        // if (!$.isEmptyObject(apps)) {
        //     $.each(apps, function(key, value) {
        //         select.append('<option value="' + key + '">' + value.name + '</option>');
        //     });
        //     select.val(select.data('old'));
        //     if (apps[select.data('old')]) {
        //         row.find('.admin_url').html(makeAnchor(apps[select.data('old')].admin_url));
        //     }
        // }

        $('tbody').append(row);

    });
    $('.url').tooltip({container: 'body', placement: 'bottom', delay: 50});
    $('.btn').tooltip({container: 'body', placement: 'bottom', delay: 50});
});

// $.get('/api/apps/', function(data) {
//     $.each(data, function(index, app) {
//         apps[app.uri] = app;
//         $('select').append('<option value="' + app.uri + '">' + app.name + '</option>');
//     });
//     $('select').each(function(index, select) {
//         $(select).val($(select).data('old'));
//         if (apps[$(select).data('old')]) {
//             $(select).parent().parent().find('.admin_url').html(makeAnchor(apps[$(select).data('old')].admin_url));
//         }
//     });
// });

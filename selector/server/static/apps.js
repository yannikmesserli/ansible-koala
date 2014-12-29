var addRow = function(app) {
    if (app) {
        var row = $('<tr><td><input type="text" class="form-control" name="name" value="' + app.name + '" disabled></td><td><input type="text" class="form-control" value="' + app.url + '" name="url" disabled></td><td><div class="btn-group"><button class="btn btn-primary"><span class="glyphicon glyphicon-pencil"></span></button><button class="btn btn-danger"><span class="glyphicon glyphicon-remove-sign"></span></button></div></td></tr>');
        row.data('uri', app.uri);
    } else {
        var row = $('<tr><td><input type="text" class="form-control" name="name"></td><td><input type="text" class="form-control" name="url"></td><td><div class="btn-group"><button class="btn btn-success"><span class="glyphicon glyphicon-floppy-disk"></span></button><button class="btn btn-primary"><span class="glyphicon glyphicon-remove-sign"></span></button></div></td></tr>');
    }
    row.find('button').first().click(function(){
        if ($(this).hasClass('btn-primary')) {
            row.find('input').prop('disabled', false);
            row.find('button').last().removeClass('btn-danger').addClass('btn-primary');
            row.find('input').each( function(index, input) {
                $(input).data('old', $(input).val());
            });
            $(this).removeClass('btn-primary').addClass('btn-success').html('<span class="glyphicon glyphicon-floppy-disk"></span>');
        } else {
            row.find('input').prop('disabled', true);
            row.find('button').last().removeClass('btn-primary').addClass('btn-danger');
            $(this).removeClass('btn-success').addClass('btn-primary').html('<span class="glyphicon glyphicon-pencil"></span>');

            $.ajax({
                type: row.data('uri') ? 'PUT' : 'POST',
                url: row.data('uri') || '/api/apps/',
                data: {name: row.find('input[name="name"]').val(), url: row.find('input[name="url"]').val()}
            });
        }
    });
    row.find('button').last().click(function(){
        if ($(this).hasClass('btn-danger')) {
            deleteModal(row, 'application ' + app.name);
        } else {
            if (row.data('uri')) {
                row.find('input').each( function(index, input) {
                    $(input).val($(input).data('old'));
                });
                row.find('input').prop('disabled', true);
                row.find('button').last().removeClass('btn-primary').addClass('btn-danger');
                row.find('button').first().removeClass('btn-success').addClass('btn-primary').html('<span class="glyphicon glyphicon-pencil"></span>');
            } else {
                row.remove();
            }        
        }
    });
    $('tbody').append(row);
};

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

$.get('/api/apps/', function(data) {
    $.each(data, function(index, app) {
        addRow(app);
    });

    
});

$(document).ready(function () {
    $('#addnew').click(function() {
        addRow();
    });
});
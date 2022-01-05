$(document).ready(function () {
    $("#editOrderByAdmin").click(() => {
        const id = $("#exampleInputIdEdit").val().toString()
        const statusInput = $("#statusSelected").val().toString()
        $.ajax({
            url: '/admin/order/edit/' + id,
            type: 'POST',
            cache: false,
            data: { 
                id: id, 
                status: statusInput,
            },
            success: function (data) {
                if (data.Status === 1) {
                    alert(data.Message)
                    $(location).prop('href', '/admin/order')
                    return
                }
                else {
                    alert(data.Message)
                }
            }
            , error: function (jqXHR, textStatus, err) {
                alert('Không thành công')
            }
        })
    })
})


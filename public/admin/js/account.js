$(document).ready(function () {
    $("#editAccountAdmin").click(() => {
        const id = $("#exampleInputId").val().toString()
        const nameInput = $("#exampleInputName").val().toString()
        const phoneInput = $("#exampleInputPhone").val().toString()
        const addressInput = $("#exampleInputAddress").val().toString()

        if(nameInput == '' || phoneInput == '' || addressInput == '')
        {
            alert("Vui Lòng Nhập Đủ Thông Tin")
        }
        else{
            $.ajax({
                url: '/admin/account',
                type: 'POST',
                cache: false,
                data: { 
                    id: id, 
                    name: nameInput, 
                    phone: phoneInput, 
                    address: addressInput, 
     
                },
                success: function (data) {
                    if (data.Status === 1) {
                        $(location).prop('href', '/admin/account')
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
        }
    })
})


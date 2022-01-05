$(document).ready(function () {
    $("#editClientByAdmin").click(() => {
        const id = $("#exampleInputIdEdit").val().toString()
        const emailInput = $("#exampleInputEmailEdit").val().toString()
        const nameInput = $("#exampleInputNameEdit").val().toString()
        const phoneInput = $("#exampleInputPhoneEdit").val().toString()
        const addressInput = $("#exampleInputAddressEdit").val().toString()
        const lockedInput = $("#lockedSelected").val().toString()

        if(nameInput == '' || phoneInput == '' || addressInput == '')
        {
            alert("Vui Lòng Nhập Đủ Thông Tin")
        }
        else{
            $.ajax({
                url: '/admin/client/edit/' + id,
                type: 'POST',
                cache: false,
                data: { 
                    id: id, 
                    email: emailInput, 
                    name: nameInput, 
                    phone: phoneInput, 
                    address: addressInput,
                    locked: lockedInput,
                },
                success: function (data) {
                    if (data.Status === 1) {
                        alert(data.Message)
                        $(location).prop('href', '/admin/client')
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


$(document).ready(function () {
    let userInfoObject = localStorage.getItem('userInfo');

    const userInfo = JSON.parse(userInfoObject);

    $("#btnOrderProduct").on("click", function () {   
        if($("#oldAddressUser").is(":checked")){
            addressInput = userInfo.address
        }
        else {
            addressInput = $("#newAddressUser").val().toString()
            if(addressInput == ''){
                return alert("Vui lòng nhập địa chỉ mới!")
            }
        }
        messageInput = $("#messageUser").val().toString()
        $.ajax({
            url: '/checkout',
            type: 'POST',
            cache: false,
            data: { id: userInfo.id,  
                phone: userInfo.phone,
                address: addressInput,
                message: messageInput,
            },
            success: function (data) {
                if (data.Status === 1) {
                    // isSuccessLogin = true
                    // localStorage.setItem("login", true)
                    // localStorage.setItem('userInfo', JSON.stringify(data.data[0]));
                    $(location).prop('href', '/')
                    alert(data.Message)
                    
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


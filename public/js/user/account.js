$(document).ready(function () {
    let userInfoObject = localStorage.getItem('userInfo');

    const userInfo = JSON.parse(userInfoObject);

    $("#accountEmail").val(userInfo.email)
    $("#accountName").val(userInfo.name)
    $("#accountPhone").val(userInfo.phone)
    $("#accountAddress").val(userInfo.address)
    $("#accountCreated").val(userInfo.created)

    $("#buttonEditInforUser").click(() => {
        const emailInput = $("#accountEmail").val().toString()
        const nameInput = $("#accountName").val().toString()
        const phoneInput = $("#accountPhone").val().toString()
        const addressInput = $("#accountAddress").val().toString()
        if(nameInput == '' || phoneInput == '' || addressInput == '')
        {
            alert("Vui Lòng Nhập Đủ Thông Tin")
        }
        else if(!(/^\d+$/).test(phoneInput)){
            alert('Vui Lòng Nhập Phone Đúng Dạng Số!')
        }else{
            $.ajax({
                url: '/account',
                type: 'POST',
                cache: false,
                data: { id: userInfo.id, 
                    email: emailInput, 
                    name: nameInput, 
                    phone: phoneInput, 
                    address: addressInput
                },
                success: function (data) {
                    if (data.Status === 1) {
                        isSuccessLogin = true
                        localStorage.setItem("login", true)
                        localStorage.setItem('userInfo', JSON.stringify(data.data[0]));
                        //$(location).prop('href', '/account')
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


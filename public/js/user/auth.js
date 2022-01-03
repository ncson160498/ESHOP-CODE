$(document).ready(function () {
    $("#registerUserForm").submit(() => {
        const emailInput = $("#registerEmail").val().toString()
        const nameInput = $("#registerName").val().toString()
        const phoneInput = $("#registerPhone").val().toString()
        const addressInput = $("#registerAddress").val().toString()
        const passwordInput = $("#registerPass").val().toString() 
        const passwordReInput = $("#registerReInputPass").val().toString() 

        if(emailInput == '' || nameInput == '' || phoneInput == '' || addressInput == '' || passwordInput =='')
        {
            alert("Vui Lòng Nhập Đủ Thông Tin")
        }
        else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(emailInput)){
            alert('Vui Lòng Nhập Đúng Dạng Email!')
        }
        else if(!(/^\d+$/).test(phoneInput)){
            alert('Vui Lòng Nhập Phone Đúng Dạng Số!')
        }
        else if(passwordInput != passwordReInput){
            alert("Mật Khẩu Nhập Lại Không Giống Nhau!")
        }else{
            $.ajax({
                url: 'auth/register',
                type: 'POST',
                cache: false,
                data: { 
                    email: emailInput, 
                    phone: phoneInput,
                    username: nameInput, 
                    address: addressInput,
                    password: passwordInput, 
                },
                success: function (data) {
                    if (data.Status === 1) {
                        alert(data.Message)
                        location.reload()
                    }
                    else if(data.Status === 0) {
                        alert(data.Message)
                        location.reload()
                    }
                    else{
                        alert(data.Message)
                        return
                    }
                }
                , error: function (jqXHR, textStatus, err) {
                    alert('Không thành công')
                }
            })
        }

    })

    $("#loginUserForm").submit(() => {
        const emailInput = $("#loginEmail").val().toString()
        const passwordInput = $("#loginPass").val().toString()
        if(emailInput == '')
        {
            alert('Vui Lòng Nhập Email!')
        }
        else if(passwordInput == ''){
            alert('Vui Lòng Nhập PassWord!')
        }
        else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(emailInput)){
            alert('Vui Lòng Nhập Đúng Dạng Email!')
        }
        else{
            $.ajax({
                url: 'auth/login',
                type: 'POST',
                cache: false,
                data: { email: emailInput, password: passwordInput },
                success: function (data) {
                    if (data.Status === 1) {
                        isSuccessLogin = true
                        localStorage.setItem("login", true)
                        localStorage.setItem('userInfo', JSON.stringify(data.data));
                        $(location).prop('href', '/')
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

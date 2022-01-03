$(document).ready(function () {
    $("#register_Admin").click(() => {
        const emailInput = $("#exampleInputEmail").val().toString()
        const nameInput1 = $("#exampleFirstName").val().toString()
        const nameInput2 = $("#exampleLastName").val().toString()
        const name = nameInput1 + nameInput2;
        const passwordInput = $("#exampleInputPassword").val().toString()
        const repasswordInput = $("#exampleRepeatPassword").val().toString()
        const phoneInput = $("#exampleInputPhone").val().toString()
        const addressInput = $("#exampleInputAddress").val().toString()

        if(emailInput == '' || nameInput1 == '' || nameInput2 == '' || phoneInput == '' || addressInput == '' || passwordInput =='')
        {
            alert("Vui Lòng Nhập Đủ Thông Tin")
        }
        else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(emailInput)){
            alert('Vui Lòng Nhập Đúng Dạng Email!')
        }
        else if(!(/^\d+$/).test(phoneInput)){
            alert('Vui Lòng Nhập Phone Đúng Dạng Số!')
        }
        else if(passwordInput != repasswordInput){
            alert("Mật Khẩu Nhập Lại Không Giống Nhau!")
        }else{
            $.ajax({
                url: '/admin/register',
                type: 'POST',
                cache: false,
                data: { 
                    email: emailInput, 
                    phone: phoneInput,
                    address: addressInput, 
                    username: name, 
                    password: passwordInput 
                },
                success: function (data) {
                    if (data.Status === 1) {
                        alert(data.Message)
                        // location.reload()
                        $(location).prop('href', '/admin/login')
                    }
                    else
                    {
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

    $("#login_Admin").click(() => {
        
        const emailInput = $("#loginInputEmail").val().toString()
        const passwordInput = $("#loginInputPassword").val().toString()

        if(emailInput == '')
        {
            alert('Vui Lòng Nhập Email')
        }
        else if(passwordInput == ''){
            alert('Vui Lòng Nhập PassWord')
        }
        else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(emailInput)){
            alert('Vui Lòng Nhập Đúng Dạng Email!')
        }
        else{
            $.ajax({
                url: '/admin/login',
                type: 'POST',
                cache: false,
                data: { email: emailInput, password: passwordInput },
                success: function (data) {               
                    if (data.Status === 1) {
                        isSuccessLogin = true
                        localStorage.setItem("login", true)
                        localStorage.setItem('userInfo', JSON.stringify(data.data));
                        $(location).prop('href', '/admin')
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

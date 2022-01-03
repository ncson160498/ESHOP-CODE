$(document).ready(function () {
    let userInfoObject = localStorage.getItem('userInfo');

    const userInfo = JSON.parse(userInfoObject);

    $("#accountEmail").val(userInfo.email)


    $("#buttonChangePasswordUser").on("click", function () {   
        const passwordOld = $("#passwordOld").val().toString()
        const passwordNewInput = $("#passwordNew").val().toString()
        const rePasswordNewInput = $("#rePasswordNew").val().toString()
        if(passwordOld == ''){
            alert('Vui Lòng Nhập PassWord Cũ!')
        }
        else if(passwordNewInput == ''){
            alert('Vui Lòng Nhập PassWord Mới!')
        }
        else if(passwordNewInput != rePasswordNewInput){
            alert('Nhập lại mật khẩu không đúng!')
        }else{
            $.ajax({
                url: '/changepassword',
                type: 'POST',
                cache: false,
                data: { 
                    id: userInfo.id, 
                    oldpass: passwordOld, 
                    newpass: passwordNewInput, 
                },
                success: function (data) {
                    if (data.Status === 1) {
                        localStorage.clear()
                        isSuccessLogin = true
                        localStorage.setItem("login", true)
                        localStorage.setItem('userInfo', JSON.stringify(data.data));
                        alert(data.Message)
                        $(location).prop('href', '/account')
                        return
                    }
                    else {
                        alert(data.Message)
                    }
                }
                , error: function (jqXHR, textStatus, err) {
                    alert('Không thành công!')
                }
            }) 
        }
    })
})


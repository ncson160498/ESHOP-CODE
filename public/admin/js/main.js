var isSuccessLogin = false

$(document).ready(function () {
    let userInfoObject = localStorage.getItem('userInfo');
    const userInfo = JSON.parse(userInfoObject);

    $("#nameAdminLogin").val(userInfo.name)

    $('#logoutAdmin').click(()=>{
        localStorage.clear()
        // localStorage.removeItem("login")
        // localStorage.removeItem("userInfo")  
        $(location).prop('href', '/adminauth/logout')
    })
    
})
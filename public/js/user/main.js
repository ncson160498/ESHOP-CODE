var isSuccessLogin = false

$(document).ready(function () {
    if (localStorage.getItem("login") == 'true') {
        $(".LoginHeaderButton").hide()
        $(".LogoutHeaderButton").show()
    }
    else {
        $(".LogoutHeaderButton").hide()
        $(".LoginHeaderButton").show()
    }

    $(".LogoutHeaderButton").on("click", function () {
        localStorage.removeItem("login")
        localStorage.removeItem("userInfo")
        $(location).prop('href', '/')
    })
})
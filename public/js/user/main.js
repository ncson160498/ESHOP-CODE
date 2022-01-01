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

    $('.LogoutHeaderButton').click(()=>{
        localStorage.clear()
        $(location).prop('href', '/auth/logout')
    })

    $('#button_search').click(()=>{
        let textSearch = $("#text_search").val()
        document.location.href = `/product/?search=${textSearch}`
    })

   
    
})

    $(document).ready(function () {
        // $("#number_item_in_cart").innerHTML = localStorage.getItem('cart') || 0
        let item = +localStorage.getItem('cart')
        console.log(item)
        $("#button_add_cart").on("click", function () {   
            alert("hic")   
            //$(location).prop('href', '/')
            localStorage.setItem('cart', item + 1)
            $("#number_item_in_cart").innerHTML = item + 1
        })
    })


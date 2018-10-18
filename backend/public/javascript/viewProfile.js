$(function () {
    $("viewProfile").click(function(){
        window.location.href = '/viewProfile?name='+$("#username").val()
    });

})




window.onload = function(){
    $("#loader-wrapper").fadeOut(700);
    setTimeout(function(){
        document.getElementById("fadein").remove();
    },1000);
};
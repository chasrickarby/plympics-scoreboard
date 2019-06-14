var index = 0;
var imagesArray = ["images/keanu.gif",
                   "images/doggo.gif",
                   "images/snugz.gif",
                   "images/cannot.gif",
                   "images/winning.gif",
                   "images/shia.gif",
                   "images/booty.gif",
                   "images/rekt.gif",
                   "images/wiggle.gif",
                   "images/rick.gif",
                   "images/excite.gif",
                   "images/birthdaysmash.gif",
                   "images/gurl.gif"];
var background1 = $("#background1"),
    background2 = $("#background2");

setInterval(changeImage, 10000);

function changeImage(){
    // console.log("url('"+ imagesArray[index] +"?t=" + new Date().getTime() +  "')");
    $("#background2").css("background","url('"+ imagesArray[index] +"?t=" + new Date().getTime() +  "')");
    background1.hide();

    index++;
    if(index >= imagesArray.length){
        index = 0;
    }
    background1.css("background","url('"+ imagesArray[index] +"?t=" + new Date().getTime() + "')");
    background1.fadeIn();
}

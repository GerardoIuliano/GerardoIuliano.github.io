function nextImage(idImg, i){
    const body = document.body
    srcImg = document.getElementById(idImg).getAttribute("src")
    end = srcImg.indexOf(".")
    numImg = srcImg.substring(11,end) // 1.png
    console.log(numImg);
    numImg= (numImg % 4) + i
    console.log(numImg);
    document.getElementById(idImg).setAttribute("src", "assets/img/"+numImg+".png")
}

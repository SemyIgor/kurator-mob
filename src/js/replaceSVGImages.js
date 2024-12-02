// Функция преобразования svg-image в svg - текст
function replaceSVGImages() {
  var images = document.querySelectorAll("img[data-svg]");
  images.forEach(function (img) {
    var imgID = img.getAttribute("id");
    var imgClass = img.getAttribute("class");
    var imgURL = img.getAttribute("src");

    var xhr = new XMLHttpRequest();
    xhr.open("GET", imgURL);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = xhr.responseText;
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(response, "text/xml");
        var svg = xmlDoc.querySelector("svg");

        if (imgID) {
          svg.setAttribute("id", imgID);
        }
        if (imgClass) {
          svg.setAttribute("class", imgClass + " replaced-svg");
        }
        svg.removeAttribute("xmlns:a");

        img.parentNode.replaceChild(svg, img);
      }
    };
    xhr.send();
  });
}

export default replaceSVGImages;

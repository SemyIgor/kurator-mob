import replaceSVGImages from "./replaceSVGImages.js";
import redButtonWidth from "./components/redButtonWidth.js";
import shadow from "./components/shadow.js";
import shadowBottom from "./components/shadow_bottom.js";
import shadowTop from "./components/shadow-top.js";
import shadowFade from "./components/shadow_fade.js";

replaceSVGImages();
redButtonWidth();
shadow();
shadowBottom();
shadowTop();
shadowFade();

// if (
//     /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
//         navigator.userAgent
//     )
// ) {
//     alert("Вы используете мобильное устройство (телефон или планшет).");
// } else alert("Вы используете ПК.");

export default function redButtonWidth() {
    // Выбираем элемент, ширину которого хотим отслеживать
    const elements = document.querySelectorAll('[class*="-btn"].switch');

    // Функция для обновления ширины
    function updateWidth() {
        elements.forEach((element) => {
            if (element.clientWidth < 230) {
                element.firstElementChild.style.display = "none";
                element.lastElementChild.style.display = "block";
            } else if (element.clientWidth >= 230) {
                element.firstElementChild.style.display = "block";
                element.lastElementChild.style.display = "none";
            }
        });
    }

    // Добавляем обработчик события на изменение размера окна
    window.addEventListener("resize", updateWidth);

    // Добавляем обработчик события на загрузку DOM
    document.addEventListener("DOMContentLoaded", updateWidth);
}

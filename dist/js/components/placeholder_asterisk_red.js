// Метод не используется
export default function placeholderAsteriskRed() {
    const questionFormName = document.querySelector(".question-form__name");

    const questionFormPhone = document.querySelector(".question-form__phone");

    document.addEventListener("DOMContentLoaded", function () {
        const input = document.querySelector(".question-form__name");
        const placeholder = input.getAttribute("placeholder");
        console.log("placeholder: ", placeholder);
        const words = placeholder.split(" ");

        input.setAttribute("placeholder", "");

        words.forEach((word, index) => {
            const span = document.createElement("span");
            span.textContent = word;
            span.style.position = "absolute";
            span.style.color = span.textContent === "*" ? "red" : "black"; // Изменяем цвет второго слова
            input.parentElement.insertBefore(span, input);
        });
    });
}

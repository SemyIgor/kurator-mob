export default function shadowBottom() {
    // Находим нижнее тёмное окно
    const shadowBottomBg = document.querySelector(".shadow-bottom");

    // Убедившись, что страница загружена, вызываем сообщение о cookie
    document.addEventListener("DOMContentLoaded", function () {
        // Проверяем, нажимались ли ранее кнопки в cookie-окне
        let accepted = localStorage.getItem("accepted");
        let discard = localStorage.getItem("discard");

        // Если нет, то показываем окно cookie
        if (!(accepted || discard)) {
            displayCookieWindow();
            showShadow();
        }
    });
    // console.log("Утвердительно !");

    // Функция "включения" окна-сообщения об использовании cookie
    function displayCookieWindow() {
        const cookieWindow = shadowBottomBg.querySelector(".cookie-window");
        cookieWindow.classList.remove("display--none");

        // Находим кнопку "Принять"
        const acceptButton = cookieWindow.querySelector(".red-btn");

        // Подключаем к кнопке "Принять" событие
        acceptButton.addEventListener("click", (event) => {
            event.preventDefault();

            // Запоминаем, что нажали "Принять" и сохраняем в localStorage
            let accepted = true;
            localStorage.setItem("accepted", accepted);

            // Закрываем все окна внутри shadow
            closeAllShadowChildren();
            // Убираем "тень"
            hideShadow();
            acceptProcedure();
        });

        // Находим кнопку "Отказаться"
        const discardButton = cookieWindow.querySelector(".red-border-btn");

        // Подключаем к кнопке "Отказаться" событие
        discardButton.addEventListener("click", (event) => {
            event.preventDefault();

            // Запоминаем, что нажали "Отказаться" и сохраняем в localStorage
            let discard = true;
            localStorage.setItem("discard", discard);

            // Закрываем все окна внутри shadow
            closeAllShadowChildren();
            // Убираем "тень"
            hideShadow();
            discardProcedure();
        });
    }

    // Показываем затемнённое окно
    function showShadow() {
        shadowBottomBg.classList.add("shadow-bottom--shown");
        document.body.style.overflow = "hidden";

        // Отслеживаем нажатие на "тень" окно:
        shadowBottomBg.addEventListener("click", (event) => {
            checkToCloseShadow();
        });
    }

    // Проверяем нажатие на "тень" и убираем её, если клик был за пределами всплывающего "окна" ("всплытие" обнаружило класс контейнера "тени" а не "окна")
    function checkToCloseShadow() {
        const bodyLimit = document.querySelector("body");

        bodyLimit.addEventListener("click", (event) => {
            if (
                event.target.classList.contains("shadow-bottom__container") ||
                event.target.classList.contains("shadow-bottom")
            ) {
                // Закрываем все окна внутри shadow
                closeAllShadowChildren();
                // Убираем "тень"
                hideShadow();
            }
        });
    }

    // Функция закрытия всех окон - детей shadow
    function closeAllShadowChildren() {
        const shadowChilds = shadowBottomBg.querySelectorAll(".shadow-child");
        if (shadowChilds.length > 0) {
            shadowChilds.forEach((child) => {
                child.classList.add("display--none");
            });
        }
    }

    // Функция ухода "тени"
    function hideShadow() {
        shadowBottomBg.classList.remove("shadow-bottom--shown");
        document.body.style.overflow = "";
    }

    // Функция обработки принятия cookie
    function acceptProcedure() {
        console.log("Использование cookie согласовано");
    }

    // Функция обработки отклонения cookie
    function discardProcedure() {
        console.log("Использование cookie отклонено");
    }
}

export default function shadowTop() {
    // Находим иконку бургера
    const headerBurger = document.querySelector(".header .burger");

    // Находим верхнее тёмное окно
    const shadowTopBg = document.querySelector(".shadow-top");

    // Проверяем, есть ли иконка бургера на текущей странице
    if (headerBurger) {
        // Подключаем "слушатель" к иконке бургера
        headerBurger.addEventListener("click", (event) => {
            event.preventDefault();

            displayBurgerWindow();
            showShadow();
        });
    } else {
        console.log("Нет иконки бургера");
    }

    // Функция "включения" окна с бургер-меню
    function displayBurgerWindow() {
        const burgerWindow = shadowTopBg.querySelector(".burger-window");

        burgerWindow.classList.remove("display--none");
        burgerWindow.classList.add("display--flex");

        // Обработка крестика закрытия окна
        crossToCloseWindow(burgerWindow);
    }

    // Функция закрытия окна по клику на крестик
    function crossToCloseWindow(popUp) {
        // Находим крестик закрытия окна и подключаем слушатель
        const crossClose = popUp.querySelector(".cross-close");
        crossClose.addEventListener("click", (event) => {
            popUp.classList.remove("display--flex");
            popUp.classList.add("display--none");
            hideShadow();
        });
    }

    // Показываем затемнённое окно
    function showShadow() {
        shadowTopBg.classList.add("shadow-top--shown");
        document.body.style.overflow = "hidden";

        // Отслеживаем нажатие на "тень" окно:
        shadowTopBg.addEventListener("click", (event) => {
            checkToCloseShadow();
        });
    }

    // Проверяем нажатие на "тень" и убираем её, если клик был за пределами всплывающего "окна" ("всплытие" обнаружило класс контейнера "тени" а не "окна")
    function checkToCloseShadow() {
        const bodyLimit = document.querySelector("body");

        bodyLimit.addEventListener("click", (event) => {
            if (
                event.target.classList.contains("shadow-top__container") ||
                event.target.classList.contains("shadow-top")
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
        const shadowChilds = shadowTopBg.querySelectorAll(".shadow-child");
        if (shadowChilds.length > 0) {
            shadowChilds.forEach((child) => {
                child.classList.remove("display--flex");
                child.classList.remove("display--block");
                child.classList.add("display--none");
            });
        }
    }

    // Функция ухода "тени"
    function hideShadow() {
        shadowTopBg.classList.remove("shadow-top--shown");
        document.body.style.overflow = "";
    }
}

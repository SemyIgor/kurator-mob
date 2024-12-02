export default function shadow() {
    // Находим иконку бургера
    const headerBurger = document.querySelector(".header .burger");

    // Находим тёмное окно
    const shadowBg = document.querySelector(".shadow");

    // Находим кнопки "Заказать звонок" (на перспективу, вдруг будет не одна)
    const callMeButtons = document.querySelectorAll(".call-me-btn");

    // === Модуль работы с окном заказа звонка ========================

    if (callMeButtons.length > 0) {
        callMeButtons.forEach((btn) => {
            btn.addEventListener("click", (event) => {
                event.preventDefault();
                showToOrderCallWindow();
            });
        });
    }

    // Функция вывода на экран окна заказа звонка
    function showToOrderCallWindow() {
        displayCallOrderWindow();
        showShadow();
    }

    // Функция "включения" окна заказа звонка
    function displayCallOrderWindow() {
        const orderCallWindow = shadowBg.querySelector(".call-order-window");
        orderCallWindow.classList.remove("display--none");

        // Обработка крестика закрытия окна
        crossToCloseWindow(orderCallWindow);

        // Находим кнопку отправки формы заказа звонка
        const orderCallButton = orderCallWindow.querySelector(".red-btn");
        orderCallButton.addEventListener("click", (event) => {
            event.preventDefault();
            // Закрываем открытые формы
            closeAllShadowChildren();
            // Открываем окно подтверждение заказа на звонок
            displayOrderAcceptedWindow();
        });
    }

    // Функция "включения" окна сообщения о принятии заказа на звонок
    function displayOrderAcceptedWindow() {
        const orderAcceptWindow = shadowBg.querySelector(
            ".order-accepted-window"
        );
        orderAcceptWindow.classList.remove("display--none");

        // Обработка крестика закрытия окна
        crossToCloseWindow(orderAcceptWindow);
    }

    // Функция закрытия окна по клику на крестик
    function crossToCloseWindow(popUp) {
        // Находим крестик закрытия окна и подключаем слушатель
        const crossClose = popUp.querySelector(".cross-close");
        crossClose.addEventListener("click", (event) => {
            popUp.classList.add("display--none");
            hideShadow();
        });
    }

    // --- Конец модуля работы с окном заказа звонка

    // === Модуль работы с "тенью" ======================================

    // Показываем затемнённое окно
    function showShadow() {
        shadowBg.classList.add("shadow--shown");
        document.body.style.overflow = "hidden";

        // Отслеживаем нажатие на "тень" окно:
        shadowBg.addEventListener("click", (event) => {
            checkToCloseShadow();
        });
    }

    // Проверяем нажатие на "тень" и убираем её, если клик был за пределами всплывающего "окна" ("всплытие" обнаружило класс контейнера "тени" а не "окна")
    function checkToCloseShadow() {
        const bodyLimit = document.querySelector("body");

        bodyLimit.addEventListener("click", (event) => {
            if (
                event.target.classList.contains("shadow__container") ||
                event.target.classList.contains("shadow")
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
        const shadowChilds = shadowBg.querySelectorAll(".shadow-child");
        if (shadowChilds.length > 0) {
            shadowChilds.forEach((child) => {
                child.classList.add("display--none");
            });
        }
    }

    // Функция ухода "тени"
    function hideShadow() {
        shadowBg.classList.remove("shadow--shown");
        document.body.style.overflow = "";
    }

    // --- Конец модуля работы с тенью
}

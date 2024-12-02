// 1. Добавлен пакет del функция deleteAsync в замен gulp-clean
// 2. Добавлен пакет gulp-replace для удаления "../../" в html
// 3. Решена проблема с искажением изображений в dist

// Импорт плагинов пакета Gulp
import { src, dest, watch, parallel, series } from "gulp";

// Импорт плагинов обработки файлов препроцессора SCSS
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
const scss = gulpSass(dartSass);

// Импорт плагина объединения нескольких файлов в один,
// и сжатия и переименования итогового файла
import concat from "gulp-concat";

// Импорт плагина обработки файлов js
import ugly from "gulp-uglify-es";
const uglify = ugly.default;

// Импорт плагина локального сервера
import bSync from "browser-sync";
const browserSync = bSync.create();

// Импорт плагина добавления префиксов для совместимости версий
import autoprefixer from "gulp-autoprefixer";

// Импорт плагина объединения файлов
import include from "gulp-file-include";

// Импорт плагина удаления файлов (папки dist командой gulp build)
import { deleteAsync } from "del";

// Импорт плагина удаления строк из файлов
import replace from "gulp-replace";

// Импорт плагина GitHub Pages
import ghPages from "gh-pages";

import path from "path";

// Команда опубликования (деплоя) сайта на GitHub Pages
export const deploy = (cb) => {
    ghPages.publish(path.join(process.cwd(), "/dist"), cb);
};

// Функция работы с файлами стилей (.scss)
export const styles = () => {
    return (
        src("src/**/*.scss")
            .pipe(concat("style.css"))
            .pipe(
                autoprefixer({
                    overrideBrowserslist: ["last 10 versions"],
                    cascade: false,
                })
            )
            // .pipe(scss({ outputStyle: 'compressed' })) /* Если нужен сжатый style.css */
            .pipe(scss())
            .pipe(dest("src/css"))
            .pipe(browserSync.stream())
    );
};

// Обрабатываем JS файлы (просто подключаем к серверу)
export const scripts = () => {
    return src("src/js/*.js").pipe(browserSync.stream());
};

// ВНИМАНИЕ ! Данная функция html, по окончании своей работы,
// запускает функцию html_index. Поэтому, функция html_index
// не включена в поток экспорта
// Собираем html-файлы и перемещаем результат в папку 'src'
export const html = () => {
    return src(["src/html_pages/*.html"])
        .pipe(include({ prefix: "@@" }))
        .pipe(replace("../../", ""))
        .pipe(dest(["src"]))
        .pipe(browserSync.stream());
};

// Перезаписываем запускающий файл index.html в корне проекта
export const html_index = () => {
    return src("src/main.html")
        .pipe(concat("index.html"))
        .pipe(dest("src/"))
        .pipe(browserSync.stream());
};

// Функция наблюдателя за изменениями проекта
export const watching = () => {
    watch(["src/**/*.scss"], styles);
    watch(["src/js/*.js"], scripts);
    watch(["src/html_pages/**/*.html"], html);
    watch(["src/main.html"], html_index);
};

// Функция локального сервера
export const browsersync = () => {
    browserSync.init({
        server: {
            baseDir: "src/",
        },
    });
};

// Функция очистки директории от файлов деплоя
export const cleanDist = () => {
    return deleteAsync(["dist/**", "!dist"], { dot: false });
};

// Функция формирования папок и файлов деплоя из src (css, js, html, fonts)
export const building = () => {
    return src(
        [
            "src/css/*.css",
            "src/js/**/*.js",
            // 'src/js/main.min.js',
            "src/*.html",
            // 'src/index.html',
            "src/fonts/*.*",
        ],
        { base: "src" }
    ).pipe(dest("dist"));
};

// Функция копирования папки images из папки src в dist
export const buildImg = () => {
    return src(["src/images/**/*.*"], { base: "src", encoding: false }).pipe(
        dest("dist")
    );
};

// Команда последовательного запуска функций формирования папки деплоя
export const build = series(cleanDist, building, buildImg);

// Функции, запускаемые по команде gulp
export default parallel(styles, scripts, html, browsersync, watching);

// Второй вариант функции с выделением последовательного формирования html
// export default parallel(
// 	styles,
// 	scripts,
// 	series(html, html_index),
// 	browsersync,
// 	watching
// );

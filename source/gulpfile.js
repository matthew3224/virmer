import gulp from 'gulp';
import plumber from 'gulp-plumber'; // модуль защиты от 'падения' в случае ошибки. Обработка ошибок (error handling)
import notify from 'gulp-notify';
import sourcemap from 'gulp-sourcemaps';
import rename from 'gulp-rename'; // переименование файлов
import replace from 'gulp-replace'; // поиск и замена, регулярка
import gulprimraf from 'gulp-rimraf';
//import del from 'del'; // удаление файлов и папок - перестало работать в 2022
import {deleteAsync} from "del"
export const reset = () => {
  return deleteAsync([path.production.base], {force: true})
}
import ttfWoff from 'gulp-ttf2woff';
import ttfWoff2 from 'gulp-ttf2woff2';
import otfTtf from 'gulp-fonter'; // from OTF to TTF
import concat from 'gulp-concat'; // сборка файлов в один
import cleanCSS from 'gulp-clean-css'; // минификация css

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

import media from 'gulp-group-css-media-queries'; // группировка css media
import postcss from 'gulp-postcss';
import prefix from 'gulp-autoprefixer';
import inlineimage from 'gulp-inline-image';
import imagemin from 'gulp-imagemin'; // оптимизация изображений
import cache from 'gulp-cache'; // кэширование изображений, которые проходили через imagemin
import svgstore from 'gulp-svgstore'; // sprite svg
import webp from 'gulp-webp'; // convert to webP
import webpHTML from 'gulp-webp-html'; // include to html
import assets from 'postcss-assets';
import postHTML from 'gulp-posthtml';  // подключение html
import include from 'posthtml-include'; // вставка в DOM дерево
import htmlmin from 'gulp-htmlmin'; // минификация html
// import rigger from 'gulp-rigger'; // разбивка html на кусочки (для шаблонизации)
import print from 'gulp-print';
import babel from 'gulp-babel';
import terser from 'gulp-terser'; // минификация js
import pngquant from 'imagemin-pngquant';

const path = {
  assets: { // Откуда брать исходники
    base: 'assets/',
    copy: [
      'assets/fonts/**/*.{woff,woff2}',
      'assets/img/**/*',
    ],
    fonts: 'assets/fonts/**/*.ttf',
    html: ['assets/**/*.html', '!assets/**/_*.html', '!assets/templates/**/*.html'],
    css: 'assets/sass/style.scss',
    sass: 'assets/sass/**/*.{scss,sass}',
    js: [
      'assets/js/*.js',
      '!assets/js/**/*.min.js',
      '!assets/js/**/_*.js',
      // '!assets/js/modx/*.js'
    ],
    // jsModx: 'assets/js/modx/*.js',
    json: ['assets/**/*.json'],
    img: 'assets/img/**/*.{jpg,jpeg,png,gif,svg}',
    webp: 'assets/img/**/*.{jpg,jpeg,png}',
    faviconImg: 'assets/favicon/**/*.{jpg,jpeg,png,svg}',
    faviconFile: ['assets/favicon/**/*.*', '!assets/favicon/**/*.{jpg,jpeg,png,svg}'],
    sprite: ['assets/img/**/ico{n,ns}-*.svg', '!assets/img/icons/unnecessary/*.svg'],
    libs: [
      'node_modules/lottie-web/build/player/lottie.min.js',
      //'node_modules/smooth-scrollbar/dist/smooth-scrollbar.js', // http://idiotwu.github.io/smooth-scrollbar/
      'node_modules/inputmask/dist/inputmask.min.js',
      'node_modules/sticky-sidebar/dist/sticky-sidebar.min.js',
      'assets/js/libs/*.*',
      '!assets/js/libs/unnecessary/*.*' // исключить все файлы в этой папке
    ]
  },
  production: { // Куда складывать готовые файлы после сборки
    base: '../www/',
    copy: '../www/',
    fonts: '../www/fonts/',
    html: '../www/',
    css: '../www/assets/css/',
    libs: '../www/assets/js/libs/',
    js: '../www/assets/js/',
    json: '../www/assets/data/',
    img: '../www/img/',
    favicon: '../www/'
  },
};

let assetsDir = 'assets/';
// let outputDir = 'dist/';
let buildDir = 'build/';
let productionDir = '../www/assets/';

// let resourceCacheDir = '../www/core/cache/resource/';
// let pdoToolsCacheDir = '../www/core/cache/default/pdotools/';
// let snippetsCacheDir = '../www/core/cache/includes/elements/modsnippet/';
// let scriptsCacheDir = '../www/core/cache/scripts/elements/modsnippet/';
// let templatesDir = '../www/core/components/gitmodx/elements/templates/';
// let snippetsDir = '../www/core/components/gitmodx/elements/snippets/';
// let chunksDir = '../www/core/components/gitmodx/elements/chunks/';

//----------------------------------------------------Compiling

// export const copyToModxTemplates = () => {
//   return gulp.src([path.assets.base + '*.html'])
//     .pipe(rename((path) => {
//       path.extname = '.tpl'
//       //path.basename += '_new';
//     }))
//     .pipe(replace(/(src|href)=('|")(img|images|js|styles|fonts)/gi, '$1=$2assets/$3'))
//     .pipe(replace(/(url\()(['"])(img|images|js|styles|fonts)/gi, '$1$2assets/$3'))
//     .pipe(gulp.dest(templatesDir));
// };

export const clean = () => {
  return reset();
};

export const copy = () => {
  return gulp.src(path.assets.copy, {
    base: 'assets'
  })
    // .pipe(gulp.dest(path.dist.copy))
    .pipe(gulp.dest(path.production.copy));
};

export const fonts = () => {
  gulp.src(path.assets.fonts)
    .pipe(ttfWoff())
    // .pipe(gulp.dest(path.dist.fonts))
    .pipe(gulp.dest(path.production.fonts));
  return gulp.src(path.assets.fonts)
    .pipe(ttfWoff2())
    // .pipe(gulp.dest(path.dist.fonts))
    .pipe(gulp.dest(path.production.fonts));
};

export const html = () => {
  return gulp.src(path.assets.html)
    .pipe(plumber())
    //.pipe(webpHTML())
    .pipe(gulp.dest(path.production.html));
};

export const css = () => {
  return gulp.src(path.assets.css)
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass().on('error', notify.onError({
        message: "<%= error.message %>",
        title: "Sass Error!"
      }))
    )
    //.pipe(purify([productionDir + 'js/**/*', outputDir + '**/*.html'])) // размер значительно уменьшается
    .pipe(inlineimage())
    .pipe(media())
    .pipe(prefix('last 3 versions'))
    .pipe(postcss([assets({
      basePath: 'www/',
      loadPaths: ['img/']
    })]))
    // .pipe(gulp.dest(path.dist.css))
    .pipe(gulp.dest(path.production.css))
    .pipe(cleanCSS())
    .pipe(rename(function (path) {
      path.extname = '.min.css';
    }))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest(path.production.css));
};

export const libs = () => {
  return gulp.src(path.assets.libs)
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(terser())
    .pipe(concat('libs.min.js'))
    .pipe(sourcemap.write('.'))
    // .pipe(gulp.dest(path.dist.libs))
    .pipe(gulp.dest(path.production.libs));
};

export const js = () => {
  return gulp.src(path.assets.js)
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(terser())
    .pipe(rename({suffix: '.min'}))
    // .pipe(gulp.dest(path.dist.js)) // отправляем минифицированные файлы в dist
    .pipe(concat('all.min.js')) // соединяем все файлы в один
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest(path.production.js));
};

// export const jsCopy = () => {
//   return gulp.src(path.assets.jsModx)
//     .pipe(gulp.dest(path.production.js));
// };

export const json = () => {
  return gulp.src(path.assets.json)
    // .pipe(gulp.dest(path.dist.json))
    .pipe(gulp.dest(path.production.json));
};

export const images = () => {
  return gulp.src(path.assets.img)
    .pipe(plumber())
    .pipe(cache(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      interlaced: true,
      optimizationLevel: 3 // 0 to 7
    })))
    // .pipe(gulp.dest(path.dist.img))
    .pipe(gulp.dest(path.production.img));
};

export const webpImg = () => {
  return gulp.src(path.assets.webp)
    .pipe(webp({quality: 90}))
    // .pipe(gulp.dest(path.dist.img))
    .pipe(gulp.dest(path.production.img));
};

export const favicon = () => {
  gulp.src(path.assets.faviconImg)
    .pipe(plumber())
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      interlaced: true,
      optimizationLevel: 3 // 0 to 7
    }))
    // .pipe(gulp.dest(path.dist.favicon))
    .pipe(gulp.dest(path.production.favicon));
  return gulp.src(path.assets.faviconFile)
    // .pipe(gulp.dest(path.dist.favicon))
    .pipe(gulp.dest(path.production.favicon));
};

export const sprite = () => {
  return gulp.src(path.assets.sprite)
    .pipe(svgstore({
      inlineSvg: true
    }))
    //.pipe(svgmin())
    .pipe(rename('sprite.svg'))
    // .pipe(gulp.dest(path.dist.img))
    .pipe(gulp.dest(path.production.img))
    //.pipe(rename('.tpl'))

    // .pipe(rename((path) => {
    //   path.extname = '.tpl'
    // }))

    // .pipe(gulp.dest(chunksDir + 'common'));
};

// export const includeSprite = () => {
//   return gulp.src(chunksDir + 'common/b.header.tpl')
//     .pipe(postHTML([
//       include()
//     ]))
//     .pipe(gulp.dest(chunksDir + 'common/b.header.tpl'));
// };

//watching files and run tasks
export const watch = () => {
  gulp.watch(path.assets.sass, gulp.series(css));
  gulp.watch(path.assets.js, gulp.series(js));
  gulp.watch(path.assets.json, gulp.series(json));
  gulp.watch(path.assets.img, gulp.series(images));
  gulp.watch(path.assets.sprite, gulp.series(sprite));
  gulp.watch(path.assets.html, gulp.series(html));
  // gulp.watch(templatesDir + '**/*.tpl', gulp.series(cleanResourcesCache, cleanPdotoolsCache, cleanSnippetsCache));
  // gulp.watch(chunksDir + '**/*.tpl', gulp.series(cleanResourcesCache, cleanPdotoolsCache, cleanSnippetsCache));
  // gulp.watch(snippetsDir + '**/*.php', gulp.series(cleanResourcesCache, cleanPdotoolsCache, cleanSnippetsCache));
  gulp.watch([
    //'assets/fonts/**/*',
    'assets/img/**/*'
  ], gulp.series('copy'));
};

//MODX CLEAN CACHE
// export const cleanResourcesCache = () => {
//   return gulp.src(resourceCacheDir + '*', {read: false})
//     .pipe(gulprimraf({force: true}));
// };

// export const cleanPdotoolsCache = () => {
//   return gulp.src(pdoToolsCacheDir + '**/*.php', {read: false})
//     .pipe(gulprimraf({force: true}));
// };

// export const cleanSnippetsCache = () => {
//   return gulp.src(snippetsCacheDir + '*', {read: false})
//     .pipe(gulprimraf({force: true})) && gulp.src(scriptsCacheDir + '*', {read: false})
//     .pipe(gulprimraf({force: true}));
// };

// Default
export default gulp.series(

  clean,
  copy,
  gulp.parallel(
    fonts,
    css,
    js,
    libs,
    json,
    html,
    // jsCopy,
    images,
    webpImg,
    favicon,
    sprite
  ),
  watch
);

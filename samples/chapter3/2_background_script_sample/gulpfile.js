const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const Fiber = require('fibers');
gulpSass.compiler = require('sass');
const del = require('del');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

// distの削除
 function clean(cb) {
     del.sync('./dist');
     cb();
}

// ファイルコピー
function copy() {
    return gulp.src([
        './src/**/*.*', '!src/sass/**/*.scss', '!src/**/*.ts'
      ], {
        base: './src'
      })
      .pipe(gulp.dest('./dist'));
}

// sassのコンパイル
function sass() {
    return gulp.src('./src/sass/*.scss')
    .pipe(
        gulpSass({
          fiber: Fiber,
          outputStyle: 'compressed',
        })
    )
    .pipe(gulp.dest('./dist/css'))
}

// TypeScriptのトランスパイル
function script() {
    return gulp.src('./src/ts/**/*.ts')
    .pipe(tsProject())
    .js.pipe(gulp.dest('./dist/js'));
}

// ServiceWorkerのトランスパイル
function service_worker() {
    return gulp.src('./src/*.ts')
    .pipe(tsProject())
    .js.pipe(gulp.dest('./dist'));
}

const build = gulp.series (
    clean,
    gulp.parallel(
        copy,
        sass,
        script,
    ),
    service_worker,
);

exports.clean = clean;
exports.copy = copy;
exports.sass = sass;
exports.script = script;
exports.build = build;
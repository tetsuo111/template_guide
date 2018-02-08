var gulp = require('gulp'); // gulpを読み込む
var uglify = require('gulp-uglify'); // gulp-uglifyを読み込む

// 「uglify」タスクを定義する
gulp.task('uglify', function () {
  // タスクを実行するファイルを指定
  gulp.src('js/js-index.js')
    // 実行する処理をpipeでつないでいく
    .pipe(uglify()) // uglifyを実行
    .pipe(gulp.dest('dist')) // 圧縮したファイルをdistに出力
});
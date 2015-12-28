var gulp=require('gulp'),
	sass=require('gulp-sass'),
	autoprefixer=require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    notify = require("gulp-notify"),
    plumber = require('gulp-plumber'),//zapobiego przerwaniu watch


    path = 'style',
    imgpath = 'img',

   
    browserSync = require('browser-sync'),
    reload=browserSync.reload;
    
    


//funkcja komilująca css z sass dodająca prefixy do przeglądarek i zmniejszająca

gulp.task('styles', function() {
   gulp.src('scss/*.scss')
    .pipe(plumber(
        {
        handleError: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(sass({ 
        style: 'expanded'
    }))
    .pipe(autoprefixer('last 3 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(gulp.dest(path))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(path))
    .pipe(reload({stream:true}))// tutaj załączamy odświeżanie przeglądarski za pomocą browser sync, zawsze na końcu
});

//HTML TASK
gulp.task('html',function(){
    gulp.src('./*.html')
    .pipe(reload({stream:true}))
});


//BROWSER TASK
gulp.task('browser-sync',function(){
     browserSync({
        server:{
            baseDir:"./"  //folder główny z plikiem index
        }
     });
});

gulp.task('script',function() {
    console.log('siema koles');
});

//WATCH task

gulp.task('watch',function(){
    gulp.watch('scss/**/*.scss',['styles']); // deklaracja które pliki obserwować a w [] który skryp odpalić po zanotowaniu zmian.
    gulp.watch('./*.html',['html']);
});

//DEFAULT task, podać które taki mają się odpalać po wpisaniu "gulp" w command line
gulp.task('default',['script','styles','html','browser-sync','watch'])
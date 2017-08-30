//gulp = require('gulp')
var webpack = require('webpack');
//require('shelljs/global')
fs = require('fs')
var webpackconf = require('./webpack.config')

function start () {
    webpack(webpackconf).watch({
        aggregateTimeout:5000,
        poll:true
    },(err,stats)=>{
        process.stdout.write(stats.toString({
            colors:true,
            modules:false,
            children:true,
            chunks:true,
            chunkModules:true
        }))
    })
}
start()

// gulp.task('default',['watch'])
//
// gulp.task('watch',function () {
//     gulp.watch(['./src/langs/**/*.js'],start())
//
// })








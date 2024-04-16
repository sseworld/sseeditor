var iconPackager = require("@ephox/oxide-icons-tools").iconPackager;
var clean = require("gulp-clean");
var gulp = require("gulp");
var gulpTouch = require('gulp-touch');

gulp.task("icon-packager", function () {
  return iconPackager({ name: "default" }).then((packagedIcons) => {
    return gulp.src('empty.txt') // Add allowEmpty option
      .pipe(gulp.dest("dist"))
  });
});


// gulp.task("icon-packager", function () {
//   return gulp
//     .src("src/svg/**/*.svg")
//     .pipe(iconPackager({ name: "default" }))
//     .pipe(gulp.dest("dist"));
// });

// gulp.task("icon-packager", function () {
//   return iconPackager({ name: "default" }).then((packagedIcons) => {
//     // Assuming iconPackager returns a promise
//     return gulp
//       .src("empty.txt") // Create an empty file (optional)
//       .pipe(gulp.dest("dist"))
//       .on("end", () => {
//         // Write packagedIcons to 'dist/default.json' (or your desired file)
//         // You'll need additional logic to write the data appropriately
//         console.log("Icons packaged successfully!");
//       });
//   });
// });

gulp.task("clean", function () {
  return gulp
    .src("./dist", {
      read: false,
      allowEmpty: true,
    })
    .pipe(clean());
});

gulp.task("default", gulp.series("clean", "icon-packager"));

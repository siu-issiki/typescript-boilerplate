var glob = require('glob');
var pattern = '__tests__/**/**.test.ts';
var parallelism = process.argv[2];
var index = process.argv[3];

glob(pattern, function(err, fileNameArr) {
  var filteredFileNameArr = fileNameArr.filter(function(e, i) {
    return i % parallelism == index;
  });
  console.log(filteredFileNameArr.join(' '));
});

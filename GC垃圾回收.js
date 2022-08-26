function getMemory() {
  const memory = process.memoryUsage();
  console.log(`总：${(memory.heapTotal / 1024 / 1024).toFixed(2)}MB，使用：${(memory.heapUsed / 1024 / 1024).toFixed(2)}MB`);
}

// let size = 20 * 1024 * 1024;

// function CreatBigObj() {
//   let arr = new Array(size);
//   //   let arr1 = new Array(size);
//   //   let arr2 = new Array(size);
//   //   let arr3 = new Array(size);
//   //   let arr4 = new Array(size);
//   return arr;
// }

// let arr = [];

let str = '';
for (let i = 0; i < 1000000; i++) {
  str += `var a${i} = '';`;
//   str += `var a${i} = null;`;

  //   arr.push(CreatBigObj());
  //   CreatBigObj();
}

eval(str);
console.log(a0);
getMemory();

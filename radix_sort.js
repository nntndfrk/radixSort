export default function radixSort(arr) {
  let seniorRadix = calculateSeniorRadix(arr);
  let counter = 1;

  sort(arr);

  // recursive
  function sort(arr) {
    if (counter > seniorRadix) {
      console.log('qwe', arr);
      return arr;
    }

    let workList = createWorkList();
    console.log(counter);

    let outArr = [];

    arr.forEach(num => {
      workList[
        String(zfill(num, seniorRadix).slice(-counter)[0])
      ].unshift(num);
    });

    for (let i = 0; i < 10; i++) {
      let cell = workList[String(i)];
      if (cell.length !== 0 && (cell instanceof Array)) {
        cell.reverse().forEach(num => outArr.push(num));
      }
    }
    counter++;
    sort(outArr);
  }

  function calculateSeniorRadix(arr) {
    let seniorRadix = 0;
    arr.forEach(num => {
      let l = String(num).length;
      seniorRadix = (l > seniorRadix) ? l : seniorRadix;
    });
    return seniorRadix;
  }

  function zfill(num, size) {
    let s = String(num);
    while (s.length < size) { s = "0" + s; }
    return s;
  }

  function createWorkList() {
    let workList = {};
    for (let i = 0; i < 10; i++) {
      workList[String(i)] = [];
    }

    return workList;
  }
}

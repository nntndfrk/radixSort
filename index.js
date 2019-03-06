(() => {
  const inputTextArea = document.querySelector("#input-textarea"),
    outputTextArea = document.querySelector("#output-textarea"),
    runBtn = document.querySelector("#run"),
    clearBtn = document.querySelector("#clear"),
    notification = document.querySelector("#notification"),
    numOfEl = document.querySelector("#num-of-el");

  runBtn.addEventListener("click", () => {
    const inputArray = readData();
    if (inputArray) {
      const sortedArray = radixSort(inputArray, 0, inputArray.length - 1);
      outputTextArea.value = sortedArray.join(', ');
      numOfEl.innerHTML = inputArray.length;
    }
    let array = inputTextArea.value.split(",").map(i => Number(i));
    outputTextArea.value = radixSort(array).join(', ');
  });

  function main() {
    clearBtn.addEventListener('click', clearPreviousResults);
    inputTextArea.addEventListener('input', clearValidationErrors);
    inputTextArea.addEventListener('change', formatData);
  }


  function readData() {
    let inputArray = inputTextArea.value.replace(new RegExp('\n+', 'g'), '').split(',').map(item => parseInt(item));
    let isValid = true;
    inputArray.forEach(function(elem){
      if (isNaN(elem)){
        showErrorMsg('data does not match the format');
        isValid = false;
      }
    });
    return isValid ? inputArray : undefined;
  }

  function formatData() {
    let data = readData();

    if (data) {
      inputTextArea.value = data.join(', ');
    }
  }

  function showErrorMsg(msg) {
    notification.innerText = msg;
    notification.style.display = 'block';
    runBtn.classList.remove('is-primary');
    runBtn.classList.add('is-warning');
    inputTextArea.classList.add('is-warning');
  }

  function clearPreviousResults() {
    clearValidationErrors();
    inputTextArea.value = '';
    outputTextArea.value = '';
    numOfEl.innerText = '';
  }

  function clearValidationErrors() {
    notification.innerText = '';
    notification.style.display = 'none';
    runBtn.classList.remove('is-warning');
    runBtn.classList.add('is-primary');
    inputTextArea.classList.remove('is-warning');
  }

  main();
})();

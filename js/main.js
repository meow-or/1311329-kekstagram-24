const getRandomNumber = function (initialNumber, finiteNumber) {

  //если на вход попало отрицательное значение - преобразуем его

  if (initialNumber < 0) {
    initialNumber = -initialNumber;
  }
  if (finiteNumber < 0) {
    finiteNumber = -finiteNumber;
  }

  if (finiteNumber < initialNumber) {
    // если конец < начала - меняем их местами (не указано, что именно нужно придумать, поэтому я придумал поменять их местами.)

    const box = initialNumber;
    initialNumber = finiteNumber;
    finiteNumber = box;
  }
  // фрагмент с MDN
  initialNumber = Math.ceil(initialNumber);
  finiteNumber = Math.floor(finiteNumber);

  return (Math.floor(Math.random() * (finiteNumber - initialNumber + 1)) + initialNumber);
};

getRandomNumber(200, 15);


const checkCommentLength = function(comment, maxLength) {

  if (comment.length <= maxLength) {
    return true;
  }
  return false;
};

checkCommentLength('Функция для проверки максимальной длины строки', 140);

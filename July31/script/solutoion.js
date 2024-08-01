console.log('Taske #3');

function solution(S) {
  // making lowercase
  S = S.toLowerCase();

  /**
   * hanlde replacing minus with '-'
   */
  do {
    S = S.replace('minus', '-');
  } while (S.includes('minus'));

  /**
   * handle replace plus with '+'
   */
  do {
    S = S.replace('plus', '+');
  } while (S.includes('plus'));

  // return result
  return S;
}

console.log('1: ', solution('minusplusminus'));
console.log('2:', solution('plusminusminusplus'));

const MissionUtils = require("@woowacourse/mission-utils");
const { error, Console } = require("console");

class App {
  play() {
    startGame();
  }
}

module.exports = App;

function creatComputerAnswer() {
  const computerAnswer = [];
  while (computerAnswer.length < 3) {
    const number = MissionUtils.Random.pickNumberInRange(1, 9);
    if (!computerAnswer.includes(number)) {
      computerAnswer.push(number);
    }
  }
  return computerAnswer;
}

const isNumberRange = (playerAnswerElement) =>
  1 <= playerAnswerElement && playerAnswerElement <= 9;

const duplicateNumber = (playerAnswerElement, index) =>
  playerAnswer.indexOf(playerAnswerElement) === index;

function verifyPlayerAnswer(playerAnswer) {
  if (
    isNaN(playerAnswer) ||
    playerAnswer.length !== creatComputerAnswer.length ||
    playerAnswer.some(isNumberRange) ||
    0 < playerAnswer.filter(duplicateNumber).length
  ) {
    throw new Error("잘못된 값을 입력했습니다.");
  } else {
    compareAnswer(playerAnswer);
  }
}

function ball() {
  const ballArray = [];
  for (let i = 0; i < creatComputerAnswer.length; i++) {
    if (
      creatComputerAnswer[i] !== playerAnswer[i] &&
      creatComputerAnswer.includes(playerAnswer[i])
    ) {
      ballArray.push(i);
    }
  }
  return ballArray.length > 0 === true;
}

function strike() {
  const strikeArray = [];
  for (let i = 0; i < creatComputerAnswer.length; i++) {
    if (creatComputerAnswer[i] === playerAnswer[i]) {
      strikeArray.push(i);
    }
  }
  return (
    strikeArray.length > 0 && strikeArray.length > creatComputerAnswer === true
  );
}

function compareAnswer(playerAnswer) {
  if (ball()) {
    MissionUtils.Console.print(ballArray + "볼");
  }
  if (strike()) {
    MissionUtils.Console.print(strikeArray.length + "스트라이크");
  }
  if (!creatComputerAnswer.some((number) => playerAnswer.includes(number))) {
    MissionUtils.Console.print("낫싱");
  }
  if (creatComputerAnswer.every((number) => playerAnswer.includes(number))) {
    const gameEndString = `3 스트라이크
    3개의 숫자를 모두 맞히셨습니다! 게임 종료`;
    MissionUtils.Console.print(gameEndString);
  }
}

function startGame() {
  MissionUtils.Console.print("숫자 야구 게임을 시작합니다.");

  do {
    MissionUtils.Console.readLine("숫자를 입력해주세요.", (answer) => {
      const playerAnswer = answer.split("").map(Number);

      verifyPlayerAnswer(playerAnswer);
    });

    playerAnswer.splice(0);
  } while (creatComputerAnswer.every((num) => playerAnswer.includes(num)));

  MissionUtils.Console.Console.readLine(
    "게임을 다시 시작하려면 1, 종료하려면 2를 입력하세요.",
    reStartOrEnd
  );
}

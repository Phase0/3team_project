const quizData = [
  {
    question: 'HTML의 의미로 옳은 것은?',
    options: [
      'HyperText Markup Language',
      'HyperText Makeup Language',
      'HighText Machine Language',
      'HyperTransfer Markup Language',
    ],
    answer: ['HyperText Markup Language', 0], // 0
    description: 'HTML은 웹 페이지의 구조를 정의하는 마크업 언어입니다.',
  },
  {
    question: 'CSS의 주요 역할로 가장 적합한 것은?',
    options: [
      '웹페이지의 구조를 설계',
      '웹페이지의 콘텐츠 작성',
      '웹페이지의 스타일 및 레이아웃 설정',
      '데이터베이스 관리',
    ],
    answer: ['웹페이지의 스타일 및 레이아웃 설정', 2], // 2
    description:
      'CSS는 웹 페이지의 디자인, 레이아웃, 색상 등을 조정하는 데 사용됩니다.',
  },
  {
    question: '자바스크립트에서 변수를 선언할 때 사용하는 키워드가 아닌 것은?',
    options: ['let', 'const', 'var', 'int'],
    answer: ['int', 3], // 3
    description:
      "JavaScript에서는 'let', 'const', 'var'를 사용해 변수를 선언하며, 'int'는 존재하지 않습니다.",
  },
  {
    question: '다음 중 HTML에서 제목을 나타낼 때 사용하는 태그는?',
    options: ['p', 'h1', 'div', 'span'],
    answer: ['h1', 1], // 1
    description: "'h1' 태그는 HTML에서 가장 중요한 제목(Heading)을 나타냅니다.",
  },
  {
    question: 'HTML에서 이미지를 삽입하는 태그는?',
    options: [
      "&lt;img src='image.jpg'&gt;",
      "&lt;image src='image.jpg'&gt;",
      "&lt;picture src='image.jpg'&gt;",
      "&lt;img href='image.jpg'&gt;",
    ],
    answer: ["&lt;img src='image.jpg'&gt;", 0],
    description: '<img> 태그는 이미지를 HTML 문서에 삽입할 때 사용됩니다.',
  },
  {
    question:
      '자바스크립트에서 엄격한 비교(strict equality)를 수행하는 연산자는 무엇인가?',
    options: ['==', '===', '=', '!=='],
    answer: ['===', 1], // 1
    description:
      "'===' 연산자는 값과 데이터 타입이 모두 같은지 비교할 때 사용됩니다.",
  },
  {
    question: '다음 중 HTML에서 링크를 만드는 태그는 무엇인가?',
    options: ['img', 'a', 'link', 'href'],
    answer: ['a', 1], // 1
    description: "'a' 태그는 하이퍼링크를 생성할 때 사용됩니다.",
  },
  {
    question: 'CSS에서 텍스트를 가운데 정렬할 때 사용하는 속성 값은?',
    options: [
      'text-align: center;',
      'vertical-align: center;',
      'align-text: center;',
      'text-style: center;',
    ],
    answer: ['text-align: center;', 0], // 0
    description:
      "'text-align: center;'는 블록 요소의 텍스트를 수평으로 가운데 정렬합니다.",
  },
  {
    question: '자바스크립트에서 배열(Array)의 길이를 반환하는 속성은?',
    options: ['.size', '.count', '.length', '.index'],
    answer: ['.length', 2], // 2
    description: "배열의 길이를 구할 때는 '.length' 속성을 사용합니다.",
  },
  {
    question: 'HTML에서 순서 없는 목록을 나타내는 태그는?',
    options: ['ol', 'ul', 'li', 'dl'],
    answer: ['ul', 1], // 1
    description:
      "'ul' 태그는 순서가 없는 목록(Unordered List)을 만들 때 사용됩니다.",
  },
];

let currentQuiz = 0; // 현재 퀴즈 번호
let correctCount = 0; // 맞은 개수
let selectedButton = null;
let userAnswers = new Array(quizData.length).fill(-1);
let barStatus = true;

// 0.7v DOM
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const checkButton = document.getElementById('check-btn');
const numButtons = document.querySelectorAll('#bar-main button');

// 추가 DOM (0.8v) - results div 태그 관련 + quizElement
const quizElement = document.getElementById('quiz');

const resultMessage = document.getElementById('result-message');
const resultsElement = document.getElementById('results');
const scoreElement = document.getElementById('score');
const summaryElement = document.getElementById('summary');
const retryButton = document.getElementById('retry-btn');

// 추가 0.9v
const barElement = document.getElementById('bar-main');
const questionBar = document.querySelector('.question-bar');
// 퀴즈 초기화 (0.8v)
function initQuiz() {
  // retryButton 입력 시 현재 currentQuiz값 변경
  numButtons[currentQuiz].style.boxShadow = '0px 0px 0px';
  numButtons[currentQuiz].style.fontSize = '20px';
  // 1번 문제로 이동 + 변수 초기화
  currentQuiz = 0; // 현재 퀴즈 번호
  correctCount = 0; // 맞은 개수
  selectedButton = null;
  userAnswers = new Array(quizData.length).fill(-1);
  barStatus = true;

  loadQuiz();
  updateUI();

  quizElement.classList.remove('hide');
  resultsElement.classList.add('hide');
  resultMessage.textContent = '';
  resultMessage.className = '';
}

function resetQuiz() {
  userAnswers = new Array(quizData.length).fill(-1);
}

function loadQuiz() {
  questionElement.innerHTML = quizData[currentQuiz].question;
  optionsContainer.innerHTML = '';

  for (let i = 0; i < 4; i++) {
    // 선택지 보여줄 div 태그 생성
    // (동적 생성: 계속해서 변경될 것이므로 여기서 생성)
    const optionElements = document.createElement('div');
    optionElements.className = 'option';
    optionElements.innerHTML = quizData[currentQuiz].options[i];
    optionElements.dataset.index = i;
    if (userAnswers[currentQuiz] === i) {
      optionElements.classList.add('selected');
    }
    optionElements.addEventListener('click', selectOption);
    optionsContainer.appendChild(optionElements);
  }
}

// 이전 버튼
prevButton.onclick = () => {
  numButtons[currentQuiz].style.border = '1px solid lightgrey';
  numButtons[currentQuiz].style.boxShadow = '0px 0px 0px';
  numButtons[currentQuiz].style.fontSize = '20px';
  currentQuiz--;
  loadQuiz();
  updateUI();
};

// 다음 버튼
nextButton.onclick = () => {
  numButtons[currentQuiz].style.border = '1px solid lightgrey';
  numButtons[currentQuiz].style.boxShadow = '0px 0px 0px';
  numButtons[currentQuiz].style.fontSize = '20px';
  currentQuiz++;
  loadQuiz();
  updateUI();
};

// 문제 번호 버튼
numButtons.forEach((button, index) => {
  button.addEventListener('click', () => numButtonClick(index));
});

function numButtonClick(n) {
  numButtons[currentQuiz].style.border = '1px solid lightgrey';
  numButtons[currentQuiz].style.boxShadow = '0px 0px 0px';
  numButtons[currentQuiz].style.fontSize = '20px';
  currentQuiz = n;

  loadQuiz();
  updateUI();
}

// 옵션 선택
function selectOption() {
  const selectedIndex = parseInt(this.dataset.index);
  const options = document.querySelectorAll('.option');

  options.forEach((option) => option.classList.remove('selected'));
  if (userAnswers[currentQuiz] !== selectedIndex) {
    userAnswers[currentQuiz] = selectedIndex;
    this.classList.add('selected');
    numButtons[currentQuiz].style.backgroundColor = 'rgb(171, 212, 171)';
  } else {
    userAnswers[currentQuiz] = -1;
    numButtons[currentQuiz].style.backgroundColor = '#f0f0f0';
  }

  updateUI();
}

submitButton.onclick = () => {
  correctCount = 0;
  barStatus = false;
  let summary = '';

  updateUI();

  for (let i = 0; i < 10; i++) {
    let myAnswer = userAnswers[i];
    if (userAnswers[i] == quizData[i].answer[1]) {
      correctCount++;
    }

    const isCorrect = myAnswer === quizData[i].answer[1];
    console.log(isCorrect);

    summary += `<div class="summary-item ${
      isCorrect ? 'correct' : 'incorrect'
    }">
        <h2><strong>문제 ${i + 1}:</strong> ${quizData[i].question}</h2>
        <p><strong class="answer-font-size">내 답변: ${
          myAnswer !== -1 ? quizData[i].options[myAnswer] : '응답 없음'
        }<strong></p>
        <p class="answer-font-color answer-font-size">정답: ${
          quizData[i].answer[0]
        }</p>
        <p class="answer-font-color answer-font-size">-> ${
          quizData[i].description
        }</p>
    </div>`;
  }

  quizElement.classList.add('hide');
  resultsElement.classList.remove('hide');

  scoreElement.textContent = `${correctCount}/${quizData.length}`;
  summaryElement.innerHTML = summary;
};

checkButton.onclick = () => {
  if (userAnswers[currentQuiz] == quizData[currentQuiz].answer[1]) {
    alert('정답 ^_^');
  } else {
    alert('다시 생각하세요');
  }
};

function updateUI() {
  console.log(currentQuiz);

  if (currentQuiz === 0) {
    console.log('첫페이지');
  }
  if (currentQuiz === 0) {
    // 첫번째 문제 일 때, prev 버튼 비활성화
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }

  if (currentQuiz === quizData.length - 1) {
    // 마지막 문제일 때, next 버튼 비활성화
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
  if (!barStatus) {
    questionBar.style.display = 'none';
  } else {
    questionBar.style.display = 'block';
  }
  numButtons[currentQuiz].style.boxShadow = '3px 3px 3px black';
  numButtons[currentQuiz].style.fontSize = '23px';
}

retryButton.addEventListener('click', () => {
  window.location.href = `test.html`;
});

initQuiz();

/***********************************************************************
 * 기존 quizData, initQuiz(), loadQuiz() 등 함수와 이벤트 핸들러들은 그대로.
 * "빵빠레 효과" 관련 코드만 추가합니다.
 ***********************************************************************/

/** ========== 1) 빵빠레(Confetti) 함수 정의 ========== */
/**
 * startConfetti() : 화면에 종이조각들을 뿌리는 함수
 * 일정 시간 뒤 자동으로 제거
 */
function startConfetti() {
  // 1) 먼저, keyframes를 담은 <style> 태그를 동적으로 삽입 (중복 방지 위해 한 번만)
  if (!document.getElementById('confetti-style')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'confetti-style';
    styleEl.innerHTML = `
      @keyframes confettiFall {
        to {
          transform: translateY(110vh) rotate(720deg);
          opacity: 1;
        }
      }
      .confetti-container {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: 9999;
      }
      .confetti {
        position: absolute;
        top: -10px; /* 화면 위쪽 밖에서 시작 */
        width: 10px;
        height: 10px;
        background-color: red;
        opacity: 0.8;
        border-radius: 50%;
        animation: confettiFall 2.5s linear forwards;
      }
    `;
    document.head.appendChild(styleEl);
  }

  // 2) 컨테이너(div) 생성 후 body에 추가
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  // 3) confetti 조각 여러 개 생성
  const confettiCount = 200; // 뿌릴 조각 개수
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';

    // (a) 화면 가로 위치를 0%~100% 사이에서 랜덤 지정
    confetti.style.left = Math.random() * 100 + '%';

    // (b) 색상 배열 중 랜덤
    confetti.style.backgroundColor = getRandomColor();

    // (c) 크기(지름) 랜덤 (8~18px)
    const size = 8 + Math.random() * 10;
    confetti.style.width = size + 'px';
    confetti.style.height = size + 'px';

    // (d) 시작 지연(0~2초)
    const delay = Math.random() * 2;
    confetti.style.animationDelay = delay + 's';

    container.appendChild(confetti);
  }

  // 4) 일정 시간 뒤 컨테이너 제거 (메모리 정리)
  setTimeout(() => {
    container.remove();
  }, 5000); // 5초 뒤 제거
}

/** (도우미) 랜덤 색상 */
function getRandomColor() {
  // 원하는 색상 배열
  const colors = [
    '#e74c3c',
    '#f1c40f',
    '#3498db',
    '#9b59b6',
    '#2ecc71',
    '#ff66cc',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

/** ========== 2) 기존 "최종 결과 확인" 버튼 로직 수정 ========== */
// 기존 submitButton.onclick = () => { ... } 내부 끝부분에 startConfetti()를 추가

submitButton.onclick = () => {
  correctCount = 0;
  barStatus = false;
  let summary = '';

  updateUI();

  for (let i = 0; i < 10; i++) {
    let myAnswer = userAnswers[i];
    if (userAnswers[i] == quizData[i].answer[1]) {
      correctCount++;
    }
    const isCorrect = myAnswer === quizData[i].answer[1];
    summary += `<div class="summary-item ${
      isCorrect ? 'correct' : 'incorrect'
    }">
        <h2><strong>문제 ${i + 1}:</strong> ${quizData[i].question}</h2>
        <p><strong class="answer-font-size">내 답변: ${
          myAnswer !== -1 ? quizData[i].options[myAnswer] : '응답 없음'
        }<strong></p>
        <p class="answer-font-color answer-font-size">정답: ${
          quizData[i].answer[0]
        }</p>
        <p class="answer-font-color answer-font-size">-> ${
          quizData[i].description
        }</p>
    </div>`;
  }

  quizElement.classList.add('hide');
  resultsElement.classList.remove('hide');

  scoreElement.textContent = `${correctCount}/${quizData.length}`;
  summaryElement.innerHTML = summary;

  // *** 결과가 나오자마자 confetti 실행! ***
  startConfetti();
};

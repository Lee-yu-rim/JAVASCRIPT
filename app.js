//자바스크립트 문법을 이용한 웹페이지 생성

// 문제를 구성하는 객체 생성
function Question(text,choice,answer){
    this.text = text;      //문제 내용
    this.choice = choice;  //문제 보기
    this.answer = answer;  //정답 내용
};

// 퀴즈 정보를 관리하는 객체 생성
function Quiz(questions){   //배열을 받는 매개변수
    this.score = 0;   //점수
    this.questions = questions;  //문제
    this.questionIndex = 0;   //질문 순서
}

//정답 확인 기능(함수)
//프로토타입
//문제의 정답을 확인하는 역할
Quiz.prototype.correctAnswer = function(answer){
    return answer == this.questions[this.questionIndex].answer;  //선택한 번호와 퀴즈 정보 객체에 들어있는 정답번호가 같은지 비교
};

let questions = [   //문제 내용, 보기, 정답
    new Question('다음 중 최초의 상용 웹 브라우저는?', ['모자이크', '인터넷익스플로러', '구글 크롬', '넷스케이프 네비게이터'], '넷스케이프 네비게이터'),
    new Question('웹 문서에서 스타일을 작성하는 언어는?', ['HTML', 'jQuery', 'CSS', 'XML'], 'CSS'),
    new Question('명령어 기반의 인터페이스를 의미하는 용어는?', ['GUI', 'CLI', 'HUD', 'SI'], 'CLI'),
    new Question('CSS 속성 중 글자의 굵기를 변경하는 속성은?', ['font-size', 'font-style', 'font-weight', 'font-variant'], 'font-weight')
];

let quiz = new Quiz(questions);


//화면에 순차적으로 문제를 표시하는 메소드 생성
function update_quiz(){
    let question = document.getElementById("question");
    let choice = document.querySelectorAll('.btn');   //btn을 배열형태로 가져옴
    //querySelector() : 특정 name,id,class를 제한하지 않고 css선택자를 사용하여 요소를 가져옴
    let idx = quiz.questionIndex + 1;  //문제 번호 출력
    
    //문제 출력
    question.innerHTML = '문제' + idx + ') ' + quiz.questions[quiz.questionIndex].text
    
    //보기 출력
    for(let i=0;i<4;i++){
        choice[i].innerHTML = quiz.questions[quiz.questionIndex].choice[i];
        //앞에 choice는 바로 위에 정의된 변수이고 뒤에 choice는 Question 객체에 정의된 choice임
    }
    progress();  //문제가 진행될 때마다 진행상황이 출력될 수 있게 함
};

function progress(){
    let progress = document.getElementById("progress");
    progress.innerHTML = '문제' + (quiz.questionIndex + 1) + ' / ' + quiz.questions.length;
}   //                             현재 진행 중인 문제 번호               전체 문제 갯수


//마지막 결과 화면
function result(){
    let quiz_div = document.getElementById('quiz');
    let per = parseInt((quiz.score * 100)/quiz.questions.length);  //점수

    let txt = "<h1>결과</h1>" + "<h2 id='score'>당신의 점수: " + quiz.score + " / " + quiz.questions.length + '<br><br>' + per +'점</h2>';
    quiz_div.innerHTML = txt; 

    if(per < 60){
        txt += '<h2 style="color:red">좀 더 분발하세요.</h2>';
        quiz_div.innerHTML = txt;
    }else if(per >= 60 && per < 80){
        txt += '<h2 style="color:red">무난한 점수네요.</h2>';
        quiz_div.innerHTML = txt;
    }else if(per >= 80){
        txt += '<h2 style="color:red">훌륭합니다.</h2>';
        quiz_div.innerHTML = txt;
    }
}


//버튼 클릭 시 이벤트 발생을 위한 메소드를 생성하기 위해 변수 생성
let btn = document.querySelectorAll('.btn'); 

//버튼 클릭 시 이벤트 발생
function checkAnswer(i){
    btn[i].addEventListener('click',function(){  //addEventListener() : 자바스크립트에서 이벤트를 발생시키는 메소드
        let answer = btn[i].innerHTML;   //선택한 버튼의 문자값 가져오기
        if(quiz.correctAnswer(answer)){
            alert("정답입니다.");
            quiz.score++;
        }else{
            alert("틀렸습니다.");
        }

        //다음 문제로 이동
        if(quiz.questionIndex < quiz.questions.length - 1){  //마지막 문제가 아닌지 판단
            quiz.questionIndex++;
            update_quiz();
        }else{   //마지막 문제 다음 화면 출력
            result();
        }
    })
}
for(let i=0;i<btn.length;i++){
    checkAnswer(i);
}

update_quiz();



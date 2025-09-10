const questions = [
  { question: "O que é distribuição eletrônica?", options: ["A forma como os elétrons se organizam nas camadas do átomo.", "A quantidade de prótons no núcleo.", "A divisão dos nêutrons em camadas.", "O número atômico do elemento."], answer: 0 },
  { question: "Qual é a ordem correta de preenchimento dos elétrons?", options: ["K, L, M, N, O, P, Q.", "A, B, C, D, E.", "Nêutron → Próton → Elétron.", "Núcleo → Camada."], answer: 0 },
  { question: "Quantos elétrons cabem na 1ª camada (K)?", options: ["1", "2", "4", "8"], answer: 1 },
  { question: "Quantos elétrons cabem na 2ª camada (L)?", options: ["8", "10", "2", "18"], answer: 0 },
  { question: "Qual camada pode ter até 18 elétrons?", options: ["K", "L", "M", "N"], answer: 2 },
  { question: "Qual é o número máximo de elétrons na camada N?", options: ["8", "18", "32", "2"], answer: 1 },
  { question: "Qual princípio determina que os elétrons ocupam primeiro os orbitais de menor energia?", options: ["Princípio de Pauli", "Princípio de Hund", "Princípio da Construção (Aufbau)", "Número Atômico"], answer: 2 },
  { question: "Qual regra afirma que cada orbital de um subnível recebe 1 elétron antes de algum receber o 2º?", options: ["Regra de Hund", "Princípio de Pauli", "Princípio de Aufbau", "Lei de Dalton"], answer: 0 },
  { question: "Qual princípio estabelece que dois elétrons de um mesmo átomo não podem ter os 4 números quânticos iguais?", options: ["Princípio da Construção", "Princípio da Incerteza", "Princípio de Pauli", "Princípio de Hund"], answer: 2 },
  { question: "Qual a distribuição eletrônica do átomo de Hidrogênio (Z = 1)?", options: ["1s¹", "2s¹", "1s²", "1p¹"], answer: 0 },
  { question: "Qual a distribuição eletrônica correta do Oxigênio (Z = 8)?", options: ["1s² 2s² 2p⁴", "1s² 2s² 2p³", "1s² 2s² 3p⁴", "1s² 2p⁶"], answer: 0 },
  { question: "Quantos elétrons cabem no subnível p?", options: ["2", "6", "10", "14"], answer: 1 },
  { question: "Quantos elétrons cabem no subnível d?", options: ["2", "6", "10", "14"], answer: 2 },
  { question: "Quantos elétrons cabem no subnível f?", options: ["6", "10", "14", "18"], answer: 2 }
];

let currentQuestion=0;
let score=0;

const quizContainer=document.getElementById("quiz");
const resultContainer=document.getElementById("result");
const scoreContainer=document.getElementById("score");
const answerBtn=document.getElementById("answer-btn");
const nextBtn=document.getElementById("next-btn");
const restartBtn=document.getElementById("restart-btn");
const prizeProgress=document.getElementById("prize-progress");

const prizes = [
  100,200,300,500,1000,2000,4000,8000,16000,32000,64000,125000,250000,500000
];

function showQuestion(){
  const q=questions[currentQuestion];
  quizContainer.innerHTML=`
    <h3>Pergunta ${currentQuestion+1} de ${questions.length}</h3>
    <p>${q.question}</p>
    ${q.options.map((opt,i)=>`<label><input type="radio" name="option" value="${i}"> ${opt}</label><br>`).join("")}
  `;
  resultContainer.textContent="";
  answerBtn.style.display="inline-block";
  nextBtn.style.display="none";
  restartBtn.style.display="none";
}

function checkAnswer(){
  const radios=document.querySelectorAll('input[name="option"]');
  let selected=-1;
  radios.forEach((r,i)=>{if(r.checked) selected=i;});
  if(selected===-1){ resultContainer.textContent="⚠️ Escolha uma opção!"; return; }

  if(selected===questions[currentQuestion].answer){
    score++;
    resultContainer.textContent="✅ Resposta correta!";
  } else {
    resultContainer.textContent="❌ Resposta errada!";
  }
  scoreContainer.textContent=`Pontuação: ${score}`;
  prizeProgress.style.width=`${(currentQuestion+1)/questions.length*100}%`;
  answerBtn.style.display="none";
  nextBtn.style.display="inline-block";
}

function nextQuestion(){
  if(currentQuestion<questions.length-1){
    currentQuestion++;
    showQuestion();
  } else {
    quizContainer.innerHTML="<h2>Fim de jogo!</h2>";
    let percent=(score/questions.length)*100;
    let finalMessage="";
    if(percent===100) finalMessage="🎉 Você é um mestre da Química!";
    else if(percent>=70) finalMessage="👏 Muito bom! Continue estudando!";
    else if(percent>=40) finalMessage="🙂 Tá indo, revise um pouco mais.";
    else finalMessage="😅 Precisa estudar mais sobre distribuição eletrônica.";
    resultContainer.textContent=`Você acertou ${score} de ${questions.length} perguntas. ${finalMessage}`;
    answerBtn.style.display="none";
    nextBtn.style.display="none";
    restartBtn.style.display="inline-block";
    prizeProgress.style.width="100%";
  }
}

function restartQuiz(){
  currentQuestion=0;
  score=0;
  scoreContainer.textContent=`Pontuação: ${score}`;
  prizeProgress.style.width="0%";
  showQuestion();
}

showQuestion();

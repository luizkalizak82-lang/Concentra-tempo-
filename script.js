// CONTROLE DE INTERFACE (LOGIN)
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('login-name').value;
    
    document.getElementById('user-display').innerText = nome;
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');
});

// NAVEGAÇÃO ENTRE ABAS
function switchTab(tabName) {
    // Esconde todos os conteúdos
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    // Remove classe ativa de todos os botões
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    // Mostra a aba clicada
    document.getElementById(`tab-${tabName}`).classList.remove('hidden');
    
    // Adiciona classe ativa no botão clicado
    const clickedBtn = event.currentTarget;
    clickedBtn.classList.add('active');
}

// CADASTRO DE PROVAS (AGENDA)
document.getElementById('prova-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const materia = document.getElementById('prova-materia').value;
    const dataInput = document.getElementById('prova-data').value; // Retorna AAAA-MM-DD
    
    // Formatando a data de AAAA-MM-DD para DD/MM/AAAA para exibição limpa
    const dataObjeto = new Date(dataInput + 'T00:00:00'); 
    const dia = String(dataObjeto.getDate()).padStart(2, '0');
    const mes = String(dataObjeto.getMonth() + 1).padStart(2, '0');
    const ano = dataObjeto.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    // Adiciona na lista visual
    const lista = document.getElementById('lista-provas');
    const item = document.createElement('li');
    item.innerHTML = `<span><strong>${materia}</strong></span> <span>📅 ${dataFormatada}</span>`;
    lista.appendChild(item);

    // Limpa o formulário
    document.getElementById('prova-materia').value = '';
    document.getElementById('prova-data').value = '';
});

// CRONÔMETRO POMODORO
let timerInterval;
let timerSeconds = 25 * 60; // 25 minutos em segundos
let isPaused = true;

const timerDisplay = document.getElementById('timer');
const btnStart = document.getElementById('btn-start');
const btnPause = document.getElementById('btn-pause');
const statusDisplay = document.getElementById('pomodoro-status');

function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    timerDisplay.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startPomodoro() {
    if (isPaused) {
        isPaused = false;
        btnStart.classList.add('hidden');
        btnPause.classList.remove('hidden');
        statusDisplay.innerText = "Foco total nos estudos!";
        
        timerInterval = setInterval(() => {
            if (timerSeconds > 0) {
                timerSeconds--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                alert("Pomodoro finalizado! Hora de uma pausa.");
                resetPomodoro();
            }
        }, 1000);
    }
}

function pausePomodoro() {
    isPaused = true;
    clearInterval(timerInterval);
    btnStart.classList.remove('hidden');
    btnPause.classList.add('hidden');
    statusDisplay.innerText = "Timer pausado.";
}

function resetPomodoro() {
    clearInterval(timerInterval);
    isPaused = true;
    timerSeconds = 25 * 60;
    updateTimerDisplay();
    btnStart.classList.remove('hidden');
    btnPause.classList.add('hidden');
    statusDisplay.innerText = "Hora de Focar!";
}

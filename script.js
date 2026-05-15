// LÓGICA DE LOGIN
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('login-name').value;
    document.getElementById('user-display').innerText = nome.toUpperCase();
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');
});

// NAVEGAÇÃO DE ABAS
function switchTab(tab, event) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${tab}`).classList.remove('hidden');
    event.currentTarget.classList.add('active');
}

// CRONOGRAMA
document.getElementById('cronograma-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const mat = document.getElementById('cron-materia').value;
    const ass = document.getElementById('cron-assunto').value;
    const ini = document.getElementById('cron-inicio').value;
    const fim = document.getElementById('cron-fim').value;
    
    const id = "c-" + Date.now();
    const li = document.createElement('li');
    li.className = 'item-card';
    li.id = id;
    li.innerHTML = `
        <button class="btn-remove" onclick="document.getElementById('${id}').remove()">[REMOVER]</button>
        <strong>MÓDULO: ${mat.toUpperCase()}</strong><br>
        <span>SEGMENTO: ${ass.toUpperCase()}</span><br>
        <span style="color: var(--verde-neon);">🕒 LINK: ${ini} >> ${fim}</span><br>
        <select onchange="updateStatus('${id}', this.value)" style="margin-top:10px; font-size: 10px;">
            <option value="p">STATUS: PENDENTE</option>
            <option value="concluido">STATUS: CONCLUÍDO</option>
            <option value="n">STATUS: FALHA</option>
        </select>
    `;
    document.getElementById('lista-cronograma').appendChild(li);
    this.reset();
});

function updateStatus(id, status) {
    const el = document.getElementById(id);
    el.classList.toggle('concluido', status === 'concluido');
}

// AGENDA DE PROVAS
document.getElementById('prova-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const mat = document.getElementById('prova-materia').value;
    const ass = document.getElementById('prova-assunto').value;
    const rawDate = document.getElementById('prova-data').value;
    const dataFormatada = new Date(rawDate + 'T00:00:00').toLocaleDateString('pt-BR');
    
    const id = "p-" + Date.now();
    const li = document.createElement('li');
    li.className = 'item-card';
    li.id = id;
    li.innerHTML = `
        <button class="btn-remove" onclick="document.getElementById('${id}').remove()">[APAGAR]</button>
        <strong>ALVO: ${mat.toUpperCase()}</strong><br>
        <span>ASSUNTO: ${ass.toUpperCase()}</span><br>
        <span style="color: var(--verde-neon);">📅 PRAZO: ${dataFormatada}</span>
    `;
    document.getElementById('lista-provas').appendChild(li);
    this.reset();
});

// NÚCLEO POMODORO
let timeLeft = 25 * 60;
let timerId = null;

function updateTimer() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    document.getElementById('timer').innerText = `${m}:${s < 10 ? '0'+s : s}`;
}

function startPomodoro() {
    if (timerId) return;
    document.getElementById('btn-start').classList.add('hidden');
    document.getElementById('btn-pause').classList.remove('hidden');
    timerId = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimer();
        } else {
            clearInterval(timerId);
            alert("SESSÃO_CONCLUÍDA: CICLO_FECHADO");
            resetPomodoro();
        }
    }, 1000);
}

function pausePomodoro() {
    clearInterval(timerId);
    timerId = null;
    document.getElementById('btn-start').classList.remove('hidden');
    document.getElementById('btn-pause').classList.add('hidden');
}

function resetPomodoro() {
    pausePomodoro();
    timeLeft = 25 * 60;
    updateTimer();
}

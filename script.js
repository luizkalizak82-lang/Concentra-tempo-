// CONTROLE DE LOGIN
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('login-name').value;
    document.getElementById('user-display').innerText = nome;
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');
});

// TROCA DE ABAS
function switchTab(tab) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${tab}`).classList.remove('hidden');
    event.currentTarget.classList.add('active');
}

// CRONOGRAMA DIÁRIO
document.getElementById('cronograma-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const mat = document.getElementById('cron-materia').value;
    const ass = document.getElementById('cron-assunto').value;
    const ini = document.getElementById('cron-inicio').value;
    const fim = document.getElementById('cron-fim').value;
    
    const id = "cron-" + Date.now();
    const li = document.createElement('li');
    li.className = 'item-card';
    li.id = id;
    li.innerHTML = `
        <button class="btn-remove" onclick="document.getElementById('${id}').remove()">X</button>
        <strong>${mat}</strong><br>
        <small>${ass}</small><br>
        <span style="font-size: 13px;">🕒 ${ini} às ${fim}</span><br>
        <select onchange="updateStatus('${id}', this.value)">
            <option value="pendente">Pendente</option>
            <option value="concluido">Concluído ✅</option>
            <option value="nao-concluido">Não Concluído ❌</option>
        </select>
    `;
    document.getElementById('lista-cronograma').appendChild(li);
    this.reset();
});

function updateStatus(id, status) {
    const el = document.getElementById(id);
    el.classList.remove('concluido');
    if(status === 'concluido') el.classList.add('concluido');
}

// AGENDA DE PROVAS
document.getElementById('prova-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const mat = document.getElementById('prova-materia').value;
    const rawDate = document.getElementById('prova-data').value;
    const data = new Date(rawDate + 'T00:00:00').toLocaleDateString('pt-BR');
    
    const id = "prov-" + Date.now();
    const li = document.createElement('li');
    li.className = 'item-card';
    li.id = id;
    li.innerHTML = `
        <button class="btn-remove" onclick="document.getElementById('${id}').remove()">X</button>
        <strong>${mat}</strong><br>
        📅 Prova: ${data}
    `;
    document.getElementById('lista-provas').appendChild(li);
    this.reset();
});

// POMODORO
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
            alert("Tempo de foco encerrado!");
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

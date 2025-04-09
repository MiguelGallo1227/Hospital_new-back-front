// URLs da API (substitua com o caminho correto para o back-end)
const API_BASE_URL = 'http://localhost:8080'; // Ajuste para o URL correto

// Função para fazer fetch e retornar os dados
function fetchData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar dados');
            }
            return response.json();
        })
        .catch(error => {
            console.error(error);
            alert('Erro ao carregar dados: ' + error);
        });
}

// Função para carregar os médicos no select
function loadDoctors() {
    fetchData(`${API_BASE_URL}/medicos`)
        .then(data => {
            const medicoSelect = document.getElementById('medicoConsulta');
            medicoSelect.innerHTML = ''; // Limpa o select antes de preencher
            data.forEach(medico => {
                const option = document.createElement('option');
                option.value = medico.id;
                option.textContent = `${medico.nome} - ${medico.especialidade}`;
                medicoSelect.appendChild(option);
            });
        });
}

// Função para carregar os pacientes no select
function loadPatients() {
    fetchData(`${API_BASE_URL}/pacientes`)
        .then(data => {
            const pacienteSelect = document.getElementById('pacienteConsulta');
            pacienteSelect.innerHTML = ''; // Limpa o select antes de preencher
            data.forEach(paciente => {
                const option = document.createElement('option');
                option.value = paciente.id;
                option.textContent = paciente.nome;
                pacienteSelect.appendChild(option);
            });
        });
}

// Função para carregar médicos, pacientes e consultas nas listas
function loadLists() {
    // Carrega médicos
    fetchData(`${API_BASE_URL}/medicos`)
        .then(data => {
            const medicoList = document.getElementById('medico-list');
            medicoList.innerHTML = ''; // Limpa a lista
            data.forEach(medico => {
                const li = document.createElement('li');
                li.textContent = `${medico.nome} - ${medico.especialidade}`;
                medicoList.appendChild(li);
            });
        });

    // Carrega pacientes
    fetchData(`${API_BASE_URL}/pacientes`)
        .then(data => {
            const pacienteList = document.getElementById('paciente-list');
            pacienteList.innerHTML = ''; // Limpa a lista
            data.forEach(paciente => {
                const li = document.createElement('li');
                li.textContent = paciente.nome;
                pacienteList.appendChild(li);
            });
        });

    // Carrega consultas
    fetchData(`${API_BASE_URL}/consultas`)
        .then(data => {
            const consultaList = document.getElementById('consulta-list');
            consultaList.innerHTML = ''; // Limpa a lista
            data.forEach(consulta => {
                const li = document.createElement('li');
                li.textContent = `Consulta de ${consulta.paciente.nome} com Dr(a). ${consulta.medico.nome} - ${consulta.tipoConsulta} em ${consulta.dataHora}`;
                consultaList.appendChild(li);
            });
        });
}

// Função para cadastrar um novo médico
document.getElementById('medico-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nomeMedico').value;
    const especialidade = document.getElementById('especialidadeMedico').value;

    fetch(`${API_BASE_URL}/medicos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, especialidade })
    })
        .then(response => response.json())
        .then(() => {
            loadLists(); // Recarrega a lista de médicos
        })
        .catch(error => alert('Erro ao cadastrar médico: ' + error));
});

// Função para cadastrar um novo paciente
document.getElementById('paciente-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nomePaciente').value;
    const email = document.getElementById('emailPaciente').value;

    fetch(`${API_BASE_URL}/pacientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email })
    })
        .then(response => response.json())
        .then(() => {
            loadLists(); // Recarrega a lista de pacientes
        })
        .catch(error => alert('Erro ao cadastrar paciente: ' + error));
});

// Função para cadastrar uma nova consulta
document.getElementById('consulta-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const dataHora = document.getElementById('dataHoraConsulta').value;
    const tipoConsulta = document.getElementById('tipoConsulta').value;
    const medicoId = document.getElementById('medicoConsulta').value;
    const pacienteId = document.getElementById('pacienteConsulta').value;

    // Verificar se todos os campos obrigatórios estão preenchidos
    if (!dataHora || !tipoConsulta || !medicoId || !pacienteId) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Preparando os dados para envio
    const consultaData = {
        dataHora,
        tipoConsulta,
        medico: { id: medicoId },
        paciente: { id: pacienteId }
    };

    // Enviando dados para a API
    fetch(`${API_BASE_URL}/consultas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(consultaData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar consulta');
        }
        return response.json();  // Parse da resposta
    })
    .then(data => {
        // Se a consulta foi criada com sucesso
        console.log('Resposta da API:', data); // Verifique os dados retornados
        alert('Consulta cadastrada com sucesso!');
        loadLists();  // Recarrega a lista de consultas
    })
    .catch(error => {
        // Tratar erro
        console.error(error);
        alert('Erro ao cadastrar consulta: ' + error.message);
    });
});

// Inicialização
function initializeApp() {
    loadDoctors();
    loadPatients();
    loadLists();
}

initializeApp();

const API_BASE_URL = 'http://localhost:8080';

function fetchData(url) {
  return fetch(url)
    .then(res => (res.ok ? res.json() : Promise.reject('Erro ao buscar dados')))
    .catch(err => {
      console.error(err);
      alert(err);
    });
}

function loadDoctors() {
  fetchData(`${API_BASE_URL}/medicos`).then(data => {
    const select = document.getElementById('medicoConsulta');
    select.innerHTML = '';
    data.forEach(medico => {
      const option = document.createElement('option');
      option.value = medico.id;
      option.textContent = `${medico.nome} - ${medico.especialidade}`;
      select.appendChild(option);
    });
  });
}

function loadPatients() {
  fetchData(`${API_BASE_URL}/pacientes`).then(data => {
    const select = document.getElementById('pacienteConsulta');
    select.innerHTML = '';
    data.forEach(paciente => {
      const option = document.createElement('option');
      option.value = paciente.id;
      option.textContent = paciente.nome;
      select.appendChild(option);
    });
  });
}

function loadLists() {
  // Lista de Médicos
  fetchData(`${API_BASE_URL}/medicos`).then(data => {
    const list = document.getElementById('medico-list');
    list.innerHTML = '';
    data.forEach(medico => {
      const li = document.createElement('li');
      li.textContent = `${medico.nome} - ${medico.especialidade}`;
      list.appendChild(li);
    });
  });

  // Lista de Pacientes
  fetchData(`${API_BASE_URL}/pacientes`).then(data => {
    const list = document.getElementById('paciente-list');
    list.innerHTML = '';
    data.forEach(paciente => {
      const li = document.createElement('li');
      li.textContent = paciente.nome;
      list.appendChild(li);
    });
  });

  // Lista de Consultas
  fetchData(`${API_BASE_URL}/consultas`).then(data => {
    const list = document.getElementById('consulta-list');
    list.innerHTML = '';
    data.forEach(consulta => {
      const li = document.createElement('li');

      // Se o objeto "consulta" não vier com os dados completos,
      // buscamos nos selects a opção correspondente ao id.
      let nomeMedico = 'Médico não definido';
      let nomePaciente = 'Paciente não definido';
      let tipo = consulta.tipoConsulta || 'Tipo não informado';

      if (consulta.medico && consulta.medico.id) {
        // Busca no select de médicos o option com o id correspondente
        const optMedico = document.querySelector(`#medicoConsulta option[value="${consulta.medico.id}"]`);
        if (optMedico) {
          nomeMedico = optMedico.textContent;
        }
      }

      if (consulta.paciente && consulta.paciente.id) {
        // Busca no select de pacientes o option com o id correspondente
        const optPaciente = document.querySelector(`#pacienteConsulta option[value="${consulta.paciente.id}"]`);
        if (optPaciente) {
          nomePaciente = optPaciente.textContent;
        }
      }

      // Formatação da data
      let dataHoraFormatada = '';
      if (consulta.dataHora) {
        const dt = new Date(consulta.dataHora);
        dataHoraFormatada = dt.toLocaleString('pt-BR', {
          dateStyle: 'short',
          timeStyle: 'short'
        });
      }

      li.textContent = `Consulta de ${nomePaciente} com ${nomeMedico} - ${tipo} em ${dataHoraFormatada}`;
      list.appendChild(li);
    });
  });
}

// Cadastro Médico
document.getElementById('medico-form').addEventListener('submit', e => {
  e.preventDefault();
  const nome = document.getElementById('nomeMedico').value;
  const especialidade = document.getElementById('especialidadeMedico').value;

  fetch(`${API_BASE_URL}/medicos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, especialidade })
  })
    .then(res => res.json())
    .then(() => {
      loadDoctors();
      loadLists();
    })
    .catch(err => alert('Erro ao cadastrar médico: ' + err));
});

// Cadastro Paciente
document.getElementById('paciente-form').addEventListener('submit', e => {
  e.preventDefault();
  const nome = document.getElementById('nomePaciente').value;
  const email = document.getElementById('emailPaciente').value;

  fetch(`${API_BASE_URL}/pacientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email })
  })
    .then(res => res.json())
    .then(() => {
      loadPatients();
      loadLists();
    })
    .catch(err => alert('Erro ao cadastrar paciente: ' + err));
});

// Cadastro Consulta
document.getElementById('consulta-form').addEventListener('submit', e => {
  e.preventDefault();
  const dataHora = document.getElementById('dataHoraConsulta').value;
  const tipoConsulta = document.getElementById('tipoConsulta').value;
  const medicoId = document.getElementById('medicoConsulta').value;
  const pacienteId = document.getElementById('pacienteConsulta').value;

  if (!dataHora || !tipoConsulta || !medicoId || !pacienteId) {
    alert('Preencha todos os campos!');
    return;
  }

  const consultaData = {
    dataHora,
    tipoConsulta,
    medico: { id: medicoId },
    paciente: { id: pacienteId }
  };

  fetch(`${API_BASE_URL}/consultas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(consultaData)
  })
    .then(res => {
      if (!res.ok) throw new Error('Erro ao cadastrar consulta');
      return res.json();
    })
    .then(() => {
      alert('Consulta cadastrada com sucesso!');
      loadLists();
    })
    .catch(err => {
      console.error(err);
      alert('Erro ao cadastrar consulta: ' + err.message);
    });
});

function initializeApp() {
  loadDoctors();
  loadPatients();
  loadLists();
}

initializeApp();

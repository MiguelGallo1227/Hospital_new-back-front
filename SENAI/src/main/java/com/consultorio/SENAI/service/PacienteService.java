package com.consultorio.SENAI.service;

import com.consultorio.SENAI.DTO.MedicoDTO;
import com.consultorio.SENAI.DTO.PacienteDTO;
import com.consultorio.SENAI.entity.Medico;
import com.consultorio.SENAI.entity.Paciente;
import com.consultorio.SENAI.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    // Criação ou atualização de um paciente
    public Paciente salvarPaciente(Paciente paciente) {
        return pacienteRepository.save(paciente);
    }

    // Obter todos os pacientes
    public List<PacienteDTO> obterPacientes() {
        List<PacienteDTO> toReturn = new ArrayList<PacienteDTO>();
        List<Paciente> pacientes =  pacienteRepository.findAll();
        for (Paciente p : pacientes){
            toReturn.add(PacienteDTO.from(p));
        }
        return toReturn;
    }

    // Obter um paciente por ID
    public Optional<Paciente> obterPacientePorId(Long id) {
        return pacienteRepository.findById(id);
    }

    // Deletar um paciente por ID
    public void deletarPaciente(Long id) {
        pacienteRepository.deleteById(id);
    }


}

package com.consultorio.SENAI.service;

import com.consultorio.SENAI.DTO.MedicoDTO;
import com.consultorio.SENAI.entity.Medico;
import com.consultorio.SENAI.repository.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MedicoService {

    @Autowired
    private MedicoRepository medicoRepository;

    // Criação ou atualização de um médico
    public Medico salvarMedico(Medico medico) {
        return medicoRepository.save(medico);
    }

    // Obter todos os médicos
    public List<MedicoDTO> obterMedicos() {
        List<MedicoDTO> toReturn = new ArrayList<MedicoDTO>();
        List<Medico> medicos =  medicoRepository.findAll();
        for (Medico m : medicos){
            toReturn.add(MedicoDTO.from(m));
        }
        return toReturn;
    }

    // Obter um médico por ID
    public Optional<Medico> obterMedicoPorId(Long id) {
        return medicoRepository.findById(id);
    }

    // Deletar um médico por ID
    public void deletarMedico(Long id) {
        medicoRepository.deleteById(id);
    }
}

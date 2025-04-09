package com.consultorio.SENAI.service;

import com.consultorio.SENAI.DTO.ConsultaDTO;
import com.consultorio.SENAI.DTO.MedicoDTO;
import com.consultorio.SENAI.entity.Consulta;
import com.consultorio.SENAI.entity.Medico;
import com.consultorio.SENAI.repository.ConsultaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ConsultaService {

    @Autowired
    private ConsultaRepository consultaRepository;

    // Criação ou atualização de uma consulta
    public Consulta salvarConsulta(Consulta consulta) {
        return consultaRepository.save(consulta);
    }

    // Obter todas as consultas
    public List<ConsultaDTO> obterConsultas() {
        List<ConsultaDTO> toReturn = new ArrayList<ConsultaDTO>();
        List<Consulta> consultas =  consultaRepository.findAll();
        for (Consulta c : consultas){
            toReturn.add(ConsultaDTO.from(c));
        }
        return toReturn;
    }
    // Obter uma consulta por ID
    public Optional<Consulta> obterConsultaPorId(Long id) {
        return consultaRepository.findById(id);
    }

    // Deletar uma consulta por ID
    public void deletarConsulta(Long id) {
        consultaRepository.deleteById(id);
    }
}




package com.consultorio.SENAI.DTO;

import com.consultorio.SENAI.entity.Medico;
import com.consultorio.SENAI.entity.Paciente;

public class PacienteDTO {
    private Long id;
    private String nome;
    private String email;

    // Construtores

    public PacienteDTO(){

    }
    public PacienteDTO(Long id, String nome, String email) {
        this.id = id;
        this.nome = nome;
        this.email = email;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public static PacienteDTO from(Paciente p){
        PacienteDTO paciente = new PacienteDTO();
        paciente.setId(p.getId());
        paciente.setNome(p.getNome());
        paciente.setEmail(p.getEmail());
        return paciente;
    }
}


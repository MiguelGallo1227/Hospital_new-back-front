package com.consultorio.SENAI.DTO;

import com.consultorio.SENAI.entity.Medico;

public class MedicoDTO {
    private Long id;
    private String nome;
    private String especialidade;

    // Getters e Setters

    public MedicoDTO(){

    }
    public MedicoDTO(Long id, String nome, String especialidade) {
        this.id = id;
        this.nome = nome;
        this.especialidade = especialidade;
    }

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

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public static MedicoDTO from (Medico m){
        MedicoDTO medico = new MedicoDTO();
        medico.setId(m.getId());
        medico.setEspecialidade(m.getEspecialidade());
        medico.setNome(m.getNome());
        return medico;
    }
}


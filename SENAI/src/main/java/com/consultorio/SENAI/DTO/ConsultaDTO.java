package com.consultorio.SENAI.DTO;

import com.consultorio.SENAI.entity.Consulta;
import com.consultorio.SENAI.entity.Medico;

import java.time.LocalDateTime;

public class ConsultaDTO {
    private Long id;
    private LocalDateTime dataHora;
    private String descricao;

    // Getters e Setters

    public ConsultaDTO(){

    }

    public ConsultaDTO(Long id, LocalDateTime dataHora, String descricao) {
        this.id = id;
        this.dataHora = dataHora;
        this.descricao = descricao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public static ConsultaDTO from (Consulta c){
        ConsultaDTO consulta = new ConsultaDTO();
        consulta.setId(c.getId());
        consulta.setDescricao(c.getDescricao());
        consulta.setDataHora(c.getDataHora());
        return consulta;
    }
}


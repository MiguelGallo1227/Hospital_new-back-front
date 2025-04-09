package com.consultorio.SENAI.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "O nome do paciente não pode ser nulo")
    private String nome; // Nome do paciente

    @Email(message = "O e-mail fornecido não é válido")
    @NotNull(message = "O e-mail do paciente não pode ser nulo")
    private String email; // E-mail do paciente

    @OneToMany(mappedBy = "paciente")
    private List<Consulta> consultas; // Lista de consultas que o paciente realiza

    // Construtores
    public Paciente() {
    }

    public Paciente(Long id, String nome, String email, List<Consulta> consultas) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.consultas = consultas;
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

    public List<Consulta> getConsultas() {
        return consultas;
    }

    public void setConsultas(List<Consulta> consultas) {
        this.consultas = consultas;
    }

    @Override
    public String toString() {
        return "Paciente{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}

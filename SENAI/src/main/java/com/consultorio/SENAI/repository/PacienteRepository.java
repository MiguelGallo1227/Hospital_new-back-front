package com.consultorio.SENAI.repository;

import com.consultorio.SENAI.entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    // Aqui você pode adicionar consultas customizadas, se necessário
}

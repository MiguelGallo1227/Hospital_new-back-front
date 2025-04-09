package com.consultorio.SENAI.repository;

import com.consultorio.SENAI.entity.Medico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {
    // Aqui você pode adicionar consultas customizadas, se necessário
}

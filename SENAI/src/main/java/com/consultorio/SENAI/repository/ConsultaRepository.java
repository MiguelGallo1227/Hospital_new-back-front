package com.consultorio.SENAI.repository;

import com.consultorio.SENAI.entity.Consulta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
    // Aqui você pode adicionar consultas customizadas, se necessário
}

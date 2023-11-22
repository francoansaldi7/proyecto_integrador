package com.booking.backend.repository;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.booking.backend.models.Services;
import com.booking.backend.models.TypesOfServices;


@Repository
public interface IServiceRepository extends JpaRepository<Services, UUID> {
  // @Query("SELECT s.id as id, s.title as title FROM Services s WHERE lower(s.title) LIKE %:keyword%")
  //   List<Map<String, Object>> findIdAndTitleContaining(@Param("keyword") String keyword);

        List<IdAndTituloProjection> findAllByTitleContaining(String keyword);

    public interface IdAndTituloProjection {
        UUID getId();
        String getTitle();
    }

    Page<IServiceReduced> findByTitleContainingAndTypeOfService(String keyword,  TypesOfServices typeOfService, Pageable pageable);

        Page<IServiceReduced> findAllByTitleContaining(String keyword, Pageable pageable);

    Page<IServiceReduced> findBy(Pageable pageable);
    

}

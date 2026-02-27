package com.example.globalipplatform.project.repository;

import com.example.globalipplatform.project.entity.Trademark;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrademarkRepository extends JpaRepository<Trademark, Long> {
    
    Trademark findByAssetNumber(String assetNumber);
    
    @Query(value = "SELECT t FROM Trademark t WHERE " +
           "(:query IS NULL OR " +
           "   LOWER(CAST(t.mark AS text)) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "   LOWER(CAST(t.assignee AS text)) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "   LOWER(CAST(t.goodsServices AS text)) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
           "(:jurisdiction IS NULL OR CAST(t.jurisdiction AS text) = :jurisdiction) AND " +
           "(:status IS NULL OR CAST(t.status AS text) = :status) AND " +
           "(:owner IS NULL OR LOWER(CAST(t.assignee AS text)) LIKE LOWER(CONCAT('%', :owner, '%'))) AND " +
           "(:niceClass IS NULL OR CAST(t.niceClasses AS text) LIKE CONCAT('%', :niceClass, '%')) AND " +
           "(:yearFrom IS NULL OR YEAR(t.filingDate) >= :yearFrom) AND " +
           "(:yearTo IS NULL OR YEAR(t.filingDate) <= :yearTo)")
    Page<Trademark> searchTrademarks(
            @Param("query") String query,
            @Param("jurisdiction") String jurisdiction,
            @Param("status") String status,
            @Param("owner") String owner,
            @Param("niceClass") String niceClass,
            @Param("yearFrom") Integer yearFrom,
            @Param("yearTo") Integer yearTo,
            Pageable pageable);
    
    @Query("SELECT DISTINCT t.jurisdiction FROM Trademark t")
    List<String> findAllJurisdictions();
    
    @Query("SELECT DISTINCT t.status FROM Trademark t")
    List<String> findAllStatuses();
}
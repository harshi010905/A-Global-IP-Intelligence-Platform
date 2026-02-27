package com.example.globalipplatform.project.service;

import com.example.globalipplatform.project.DTO.PatentDTO;
import com.example.globalipplatform.project.DTO.PatentSearchRequest;
import com.example.globalipplatform.project.DTO.PatentSearchResponse;
import com.example.globalipplatform.project.DTO.TrademarkDTO;
import com.example.globalipplatform.project.DTO.TrademarkSearchRequest;
import com.example.globalipplatform.project.DTO.TrademarkSearchResponse;
import com.example.globalipplatform.project.entity.Patent;
import com.example.globalipplatform.project.entity.Trademark;
import com.example.globalipplatform.project.repository.PatentRepository;
import com.example.globalipplatform.project.repository.TrademarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MockIPService implements IPService {

    @Autowired
    private PatentRepository patentRepository;
    
    @Autowired
    private TrademarkRepository trademarkRepository;
    
    @Override
    public PatentSearchResponse searchPatents(PatentSearchRequest request, Pageable pageable) {
        Page<Patent> patentPage;
        
        if (request.getQuery() != null && !request.getQuery().isEmpty()) {
            patentPage = patentRepository.searchPatentsSimple(request.getQuery(), pageable);
        } else {
            patentPage = patentRepository.findAll(pageable);
        }
        
        List<PatentDTO> patents = patentPage.getContent()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        
        return new PatentSearchResponse(
            patents,
            patentPage.getTotalElements(),
            patentPage.getTotalPages(),
            patentPage.getNumber(),
            patentPage.getSize()
        );
    }
    
    @Override
    @Cacheable(value = "patents", key = "#id")
    public PatentDTO getPatentById(Long id) {
        Patent patent = patentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patent not found with id: " + id));
        return convertToDTO(patent);
    }
    
    @Override
    public PatentDTO getPatentByNumber(String patentNumber) {
        Patent patent = patentRepository.findByAssetNumber(patentNumber);
        if (patent == null) {
            throw new RuntimeException("Patent not found with number: " + patentNumber);
        }
        return convertToDTO(patent);
    }
    
    @Override
    public List<String> getAllTechnologies() {
        return patentRepository.findAllTechnologies();
    }
    
    @Override
    public List<String> getAllPatentJurisdictions() {
        return patentRepository.findAllJurisdictions();
    }
    
    @Override
    public List<String> getAllPatentStatuses() {
        return patentRepository.findAllStatuses();
    }
    
    @Override
    public TrademarkSearchResponse searchTrademarks(TrademarkSearchRequest request, Pageable pageable) {
        Page<Trademark> trademarkPage = trademarkRepository.findAll(pageable);
        
        List<TrademarkDTO> trademarks = trademarkPage.getContent()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        
        return new TrademarkSearchResponse(
            trademarks,
            trademarkPage.getTotalElements(),
            trademarkPage.getTotalPages(),
            trademarkPage.getNumber(),
            trademarkPage.getSize()
        );
    }
    
    @Override
    @Cacheable(value = "trademarks", key = "#id")
    public TrademarkDTO getTrademarkById(Long id) {
        Trademark trademark = trademarkRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trademark not found with id: " + id));
        return convertToDTO(trademark);
    }
    
    @Override
    public TrademarkDTO getTrademarkByNumber(String trademarkNumber) {
        Trademark trademark = trademarkRepository.findByAssetNumber(trademarkNumber);
        if (trademark == null) {
            throw new RuntimeException("Trademark not found with number: " + trademarkNumber);
        }
        return convertToDTO(trademark);
    }
    
    @Override
    public List<String> getAllTrademarkJurisdictions() {
        return trademarkRepository.findAllJurisdictions();
    }
    
    @Override
    public List<String> getAllTrademarkStatuses() {
        return trademarkRepository.findAllStatuses();
    }
    
    @Override
    public long getTotalPatentCount() {
        return patentRepository.count();
    }
    
    @Override
    public long getTotalTrademarkCount() {
        return trademarkRepository.count();
    }
    
    @Override
    public long getPatentCountByJurisdiction(String jurisdiction) {
        return 0; // Simplified for now
    }
    
    @Override
    public long getPatentCountByStatus(String status) {
        return 0; // Simplified for now
    }
    
    private PatentDTO convertToDTO(Patent patent) {
        PatentDTO dto = new PatentDTO();
        dto.setId(patent.getId());
        dto.setAssetNumber(patent.getAssetNumber());
        dto.setTitle(patent.getTitle());
        dto.setAbstractText(patent.getAbstractText());
        dto.setJurisdiction(patent.getJurisdiction());
        dto.setFilingDate(patent.getFilingDate());
        dto.setPublicationDate(patent.getPublicationDate());
        dto.setGrantDate(patent.getGrantDate());
        dto.setStatus(patent.getStatus());
        dto.setAssignee(patent.getAssignee());
        dto.setAssigneeCountry(patent.getAssigneeCountry());
        dto.setInventors(patent.getInventors());
        dto.setIpcClasses(patent.getIpcClasses());
        dto.setCpcClasses(patent.getCpcClasses());
        dto.setLegalStatus(patent.getLegalStatus());
        dto.setAnnualFeePaid(patent.getAnnualFeePaid());
        dto.setNextFeeDate(patent.getNextFeeDate());
        dto.setTechnology(patent.getTechnology());
        dto.setCitationCount(patent.getCitationCount());
        dto.setClaims(patent.getClaims());
        dto.setCitedPatents(patent.getCitedPatents());
        dto.setClaimCount(patent.getClaimCount());
        dto.setDrawingCount(patent.getDrawingCount());
        dto.setPatentType(patent.getPatentType());
        dto.setApplicationNumber(patent.getApplicationNumber());
        dto.setExaminer(patent.getExaminer());
        dto.setIsCorePatent(patent.getIsCorePatent());
        return dto;
    }
    
    private TrademarkDTO convertToDTO(Trademark trademark) {
        TrademarkDTO dto = new TrademarkDTO();
        dto.setId(trademark.getId());
        dto.setAssetNumber(trademark.getAssetNumber());
        dto.setMark(trademark.getMark());
        dto.setTitle(trademark.getTitle());
        dto.setJurisdiction(trademark.getJurisdiction());
        dto.setFilingDate(trademark.getFilingDate());
        dto.setStatus(trademark.getStatus());
        dto.setAssignee(trademark.getAssignee());
        dto.setMarkType(trademark.getMarkType());
        dto.setNiceClasses(trademark.getNiceClasses());
        dto.setGoodsServices(trademark.getGoodsServices());
        dto.setRegistrationNumber(trademark.getRegistrationNumber());
        dto.setApplicationNumber(trademark.getApplicationNumber());
        dto.setImageUrl(trademark.getImageUrl());
        dto.setIsLogo(trademark.getIsLogo());
        dto.setColorClaim(trademark.getColorClaim());
        dto.setRenewalDate(trademark.getRenewalDate());
        dto.setIsCoreTrademark(trademark.getIsCoreTrademark());
        return dto;
    }
}
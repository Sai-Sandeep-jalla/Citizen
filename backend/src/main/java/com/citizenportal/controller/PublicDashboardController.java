package com.citizenportal.controller;

import com.citizenportal.service.PublicDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/public/dashboard")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"}, allowCredentials = "true")
public class PublicDashboardController {

    @Autowired
    private PublicDashboardService publicDashboardService;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(publicDashboardService.getStats());
    }

    @GetMapping("/rankings/districts")
    public ResponseEntity<List<Map<String, Object>>> getDistrictRankings() {
        return ResponseEntity.ok(publicDashboardService.getDistrictRanking());
    }

    @GetMapping("/rankings/departments")
    public ResponseEntity<List<Map<String, Object>>> getDepartmentRankings() {
        return ResponseEntity.ok(publicDashboardService.getDepartmentRanking());
    }

    @GetMapping("/charts/trend")
    public ResponseEntity<List<Map<String, Object>>> getMonthlyTrend() {
        return ResponseEntity.ok(publicDashboardService.getMonthlyTrend());
    }

    @GetMapping("/charts/categories")
    public ResponseEntity<List<Map<String, Object>>> getCategoryDistribution() {
        return ResponseEntity.ok(publicDashboardService.getCategoryDistribution());
    }

    @GetMapping("/heatmap")
    public ResponseEntity<List<Map<String, Object>>> getHeatMapData() {
        return ResponseEntity.ok(publicDashboardService.getHeatMapData());
    }
}

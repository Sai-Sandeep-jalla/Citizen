package com.citizenportal.service;

import com.citizenportal.model.Complaint;
import com.citizenportal.model.ComplaintStatus;
import com.citizenportal.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PublicDashboardService {

    @Autowired
    private ComplaintRepository complaintRepository;

    public Map<String, Object> getStats() {
        List<Complaint> complaints = complaintRepository.findAll();

        long total = complaints.size();
        long resolved = complaints.stream()
                .filter(c -> c.getStatus() == ComplaintStatus.RESOLVED)
                .count();
        long pending = complaints.stream()
                .filter(c -> c.getStatus() == ComplaintStatus.PENDING || c.getStatus() == ComplaintStatus.ASSIGNED)
                .count();

        // Calculate average resolution time in hours
        double avgResolutionTimeHrs = complaints.stream()
                .filter(c -> c.getStatus() == ComplaintStatus.RESOLVED && c.getResolvedAt() != null)
                .mapToLong(c -> Duration.between(c.getCreatedAt(), c.getResolvedAt()).toHours())
                .average()
                .orElse(0.0);

        // Format to 1 decimal place (e.g. 24.5 hours)
        double formattedAvgTime = Math.round(avgResolutionTimeHrs * 10.0) / 10.0;

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalComplaints", total);
        stats.put("resolvedComplaints", resolved);
        stats.put("pendingComplaints", pending);
        stats.put("averageResolutionTimeHours", formattedAvgTime);
        return stats;
    }

    public List<Map<String, Object>> getDistrictRanking() {
        List<Complaint> complaints = complaintRepository.findAll();

        Map<String, List<Complaint>> byDistrict = complaints.stream()
                .collect(Collectors.groupingBy(Complaint::getDistrict));

        List<Map<String, Object>> ranking = new ArrayList<>();
        byDistrict.forEach((district, list) -> {
            long total = list.size();
            long resolved = list.stream().filter(c -> c.getStatus() == ComplaintStatus.RESOLVED).count();
            long pending = total - resolved;
            double rate = total > 0 ? (double) resolved / total * 100.0 : 0.0;
            double formattedRate = Math.round(rate * 10.0) / 10.0;

            Map<String, Object> entry = new HashMap<>();
            entry.put("district", district);
            entry.put("totalComplaints", total);
            entry.put("resolvedComplaints", resolved);
            entry.put("pendingComplaints", pending);
            entry.put("resolutionRate", formattedRate);
            ranking.add(entry);
        });

        // Sort by resolution rate (descending), then by total complaints
        ranking.sort((a, b) -> {
            int comp = Double.compare((Double) b.get("resolutionRate"), (Double) a.get("resolutionRate"));
            if (comp != 0) return comp;
            return Long.compare((Long) b.get("totalComplaints"), (Long) a.get("totalComplaints"));
        });

        // Add rank
        for (int i = 0; i < ranking.size(); i++) {
            ranking.get(i).put("rank", i + 1);
        }

        return ranking;
    }

    public List<Map<String, Object>> getDepartmentRanking() {
        List<Complaint> complaints = complaintRepository.findAll();

        Map<String, List<Complaint>> byDept = complaints.stream()
                .collect(Collectors.groupingBy(Complaint::getDepartment));

        List<Map<String, Object>> ranking = new ArrayList<>();
        byDept.forEach((dept, list) -> {
            long total = list.size();
            long resolved = list.stream().filter(c -> c.getStatus() == ComplaintStatus.RESOLVED).count();
            long pending = total - resolved;
            double rate = total > 0 ? (double) resolved / total * 100.0 : 0.0;
            double formattedRate = Math.round(rate * 10.0) / 10.0;

            Map<String, Object> entry = new HashMap<>();
            entry.put("department", dept);
            entry.put("totalComplaints", total);
            entry.put("resolvedComplaints", resolved);
            entry.put("pendingComplaints", pending);
            entry.put("resolutionRate", formattedRate);
            ranking.add(entry);
        });

        // Sort by resolution rate descending, then total complaints
        ranking.sort((a, b) -> {
            int comp = Double.compare((Double) b.get("resolutionRate"), (Double) a.get("resolutionRate"));
            if (comp != 0) return comp;
            return Long.compare((Long) b.get("totalComplaints"), (Long) a.get("totalComplaints"));
        });

        // Add rank
        for (int i = 0; i < ranking.size(); i++) {
            ranking.get(i).put("rank", i + 1);
        }

        return ranking;
    }

    public List<Map<String, Object>> getMonthlyTrend() {
        List<Complaint> complaints = complaintRepository.findAll();

        // Sort complaints by createdAt
        complaints.sort(Comparator.comparing(Complaint::getCreatedAt));

        // Group by month-year
        Map<String, List<Complaint>> byMonth = complaints.stream()
                .collect(Collectors.groupingBy(c -> {
                    String month = c.getCreatedAt().getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
                    int year = c.getCreatedAt().getYear();
                    return month + " " + year;
                }, LinkedHashMap::new, Collectors.toList()));

        List<Map<String, Object>> trend = new ArrayList<>();
        byMonth.forEach((monthYear, list) -> {
            long total = list.size();
            long resolved = list.stream().filter(c -> c.getStatus() == ComplaintStatus.RESOLVED).count();
            long pending = total - resolved;

            Map<String, Object> entry = new LinkedHashMap<>();
            entry.put("month", monthYear);
            entry.put("total", total);
            entry.put("resolved", resolved);
            entry.put("pending", pending);
            trend.add(entry);
        });

        return trend;
    }

    public List<Map<String, Object>> getCategoryDistribution() {
        List<Complaint> complaints = complaintRepository.findAll();
        long totalComplaints = complaints.size();

        Map<String, Long> byCategory = complaints.stream()
                .collect(Collectors.groupingBy(Complaint::getCategory, Collectors.counting()));

        List<Map<String, Object>> dist = new ArrayList<>();
        byCategory.forEach((category, count) -> {
            double pct = totalComplaints > 0 ? (double) count / totalComplaints * 100.0 : 0.0;
            double formattedPct = Math.round(pct * 10.0) / 10.0;

            Map<String, Object> entry = new HashMap<>();
            entry.put("category", category);
            entry.put("count", count);
            entry.put("percentage", formattedPct);
            dist.add(entry);
        });

        // Sort by count descending
        dist.sort((a, b) -> Long.compare((Long) b.get("count"), (Long) a.get("count")));
        return dist;
    }

    public List<Map<String, Object>> getHeatMapData() {
        List<Complaint> complaints = complaintRepository.findAll();

        return complaints.stream()
                .map(c -> {
                    Map<String, Object> point = new HashMap<>();
                    point.put("ticketId", c.getTicketId());
                    point.put("title", c.getTitle());
                    point.put("category", c.getCategory());
                    point.put("district", c.getDistrict());
                    point.put("latitude", c.getLatitude());
                    point.put("longitude", c.getLongitude());
                    point.put("status", c.getStatus().name());
                    return point;
                })
                .collect(Collectors.toList());
    }
}

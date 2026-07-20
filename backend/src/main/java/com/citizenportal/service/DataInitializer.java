package com.citizenportal.service;

import com.citizenportal.model.Complaint;
import com.citizenportal.model.ComplaintStatus;
import com.citizenportal.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Random;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ComplaintRepository complaintRepository;

    private final Random random = new Random(101); // Fixed seed for reproducible data

    @Override
    public void run(String... args) {
        if (complaintRepository.count() > 0) {
            return; // Data already seeded
        }

        String[] categories = {"Sanitation", "Water Supply", "Roads & Traffic", "Electricity", "Public Health", "Street Lights"};
        String[] departments = {"Municipal Sanitation Board", "Water Supply & Sewerage Board", "Public Works Department", "State Electricity Board", "Public Health Department", "Urban Development Authority"};
        String[] districts = {"Downtown District", "Metro North", "South Peninsula", "East Valley", "West Coast"};

        // Let's seed 70 complaints distributed over the last 6 months
        LocalDateTime now = LocalDateTime.now();

        // Coordinates bounding box for mock district map (Latitude: 12.90 to 13.05, Longitude: 77.50 to 77.70)
        double minLat = 12.90;
        double maxLat = 13.05;
        double minLng = 77.50;
        double maxLng = 77.70;

        for (int i = 1; i <= 70; i++) {
            int catIdx = random.nextInt(categories.length);
            String category = categories[catIdx];
            String department = departments[catIdx];
            String district = districts[random.nextInt(districts.length)];

            // Create dates distributed over last 6 months
            int daysAgo = random.nextInt(180);
            LocalDateTime createdAt = now.minusDays(daysAgo).minusHours(random.nextInt(24)).minusMinutes(random.nextInt(60));

            ComplaintStatus status;
            LocalDateTime resolvedAt = null;
            Integer rating = null;

            // Older complaints are more likely to be resolved
            if (daysAgo > 60) {
                // 90% chance resolved, 10% assigned
                if (random.nextDouble() < 0.90) {
                    status = ComplaintStatus.RESOLVED;
                    int resolutionDays = random.nextInt(14) + 1; // 1 to 14 days
                    resolvedAt = createdAt.plusDays(resolutionDays).plusHours(random.nextInt(24));
                    rating = random.nextInt(5) + 1; // 1 to 5 stars
                } else {
                    status = ComplaintStatus.ASSIGNED;
                }
            } else if (daysAgo > 15) {
                // 60% resolved, 30% assigned, 10% pending
                double roll = random.nextDouble();
                if (roll < 0.60) {
                    status = ComplaintStatus.RESOLVED;
                    int resolutionDays = random.nextInt(7) + 1;
                    resolvedAt = createdAt.plusDays(resolutionDays);
                    rating = random.nextInt(3) + 3; // 3 to 5 stars for recent resolutions
                } else if (roll < 0.90) {
                    status = ComplaintStatus.ASSIGNED;
                } else {
                    status = ComplaintStatus.PENDING;
                }
            } else {
                // Recent complaints: 20% resolved, 45% assigned, 35% pending
                double roll = random.nextDouble();
                if (roll < 0.20) {
                    status = ComplaintStatus.RESOLVED;
                    resolvedAt = createdAt.plusDays(random.nextInt(2) + 1);
                    rating = random.nextInt(3) + 3;
                } else if (roll < 0.65) {
                    status = ComplaintStatus.ASSIGNED;
                } else {
                    status = ComplaintStatus.PENDING;
                }
            }

            // Generate coordinates
            double latitude = minLat + (maxLat - minLat) * random.nextDouble();
            double longitude = minLng + (maxLng - minLng) * random.nextDouble();

            // Build complaint title
            String title = getMockTitle(category, i);
            String ticketId = String.format("CP-%05d", 10000 + i);

            Complaint complaint = Complaint.builder()
                    .ticketId(ticketId)
                    .title(title)
                    .description("Detailed citizen report regarding " + title.toLowerCase() + ". Please inspect and address this issue as soon as possible.")
                    .category(category)
                    .department(department)
                    .district(district)
                    .status(status)
                    .latitude(latitude)
                    .longitude(longitude)
                    .createdAt(createdAt)
                    .resolvedAt(resolvedAt)
                    .rating(rating)
                    .build();

            complaintRepository.save(complaint);
        }
    }

    private String getMockTitle(String category, int id) {
        return switch (category) {
            case "Sanitation" -> "Garbage accumulation near Block " + id;
            case "Water Supply" -> "Water leakage from main pipeline near spot " + id;
            case "Roads & Traffic" -> "Potholes blocking traffic near Junction " + id;
            case "Electricity" -> "Frequent power fluctuation at Sector " + id;
            case "Public Health" -> "Open drainage breeding mosquitoes near Street " + id;
            case "Street Lights" -> "Broken street lights making corner dark near plot " + id;
            default -> "Grievance Report " + id;
        };
    }
}

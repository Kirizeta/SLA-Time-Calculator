package com.example.time_calculator.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateTicketDTO {

    private Long partnerId;
    private Long priorityId;
    private Long productId;
    private Long categoryId;
    private Long subCategoryId;

    private String subject;
    private String descriptionText;
    private String channel;
}
using EClinic.Api.DTOs;

namespace EClinic.Api.Services.Interfaces;

public interface IAiClient
{
    Task<AiChatResponse> ChatAsync(AiChatRequest request, CancellationToken ct = default);
    Task<AiReportResponse> BuildReportAsync(AiReportRequest request, CancellationToken ct = default);
    Task<AiFollowUpResponse> NextFollowUpPromptAsync(AiFollowUpRequest request, CancellationToken ct = default);
    Task<AiFollowUpResponse> FollowUpRespondAsync(AiFollowUpRequest request, CancellationToken ct = default);
}
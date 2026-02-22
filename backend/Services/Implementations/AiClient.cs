using System.Net.Http.Json;
using EClinic.Api.DTOs;
using EClinic.Api.Services.Interfaces;
using Microsoft.Extensions.Configuration;

namespace EClinic.Api.Services.Implementations;

public class AiClient : IAiClient
{
    private readonly HttpClient _http;
    private readonly IConfiguration _config;

    public AiClient(HttpClient http, IConfiguration config)
    {
        _http = http;
        _config = config;
    }

    public async Task<AiChatResponse> ChatAsync(AiChatRequest request, CancellationToken ct = default)
    {
        return await PostAsync<AiChatRequest, AiChatResponse>("/chat", request, ct);
    }

    public async Task<AiReportResponse> BuildReportAsync(AiReportRequest request, CancellationToken ct = default)
    {
        return await PostAsync<AiReportRequest, AiReportResponse>("/report", request, ct);
    }

    public async Task<AiFollowUpResponse> NextFollowUpPromptAsync(AiFollowUpRequest request, CancellationToken ct = default)
    {
        return await PostAsync<AiFollowUpRequest, AiFollowUpResponse>("/followup/next", request, ct);
    }

    public async Task<AiFollowUpResponse> FollowUpRespondAsync(AiFollowUpRequest request, CancellationToken ct = default)
    {
        return await PostAsync<AiFollowUpRequest, AiFollowUpResponse>("/followup/respond", request, ct);
    }

    private async Task<TRes> PostAsync<TReq, TRes>(string path, TReq payload, CancellationToken ct)
    {
        // Optional API key header
        var apiKey = _config["AiService:ApiKey"];
        if (!string.IsNullOrWhiteSpace(apiKey) && !_http.DefaultRequestHeaders.Contains("X-API-KEY"))
            _http.DefaultRequestHeaders.Add("X-API-KEY", apiKey);

        var res = await _http.PostAsJsonAsync(path, payload, ct);
        res.EnsureSuccessStatusCode();

        var body = await res.Content.ReadFromJsonAsync<TRes>(cancellationToken: ct);
        return body ?? throw new InvalidOperationException("AI service returned empty response.");
    }
}
namespace Dft.DTRO.Admin.Services;
public class RuleService : IRuleService
{
    private readonly HttpClient _client;
    private readonly IAppIdService _appIdService;
    private readonly IErrHandlingService _errHandlingService;

    public RuleService(IHttpClientFactory clientFactory, IAppIdService appIdService, IErrHandlingService errHandlingService)
    {
        _client = clientFactory.CreateClient("ExternalApi");
        _appIdService = appIdService;
        _errHandlingService = errHandlingService;
    }

    public async Task UpdateRuleAsync(string version, IFormFile file)
    {
        using var content = new MultipartFormDataContent
        {
            { new StreamContent(file.OpenReadStream()), "file", file.FileName }
        };

        //var response = await _client.PutAsync($"/rules/updateFromFile/{version}", content);
        var request = new HttpRequestMessage(HttpMethod.Put, ConfigHelper.ApiBaseUrl + $"/rules/updateFromFile/{version}")
        {
            Content = content
        };
        await _appIdService.AddAppIdHeader(request);
        var response = await _client.SendAsync(request);
        await _errHandlingService.RedirectIfErrors(response);
    }

    public async Task CreateRuleAsync(string version, IFormFile file)
    {
        using var content = new MultipartFormDataContent
        {
            { new StreamContent(file.OpenReadStream()), "file", file.FileName }
        };
        var request = new HttpRequestMessage(HttpMethod.Post, ConfigHelper.ApiBaseUrl + $"/rules/createFromFile/{version}")
        {
            Content = content
        };
        await _appIdService.AddAppIdHeader(request);
        var response = await _client.SendAsync(request);
        await _errHandlingService.RedirectIfErrors(response);
    }
}
namespace Dft.DTRO.Admin.Services;
public class SchemaService : ISchemaService
{
    private readonly HttpClient _client;
    private readonly IAppIdService _appIdService;
    private readonly IErrHandlingService _errHandlingService;
    public SchemaService(IHttpClientFactory clientFactory, IAppIdService appIdService, IErrHandlingService errHandlingService)
    {
        _client = clientFactory.CreateClient("ExternalApi");
        _appIdService = appIdService;
        _errHandlingService = errHandlingService;
    }

    public async Task<List<SchemaTemplateOverview>> GetSchemaVersionsAsync()
    {
        var request = new HttpRequestMessage(HttpMethod.Get, ConfigHelper.Version + "/schemas/versions");
        await _appIdService.AddAppIdHeader(request);

        var response = await _client.SendAsync(request);
        await _errHandlingService.RedirectIfErrors(response);

        var content = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<List<SchemaTemplateOverview>>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
    }

    public async Task ActivateSchemaAsync(string version)
    {
        var request = new HttpRequestMessage(HttpMethod.Patch, ConfigHelper.Version + $"/schemas/activate/{version}");
        await _appIdService.AddAppIdHeader(request);

        var response = await _client.SendAsync(request);
        await _errHandlingService.RedirectIfErrors(response);
    }

    public async Task DeactivateSchemaAsync(string version)
    {
        //var response = await _client.PatchAsync($"/schemas/deactivate/{version}", null);
        var request = new HttpRequestMessage(HttpMethod.Patch, ConfigHelper.Version + $"/schemas/deactivate/{version}");
        await _appIdService.AddAppIdHeader(request);

        var response = await _client.SendAsync(request);
        await _errHandlingService.RedirectIfErrors(response);
    }

    public async Task UpdateSchemaAsync(string version, IFormFile file)
    {
        using var content = new MultipartFormDataContent
        {
            { new StreamContent(file.OpenReadStream()), "file", file.FileName }
        };
        var request = new HttpRequestMessage(HttpMethod.Put, ConfigHelper.Version + $"/schemas/updateFromFile/{version}")
        {
            Content = content
        };
        await _appIdService.AddAppIdHeader(request);

        var response = await _client.SendAsync(request);
        await _errHandlingService.RedirectIfErrors(response);
    }

    public async Task DeleteSchemaAsync(string version)
    {
        var request = new HttpRequestMessage(HttpMethod.Delete, ConfigHelper.Version + $"/schemas/{version}");
        await _appIdService.AddAppIdHeader(request);

        var response = await _client.SendAsync(request);
        await _errHandlingService.RedirectIfErrors(response);
    }

    public async Task CreateSchemaAsync(string version, IFormFile file)
    {
        using var content = new MultipartFormDataContent
        {
            { new StreamContent(file.OpenReadStream()), "file", file.FileName }
        };
        var request = new HttpRequestMessage(HttpMethod.Post, ConfigHelper.Version + $"/schemas/createFromFile/{version}")
        {
            Content = content
        };
        await _appIdService.AddAppIdHeader(request);

        var response = await _client.SendAsync(request);
        await _errHandlingService.RedirectIfErrors(response);
    }
}
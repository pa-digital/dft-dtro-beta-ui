using DfT.DTRO.Models.SystemConfig;

namespace Dft.DTRO.Admin.Services;
public class SystemConfigService : ISystemConfigService
{
    private readonly HttpClient _client;
    private readonly IAppIdService _appIdService;
    private readonly IErrHandlingService _errHandlingService;
    public SystemConfigService(IHttpClientFactory clientFactory, IAppIdService appIdService, IErrHandlingService errHandlingService)
    {
        _client = clientFactory.CreateClient("ExternalApi");
        _appIdService = appIdService;
        _errHandlingService = errHandlingService;
    }

    public async Task<bool> UpdateSystemConfig(SystemConfig systemConfig)
    {
        var content = JsonContent.Create(systemConfig);
        var request = new HttpRequestMessage(HttpMethod.Put, ConfigHelper.Version + $"/systemConfig/updateFromBody/")
        {
            Content = content
        };
        await _appIdService.AddAppIdHeader(request);

        var response = await _client.SendAsync(request);
        await _errHandlingService.RedirectIfErrors(response);

        _appIdService.ChangeAppId(systemConfig.AppId);
        return true;
    }


    public async Task<SystemConfig> GetSystemConfig()
    {
        var unknown = new SystemConfig() { SystemName = "Unknown", IsTest = false };
        try
        {
            var request = new HttpRequestMessage(HttpMethod.Get, ConfigHelper.Version + "/systemConfig");
            await _appIdService.AddAppIdHeader(request);

            var response = await _client.SendAsync(request);

            var jsonResponse = await response.Content.ReadAsStringAsync();
            if (jsonResponse == string.Empty)
            {
                return unknown;
            }
            var ret = JsonSerializer.Deserialize<SystemConfig>(jsonResponse, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            if (ret == null)
            {
                return unknown;
            }
            ret.AppId = _appIdService.MyAppId();
            return ret;
        }
        catch (Exception)
        {
            unknown.SystemName = "Not Connected";
            unknown.CurrentUserName = "";
            return unknown;
        }
    }
}
namespace Dft.DTRO.Admin.Services;
public interface IAppIdService
{
    Task<bool> AddAppIdHeader(HttpRequestMessage httpRequestMessage);
    Guid MyAppId();

    void ChangeAppId(Guid guid);
}
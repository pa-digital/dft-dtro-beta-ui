namespace DfT.DTRO.UI.Services;
public interface IXappIdService
{
    Task<bool> AddXAppIdHeader(HttpRequestMessage httpRequestMessage);
    Guid MyXAppId();

    void ChangeXAppId(Guid guid);
}
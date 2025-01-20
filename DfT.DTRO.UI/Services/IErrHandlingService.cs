
namespace DfT.DTRO.UI.Services;

public interface IErrHandlingService
{
    IActionResult HandleUiError(Exception ex);

    Task RedirectIfErrors(HttpResponseMessage response);
}
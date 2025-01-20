using DfT.DTRO.UI.Models.Errors;
namespace DfT.DTRO.UI.Models.Views;

public class ErrorView
{
    public string ErrorType { get; set; }
    public ApiErrorResponse ApiErrorResponse  { get; set; }
    public ApiErrorResponse UiErrorResponse { get; set; }
    public DtroValidationExceptionResponse DtroValidationException { get; set; }
}

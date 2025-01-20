namespace DfT.DTRO.UI.Models.Search;

public class DtroSearch : PaginatedRequest
{
    [MinLength(1)]
    public IEnumerable<SearchQuery> Queries { get; set; }
}
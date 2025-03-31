
namespace DfT.DTRO.Models.SystemConfig;

[DataContract]
public class SystemConfig
{
    [DataMember(Name = "systemName")]
    public string SystemName { get; set; }

    [DataMember(Name = "AppId")]
    public Guid AppId { get; set; }

    [DataMember(Name = "CurrentUserName")]
    public string CurrentUserName { get; set; }

    [DataMember(Name = "isTest")]
    public bool IsTest { get; set; }
}

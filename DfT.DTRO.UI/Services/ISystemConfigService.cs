namespace DfT.DTRO.UI.Services;

public interface ISystemConfigService
{
    Task<SystemConfig> GetSystemConfig();
    Task<bool> UpdateSystemConfig(SystemConfig systemConfig);

}
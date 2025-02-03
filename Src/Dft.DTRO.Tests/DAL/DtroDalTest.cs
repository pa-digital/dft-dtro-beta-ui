using Moq;
using Xunit;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DfT.DTRO.Caching;
using DfT.DTRO.Models.DtroEvent;

public class DtroDalTests
{
    private DtroContext GetInMemoryDtroContext()
    {
        var options = new DbContextOptionsBuilder<DtroContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new DtroContext(options);
    }

    [Fact]
    public async Task FindDtrosAsync_ReturnsFilteredResults()
    {
        // Arrange
        var context = GetInMemoryDtroContext();
        var mockProjectionService = new Mock<ISpatialProjectionService>();
        var mockMappingService = new Mock<IDtroMappingService>();
        var mockCache = new Mock<IRedisCache>();

        var dal = new DtroDal(context, mockProjectionService.Object, mockMappingService.Object, mockCache.Object);

        var dtro1 = new DTRO
        {
            Id = Guid.NewGuid(),
            TroName = "Test Dtro 1",
            Created = DateTime.UtcNow.AddDays(-10),
            LastUpdated = DateTime.UtcNow,
            TrafficAuthorityCreatorId = 1,
            TrafficAuthorityOwnerId = 2,
            VehicleTypes = null,
            RegulationTypes = null,
            Deleted = false
        };

        var dtro2 = new DTRO
        {
            Id = Guid.NewGuid(),
            TroName = "Test Dtro 2",
            Created = DateTime.UtcNow.AddDays(-5),
            LastUpdated = DateTime.UtcNow,
            TrafficAuthorityCreatorId = 1,
            TrafficAuthorityOwnerId = 3,
            VehicleTypes = null,
            RegulationTypes = null,
            Deleted = false
        };

        context.Dtros.AddRange(dtro1, dtro2);
        await context.SaveChangesAsync();

        var search = new DtroEventSearch
        {
            TroName = "Test Dtro 1",
            TraCreator = 1,
            Since = DateTime.UtcNow.AddDays(-20),
            VehicleType = "Car"
        };

        // Act
        var result = await dal.FindDtrosAsync(search);

        // Assert
        Assert.NotNull(result);
        Assert.Single(result);
        Assert.Equal(dtro1.Id, result.First().Id);
    }
}
using Microsoft.AspNetCore.Mvc;

namespace TariffComparison.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TariffProviderController : ControllerBase
    {
        private readonly ILogger<TariffProviderController> _logger;
        public TariffProviderController(ILogger<TariffProviderController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetTariff")]
        public IEnumerable<Tariff> Get(int Consumption)
        {
            List<Tariff> tariff = new List<Tariff>();
            if (Consumption != 0)
            {
                //Type 1 - Basic electricity tariff
                float baseAnnualCosts = (5 * 12) + (Consumption * 22 / 100);
                tariff.Add(new Tariff
                {
                    TariffName = "Basic electricity tariff",
                    Type = (int)TariffType.one,
                    BaseCost = 5,
                    AdditionalKwhCost = 22,
                    AnnualCosts = $"{baseAnnualCosts} €"
                });

                //Type 2 - Packaged tariff
                float packagedAnnualCosts = Consumption < 4000 ? 800 : 800 + ((Consumption - 4000) * 30 / 100);
                tariff.Add(new Tariff
                {
                    TariffName = "Packaged tariff",
                    Type = (int)TariffType.two,
                    IncludedKwh = 4000,
                    BaseCost = 800,
                    AdditionalKwhCost = 30,
                    AnnualCosts = $"{packagedAnnualCosts} €"
                });
            }
            return tariff;
        }
    }
}

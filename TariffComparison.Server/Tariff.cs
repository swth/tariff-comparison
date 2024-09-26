﻿namespace TariffComparison.Server
{
    public class Tariff
    {
        public string? TariffName { get; set; }
        public string? AnnualCosts { get; set; }

        public int Type { get; set; }
        public int BaseCost { get; set; }
        public int AdditionalKwhCost { get; set; }
        public int IncludedKwh { get; set; }
    }

    enum TariffType
    {
        one = 1,
        two = 2
    }
}

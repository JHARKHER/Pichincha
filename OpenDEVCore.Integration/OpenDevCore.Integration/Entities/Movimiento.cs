﻿namespace OpenDEVCore.Integration.Entities
{
    public partial class Movimiento
    {
        public int IdMovimiento { get; set; }
        public int? CuentaOrigen { get; set; }
        public string Beneficiario { get; set; }
        public int? CuentaDestino { get; set; }
        public string Concepto { get; set; }
        public decimal? Monto { get; set; }
        public string EmailDestino { get; set; }
    }
}

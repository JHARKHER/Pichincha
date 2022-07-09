using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Mvc;
using Core.RabbitMq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OpenDEVCore.Gateway.Services;
using OpenDEVCore.Integration.Dto;

namespace OpenDEVCore.Gateway.Controllers
{
    public class GatewayController : BaseController
    {
        private readonly IIntegrationService _iIntegrationService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public GatewayController(IBusPublisher busPublisher, IIntegrationService iIntegrationService, IHttpContextAccessor httpContextAccessor) : base(busPublisher)
        {
            {
                _iIntegrationService = iIntegrationService;
                _iIntegrationService.jsonSession = SessionContext.GetJsonSession();
                _httpContextAccessor = httpContextAccessor;
            }
        }

        //[AllowAnonymous]
        //[HttpPost("LogIn")]
        //public async Task<IActionResult> LogIn(DtoLoginDB oneDtoConsolidatedPositionDB)
        //{
        //    return Single(await _iIntegrationService.LogIn(oneDtoConsolidatedPositionDB));
        //}

        #region Accounts

        ///// <summary>
        ///// Obtener las cuentas del cliente
        ///// </summary>
        ///// <param name="unContextoCliente"></param>
        ///// <returns></returns>
        //[AllowAnonymous]
        //[HttpGet("GetClientAccounts")]
        //public async Task<IActionResult> GetClientAccounts()
        //{
        //    return Single(await _iIntegrationService.GetClientAccounts());
        //}

        ///// <summary>
        ///// Pagar Tarjeta Con Debito A Cuenta
        ///// </summary>
        ///// <param name="ctaMoneda"></param>
        ///// <param name="numeroCuenta"></param>
        ///// <param name="monedaTransaccion"></param>
        ///// <param name="monto"></param>
        ///// <param name="numeroTarjeta"></param>
        ///// <returns></returns>
        //[AllowAnonymous]
        //[HttpGet("PayCardWithDebitToAccount")]
        //public async Task<IActionResult> PayCardWithDebitToAccount(string ctaMoneda, string numeroCuenta, string monedaTransaccion, decimal monto, string numeroTarjeta)
        //{
        //    return Single(await _iIntegrationService.PayCardWithDebitToAccount(ctaMoneda, numeroCuenta, monedaTransaccion, monto, numeroTarjeta));
        //}

        #endregion Accounts

        #region Cards
        ///// <summary>
        ///// Consultar Pagos de Tarjeta
        ///// </summary>
        ///// <param name="numeroTarjeta"></param>
        ///// <returns></returns>
        //[AllowAnonymous]
        //[HttpGet("ConsultCardBalances")]
        //public async Task<IActionResult> ConsultCardBalances(string numeroTarjeta)
        //{
        //    return Single(await _iIntegrationService.ConsultCardBalances(numeroTarjeta));
        //}

        ///// <summary>
        ///// Consultar el estado de cuenta de la tarjeta
        ///// </summary>
        ///// <param name="numeroTarjeta"></param>
        ///// <param name="fechaCorte"></param>
        ///// <returns></returns>
        //[AllowAnonymous]
        //[HttpGet("ConsultStatusOfCardAccount")]
        //public async Task<IActionResult> ConsultStatusOfCardAccount(string numeroTarjeta, DateTime fechaCorte)
        //{
        //    return Single(await _iIntegrationService.ConsultStatusOfCardAccount(numeroTarjeta, fechaCorte));
        //}

        ///// <summary>
        ///// Consultar los últimos movimientos de Tarjeta
        ///// </summary>
        ///// <param name="numeroTarjeta"></param>
        ///// <returns></returns>
        //[AllowAnonymous]
        //[HttpGet("ConsultTheLatestCardMovements")]
        //public async Task<IActionResult> ConsultTheLatestCardMovements(string numeroTarjeta)
        //{
        //    return Single(await _iIntegrationService.ConsultTheLatestCardMovements(numeroTarjeta));
        //}
        #endregion Cards

        #region Credits

        ///// <summary>
        ///// Consulta de Créditos Vigentes
        ///// </summary>
        ///// <param name="numeroDocumento"></param>
        ///// <returns></returns>
        //[AllowAnonymous]
        //[HttpGet("ConsultationCurrentCredits")]
        //public async Task<IActionResult> ConsultationCurrentCredits(string numeroDocumento)
        //{
        //    return Single(await _iIntegrationService.ConsultationCurrentCredits(numeroDocumento));
        //}

        ///// <summary>
        ///// Pagar crédito con débito a cuenta
        ///// </summary>
        ///// <param name="manageContact"></param>
        ///// <returns></returns>
        //[AllowAnonymous]
        //[HttpGet("PayCreditWithDebitToAccount")]
        //public async Task<IActionResult> PayCreditWithDebitToAccount(string ctaMoneda, string numeroCuenta, string monto, string numeroCredito)
        //{
        //    return Single(await _iIntegrationService.PayCreditWithDebitToAccount(ctaMoneda, numeroCuenta, monto, numeroCredito));
        //}

        #endregion Credits



        /*[AllowAnonymous]
        [HttpGet("ConsultationAllowedAccounts")]
        public async Task<IActionResult> ConsultationAllowedAccounts(int IdCliente)
        {
            return Single(await _iIntegrationService.ConsultationAllowedAccounts(IdCliente));
        }*/

        /*[AllowAnonymous]
        [HttpGet("CheckClientAccountsACH")]
        public async Task<IActionResult> CheckClientAccountsACH(int CodigoCliente)
        {
            return Single(await _iIntegrationService.CheckClientAccountsACH(CodigoCliente));
        }*/

        //[AllowAnonymous]
        //[HttpPost("SendOTP")]
        //public async Task<IActionResult> SendOTP(DtoCliente unCliente)
        //{
        //    return Single(await _iIntegrationService.SendOTP(unCliente));
        //}

        ///// <summary>
        ///// Consulta de Movimientos por Fecha
        ///// </summary>
        ///// <param name="Codigo"></param>
        ///// <param name="fechaDesde"></param>
        ///// <param name="fechaHasta"></param>
        ///// <returns></returns>
        //[AllowAnonymous]
        //[HttpGet("ConsultationMovementsDates")]
        //public async Task<IActionResult> ConsultationMovementsDates(string Codigo, DateTime fechaDesde, DateTime fechaHasta)
        //{
        //    return Single(await _iIntegrationService.ConsultationMovementsDates(Codigo, fechaDesde, fechaHasta));
        //}

        //[AllowAnonymous]
        //[HttpGet("ConsultationChannelAccount")]
        //public async Task<IActionResult> ConsultationChannelAccount(string numeroCuenta)
        //{
        //    return Single(await _iIntegrationService.ConsultationChannelAccount(numeroCuenta));
        //}

        //[AllowAnonymous]
        //[HttpPost("DeleteBeneficiaryAccount")]
        //public async Task<IActionResult> DeleteBeneficiaryAccount(DtoCuentaPermitidaTransferencia unCuentaPermitidaTransferencia)
        //{
        //    return Single(await _iIntegrationService.DeleteBeneficiaryAccount(unCuentaPermitidaTransferencia));
        //}

        //[AllowAnonymous]
        //[HttpPost("DeleteAllowedAccountACH")]
        //public async Task<IActionResult> DeleteAllowedAccountACH(List<DtoTransferenciaExterna> listaTransferenciaExterna)
        //{
        //    return Single(await _iIntegrationService.DeleteAllowedAccountACH(listaTransferenciaExterna));
        //}

        ///// <summary>
        ///// Realizar transferencia directa
        ///// </summary>
        ///// <param name="unaCanalTransferencia"></param>
        ///// <param name="correoOrigen"></param>
        ///// <param name="correoDestino"></param>
        ///// <param name="concepto"></param>
        ///// <returns></returns>
        //[AllowAnonymous]
        //[HttpPost("MakeDirectTransfer")]
        //public async Task<IActionResult> MakeDirectTransfer(DtoCanalTransferencia unaCanalTransferencia)
        //{
        //    return Single(await _iIntegrationService.MakeDirectTransfer(unaCanalTransferencia));
        //}

        //[AllowAnonymous]
        //[HttpPost("ConsultationPaymentServices")]
        //public async Task<IActionResult> ConsultationPaymentServices(DtoRequerimiento unRequerimiento)
        //{
        //    return Single(await _iIntegrationService.ConsultationPaymentServices(unRequerimiento));
        //}

        //[AllowAnonymous]
        //[HttpPost("MakePaymentServices")]
        //public async Task<IActionResult> MakePaymentServices(string ctaMoneda, string numeroCuenta, decimal monto, string codigoAtributo, string keyOTP, string valueOTP, DtoRequerimiento unRequerimiento)
        //{
        //    return Single(await _iIntegrationService.MakePaymentServices(ctaMoneda, numeroCuenta, monto, codigoAtributo, keyOTP, valueOTP, unRequerimiento));
        //}

        //[AllowAnonymous]
        //[HttpGet("ConsultCatalogServices")]
        //public async Task<IActionResult> ConsultCatalogServices(string tipoComercio, string tipoBusquedaSeleccionada, string numero)
        //{
        //    return Single(await _iIntegrationService.ConsultCatalogServices(tipoComercio, tipoBusquedaSeleccionada, numero));
        //}

        /// <summary>
        /// Posición Consolidada - Validar Pin y logín de usuarios
        /// </summary>
        /// <param name="oneDtoConsolidatedPositionDB"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("InsertarMovimiento")]
        public async Task<IActionResult> InsertarMovimiento(DtoMovimiento unMovimiento)
        {
            var respuesta = Single(await _iIntegrationService.InsertarMovimiento(unMovimiento));
            return respuesta;
        }

        /* [AllowAnonymous]
         [HttpPost("CreateAllowedAccount")]
         public async Task<IActionResult> CreateAllowedAccount(DtoCuentaPermitida_F unaCuentaPermitida_F)
         {
             return Single(await _iIntegrationService.CreateAllowedAccount(unaCuentaPermitida_F));
         }

         [AllowAnonymous]
         [HttpPost("CreateAllowedAccountACH")]
         public async Task<IActionResult> CreateAllowedAccountACH(int idCliente, DtoCuentaBeneficiariaExterna unaCuentaBeneficiariaExterna)
         {
             return Single(await _iIntegrationService.CreateAllowedAccountACH(idCliente, unaCuentaBeneficiariaExterna));
         }*/

        //[AllowAnonymous]
        //[HttpPost("SendMailContact")]
        //public async Task<IActionResult> SendMailContact(DtoCorreoContacto_F unCorreoContacto_F)
        //{
        //    return Single(await _iIntegrationService.SendMailContact(unCorreoContacto_F));
        //}



        #region Contactos del Beneficiario

        ///// <summary>
        ///// Consultar todos los contactos
        ///// </summary>
        ///// <param name="manageContact"></param>
        ///// <returns></returns>
        //[AllowAnonymous]
        //[HttpGet("ConsultingAllContacts")]
        //public async Task<IActionResult> ConsultingAllContacts(bool manageContact)
        //{
        //    return Single(await _iIntegrationService.ConsultingAllContacts(manageContact));
        //}

        ///// <summary>
        ///// Consultar un contacto
        ///// </summary>
        ///// <param name="_iIdentificacion"></param>
        ///// <param name="manageContact"></param>
        ///// <returns></returns>
        //[AllowAnonymous]
        //[HttpGet("ConsultingOneContact")]
        //public async Task<IActionResult> ConsultingOneContact(string _iIdentificacion, bool manageContact)
        //{
        //    return Single(await _iIntegrationService.ConsultingOneContact(_iIdentificacion, manageContact));
        //}

        ///// <summary>
        ///// Añadir un contacto
        ///// </summary>
        ///// <param name="newContact"></param>
        ///// <param name="manageContact"></param>
        ///// <returns></returns>
        //[AllowAnonymous]
        //[HttpPost("AddOneContact")]
        //public async Task<IActionResult> AddOneContact(DtoContact newContact, bool manageContact)
        //{
        //    return Single(await _iIntegrationService.AddOneContact(newContact, manageContact));
        //}

        ///// <summary>
        ///// Editar un contacto
        ///// </summary>
        ///// <param name="newContact"></param>
        ///// <param name="manageContact"></param>
        ///// <returns></returns>
        //[AllowAnonymous]
        //[HttpPost("EditOneContact")]
        //public async Task<IActionResult> EditOneContact(DtoContact newContact, bool manageContact)
        //{
        //    return Single(await _iIntegrationService.EditOneContact(newContact, manageContact));
        //}

        ///// <summary>
        ///// Borrar un contacto
        ///// </summary>
        ///// <param name="_iIdentificacion"></param>
        ///// <param name="manageContact"></param>
        ///// <returns></returns>
        //[AllowAnonymous]
        //[HttpGet("DeleteOneContact")]
        //public async Task<IActionResult> DeleteOneContact(string _iIdentificacion, bool manageContact)
        //{
        //    return Single(await _iIntegrationService.DeleteOneContact(_iIdentificacion, manageContact));
        //}
        #endregion Contactos del Beneficiario




    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Mvc;
using Core.Types;
using Microsoft.AspNetCore.Authorization;
using OpenDEVCore.Integration.Dto;
using OpenDEVCore.OTP.Dto;
using RestEase;

namespace OpenDEVCore.Gateway.Services
{
    [Header("AppName", "OpenDEVCore.Gateway")]
    public interface IIntegrationService : IProxy
    {
        //[AllowAnyStatusCode]
        //[Post("DigitalBank/LogIn")]
        //Task<CoreResponse<DtoClienteDB>> LogIn([Body] DtoLoginDB oneDtoConsolidatedPositionDB
        //);

        #region Accounts

        //[AllowAnyStatusCode]
        //[Get("DigitalBank/GetClientAccounts")]
        //Task<CoreResponse<List<DtoCuentasCliente>>> GetClientAccounts(
        //);

        //[AllowAnyStatusCode]
        //[Get("DigitalBank/PayCardWithDebitToAccount")]
        //Task<CoreResponse<DtoCuentasCliente>> PayCardWithDebitToAccount([Query] string ctaMoneda, [Query] string numeroCuenta, [Query] string monedaTransaccion, [Query] decimal monto, [Query] string numeroTarjeta
        //);

        #endregion Accounts

        #region Cards

        //[AllowAnyStatusCode]
        //[Get("DigitalBank/ConsultCardBalances")]
        //Task<CoreResponse<DtoTarjeta>> ConsultCardBalances([Query] string numeroTarjeta
        //);

        //[AllowAnyStatusCode]
        //[Get("DigitalBank/ConsultStatusOfCardAccount")]
        //Task<CoreResponse<List<DtoTarjetaEstadoCuenta>>> ConsultStatusOfCardAccount([Query]string numeroTarjeta, [Query] DateTime fechaCorte
        //);

        //[AllowAnyStatusCode]
        //[Get("DigitalBank/ConsultTheLatestCardMovements")]
        //Task<CoreResponse<List<DtoTarjetaEstadoCuenta>>> ConsultTheLatestCardMovements([Query]string numeroTarjeta
        //);
        #endregion Cards

        #region Credits

        //[AllowAnyStatusCode]
        //[Get("DigitalBank/ConsultationCurrentCredits")]
        //Task<CoreResponse<List<DtoCredito>>> ConsultationCurrentCredits([Query] string numeroDocumento
        //);

        //[AllowAnyStatusCode]
        //[Get("DigitalBank/PayCreditWithDebitToAccount")]
        //Task<CoreResponse<List<DtoCredito>>> PayCreditWithDebitToAccount([Query] string ctaMoneda, [Query] string numeroCuenta, [Query] string monto, [Query] string numeroCredito
        //);

        #endregion Credits

        #region Movements



        #endregion Movements

        /* [AllowAnyStatusCode]
         [Get("DigitalBank/ConsultationAllowedAccounts")]
         Task<CoreResponse<DtoCuentaPermitidaTransferencia>> ConsultationAllowedAccounts([Query] int IdCliente
         );*/

        /* [AllowAnyStatusCode]
         [Get("DigitalBank/CheckClientAccountsACH")]
         Task<CoreResponse<DtoTransferenciaExterna>> CheckClientAccountsACH([Query] int CodigoCliente
          );*/

        //[AllowAnyStatusCode]
        //[Post("DigitalBank/SendOTP")]
        //Task<CoreResponse<DtoCuentaPermitidaTransferencia>> SendOTP([Body] DtoCliente unCliente
        // );

        //[AllowAnyStatusCode]
        //[Get("DigitalBank/ConsultationMovementsDates")]
        //Task<CoreResponse<List<DtoConsultaMovimientos>>> ConsultationMovementsDates([Query] string Codigo, [Query] DateTime fechaDesde, [Query] DateTime fechaHasta
        // );

        //[AllowAnyStatusCode]
        //[Get("DigitalBank/ConsultationChannelAccount")]
        //Task<CoreResponse<DtoCuentaCanal>> ConsultationChannelAccount([Query] string numeroCuenta
        //);

        //[AllowAnyStatusCode]
        //[Post("DigitalBank/DeleteBeneficiaryAccount")]
        //Task<CoreResponse<bool>> DeleteBeneficiaryAccount([Body] DtoCuentaPermitidaTransferencia unCuentaPermitidaTransferencia
        //);

        //[AllowAnyStatusCode]
        //[Post("DigitalBank/DeleteAllowedAccountACH")]
        //Task<CoreResponse<bool>> DeleteAllowedAccountACH([Body] List<DtoTransferenciaExterna> listaTransferenciaExterna
        //);

        //[AllowAnyStatusCode]
        //[Post("DigitalBank/MakeDirectTransfer")]
        //Task<CoreResponse<DtoCanalTransferencia>> MakeDirectTransfer([Body] DtoCanalTransferencia unaCanalTransferencia
        //);

        //[AllowAnyStatusCode]
        //[Post("DigitalBank/ConsultationPaymentServices")]
        //Task<CoreResponse<DtoRespuestaSaldo>> ConsultationPaymentServices([Body] DtoRequerimiento unRequerimiento
        //);

        //[AllowAnyStatusCode]
        //[Post("DigitalBank/MakePaymentServices")]
        //Task<CoreResponse<bool>> MakePaymentServices([Query] string ctaMoneda, [Query] string numeroCuenta, [Query] decimal monto, [Query] string codigoAtributo, [Query] string keyOTP, [Query] string valueOTP, [Body] DtoRequerimiento unRequerimiento
        //);

        //[AllowAnyStatusCode]
        //[Get("DigitalBank/ConsultCatalogServices")]
        //Task<CoreResponse<bool>> ConsultCatalogServices([Query] string tipoComercio, [Query] string tipoBusquedaSeleccionada, [Query] string numero
        //);

        [AllowAnyStatusCode]
        [Post("Integration/InsertarMovimiento")]
        Task<CoreResponse<string>> InsertarMovimiento([Body] DtoMovimiento unMovimiento
         );

        /* [AllowAnyStatusCode]
         [Post("DigitalBank/CreateAllowedAccount")]
         Task<CoreResponse<DtoCuentaPermitidaTransferencia>> CreateAllowedAccount([Body] DtoCuentaPermitida_F unaCuentaPermitida_F
         );

         [AllowAnyStatusCode]
         [Post("DigitalBank/CreateAllowedAccountACH")]
         Task<CoreResponse<DtoTransferenciaExterna>> CreateAllowedAccountACH([Query] int idCliente, [Body] DtoCuentaBeneficiariaExterna unaCuentaBeneficiariaExterna
         );*/

        //[AllowAnyStatusCode]
        //[Post("DigitalBank/SendMailContact")]
        //Task<CoreResponse<bool>> SendMailContact([Body] DtoCorreoContacto_F unCorreoContacto_F
        //);





        #region Contactos del Beneficiario
        ///// <summary>
        ///// Consultar todos los contactos
        ///// </summary>
        ///// <param name="manageContact"></param>
        ///// <returns></returns>
        //[AllowAnyStatusCode]
        //[Get("DigitalBank/ConsultingAllContacts")]
        //Task<CoreResponse<List<DtoContact>>> ConsultingAllContacts([Query] bool manageContact);

        ///// <summary>
        ///// Consultar un contacto
        ///// </summary>
        ///// <param name="_iIdentificacion"></param>
        ///// <param name="manageContact"></param>
        ///// <returns></returns>
        //[AllowAnyStatusCode]
        //[Get("DigitalBank/ConsultingOneContact")]
        //Task<CoreResponse<DtoContact>> ConsultingOneContact([Query] string _iIdentificacion, [Query] bool manageContact);

        ///// <summary>
        ///// Añadir un contacto
        ///// </summary>
        ///// <param name="newContact"></param>
        ///// <param name="manageContact"></param>
        ///// <returns></returns>
        //[AllowAnyStatusCode]
        //[Post("DigitalBank/AddOneContact")]
        //Task<CoreResponse<bool>> AddOneContact([Body] DtoContact newContact, [Query] bool manageContact);

        ///// <summary>
        ///// Editar un contacto
        ///// </summary>
        ///// <param name="newContact"></param>
        ///// <param name="manageContact"></param>
        ///// <returns></returns>
        //[AllowAnyStatusCode]
        //[Post("DigitalBank/EditOneContact")]
        //Task<CoreResponse<bool>> EditOneContact([Body] DtoContact newContact, [Query] bool manageContact);

        ///// <summary>
        ///// Borrar un contacto
        ///// </summary>
        ///// <param name="_iIdentificacion"></param>
        ///// <param name="manageContact"></param>
        ///// <returns></returns>
        //[AllowAnyStatusCode]
        //[Get("DigitalBank/DeleteOneContact")]
        //Task<CoreResponse<bool>> DeleteOneContact([Query] string _iIdentificacion, [Query] bool manageContact);

        #endregion Contactos del Beneficiario
    }
}

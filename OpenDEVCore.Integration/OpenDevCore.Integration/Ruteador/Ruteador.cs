using System.Threading.Tasks;
using OpenDEVCore.Integration.Dto;
using OpenDEVCore.Integration.Helpers;
using OpenDEVCore.Integration.Services.Interface;

namespace OpenDEVCore.Integration.Ruteador
{
    public class Ruteador : IRuteador
    {
        private readonly IExMessages _iExMessages;
        private readonly IMovimientoServices _iIMovimientoServices;
        public Ruteador(IMovimientoServices iIMovimientoServices)
        {
            _iIMovimientoServices = iIMovimientoServices;
        }
        public async Task<string> InsertarMovimiento(DtoMovimiento iMovimiento)
        {
            string resultado = "";
            try            {
                 resultado= await _iIMovimientoServices.InsertarMovimiento(iMovimiento);
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
            return resultado;
        }
    }
}
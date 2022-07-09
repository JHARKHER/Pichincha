using System.Threading.Tasks;
using AutoMapper;
using OpenDEVCore.Integration.Dto;
using OpenDEVCore.Integration.Entities;
using OpenDEVCore.Integration.Repositories.Interface;
using OpenDEVCore.Integration.Services.Interface;

namespace OpenDEVCore.Integration.Services.Service
{
    public class MovimientoServices : IMovimientoServices
    {
        private readonly IMapper _iImapper;
        private readonly IIntegrationRepository _iIntegrationRepository;

        public MovimientoServices(IMapper iImapper, IIntegrationRepository iIntegrationRepository)
        {
            _iImapper = iImapper;
            _iIntegrationRepository = iIntegrationRepository;
        }

        public async Task<string> InsertarMovimiento(DtoMovimiento iMovimiento)
        {
            string exitoso = "Depósito o Transacción exitosa";
            string no_exitoso = "Depósito o Transacción no exitosa";
            var entityMovimiento = _iImapper.Map<Movimiento>(iMovimiento);
            var dato = await _iIntegrationRepository.InsertarMovimiento(entityMovimiento);
            if (dato)
                return exitoso;
            else
                return no_exitoso;
        }
    }
}

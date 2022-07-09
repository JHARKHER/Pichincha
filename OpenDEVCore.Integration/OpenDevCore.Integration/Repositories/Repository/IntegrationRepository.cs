using System.Threading.Tasks;
using OpenDEVCore.Integration.Entities;
using OpenDEVCore.Integration.Repositories.Interface;

namespace OpenDEVCore.Integration.Repositories.Repository
{
    public class IntegrationRepository : IIntegrationRepository
    {
        private readonly IntegrationContext _iIntegrationContext;
       
        public IntegrationRepository(IntegrationContext iIntegrationContext)
        {
            _iIntegrationContext = iIntegrationContext;
        }              

        public async Task<bool> InsertarMovimiento(Movimiento _iMovimiento)
        {

            //try
            //{
                _iIntegrationContext.Movimiento.Add(_iMovimiento);
                return await _iIntegrationContext.SaveChangesAsync() > 0;
            //}
            //catch (System.Exception ex)
            //{
            //    throw ex;
            //}            
        }

    }
}

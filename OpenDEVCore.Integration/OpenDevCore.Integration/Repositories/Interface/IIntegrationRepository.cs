using System.Threading.Tasks;
using OpenDEVCore.Integration.Entities;

namespace OpenDEVCore.Integration.Repositories.Interface
{
    public interface IIntegrationRepository
    {
        Task<bool> InsertarMovimiento(Movimiento _iMovimiento);
    }
}

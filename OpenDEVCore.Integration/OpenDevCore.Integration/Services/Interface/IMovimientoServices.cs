using System.Threading.Tasks;
using OpenDEVCore.Integration.Dto;

namespace OpenDEVCore.Integration.Services.Interface
{
    public interface IMovimientoServices
    {
        Task<string> InsertarMovimiento(DtoMovimiento iMovimiento);
    }
}
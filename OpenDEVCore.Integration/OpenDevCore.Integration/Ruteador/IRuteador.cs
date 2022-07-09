using System.Threading.Tasks;
using OpenDEVCore.Integration.Dto;

namespace OpenDEVCore.Integration.Ruteador
{
    public interface IRuteador
    {        
        Task<string> InsertarMovimiento(DtoMovimiento iMovimiento);
    }
}

using Core.Exceptions;
using Core.Types;

namespace OpenDEVCore.OTP.Helpers
{
    public interface IExMessages
    {
        ResourceExDescription EntityValidationError { get; }
        ResourceExDescription EntityDoesNotExists { get; }
        ResourceExDescription EntityAllreadyExists { get; }
        ResourceExDescription InstitutionNotExist { get; }
        ResourceExDescription BadRequestOTP { get; }        
        ResourceExDescription Map(CoreResponse coreResponse);
    }
}
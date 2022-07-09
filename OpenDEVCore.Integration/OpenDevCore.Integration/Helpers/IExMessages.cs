using Core.Exceptions;
using Core.Types;

namespace OpenDEVCore.Integration.Helpers
{
    internal interface IExMessages
    {
        ResourceExDescription EntityValidationError { get; }
        ResourceExDescription EntityDoesNotExists { get; }
        ResourceExDescription EntityAllreadyExists { get; }
        ResourceExDescription InstitutionNotExist { get; }
        ResourceExDescription Map(CoreResponse coreResponse);
    }
}
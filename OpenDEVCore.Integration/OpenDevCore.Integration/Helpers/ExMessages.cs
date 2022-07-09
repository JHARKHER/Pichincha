using System.Reflection;
using System.Resources;
using Core.Exceptions;
using Core.Types;

namespace OpenDEVCore.Integration.Helpers
{

    public class ExMessages : ExceptionUtils<ExMessages>, IExMessages
    {
        public static string defaultExCode { get => "INT999"; }
        static ResourceManager rm = new ResourceManager("OpenDEVCore.Integration.Recursos.Resource", Assembly.GetExecutingAssembly());
        // Validaciones pre definidas para las entidades         
        public ResourceExDescription EntityValidationError { get => new ResourceExDescription("EFV001", "Error de validación"); }
        public ResourceExDescription EntityDoesNotExists { get => new ResourceExDescription("BAS001", "Entidad no existe"); }
        public ResourceExDescription EntityAllreadyExists { get => new ResourceExDescription("BAS002", "Entidad ya existe"); }


        // Validación de Excepciones de Integration
        public ResourceExDescription InstitutionNotExist { get => new ResourceExDescription("INT001", "Institution Does Not Exist"); }
        //public static ResourceExDescription ClienteEnSAT = 
        //              new ResourceExDescription("BUR039", "En SIB pero si en SAT. Cliente aplica flujo impresión-agencia");
        //public static ResourceExDescription ClienteSinNitEnIntegration = 
        //              new ResourceExDescription("BUR110", "La identificación ingresada no corresponde al Nit del Buró. Aplica Flujo Fábrica con Justificación");

        public ResourceExDescription Map(CoreResponse coreResponse) => Map(new ExMessages(), defaultExCode, coreResponse);
    }
}

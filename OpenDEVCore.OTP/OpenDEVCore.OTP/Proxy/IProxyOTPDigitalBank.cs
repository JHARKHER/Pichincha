using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Mvc;
using Core.Types;
using OpenDEVCore.OTP.Dto;
using OpenDEVCore.Integration.Dto;
using RestEase;

namespace OpenDEVCore.OTP.Proxy
{
    public interface IProxyOTPDigitalBank : IProxy
    {
       
        [AllowAnyStatusCode]
        [Post("DigitalBank/LogIn")]
        Task<CoreResponse<DtoCliente>> LogIn([Query] string userName, [Query] string password, [Query] DateTime lastTimeAccesedPosition, [Query] bool esRegistro, [Query] string TokenAPNGCM
        );

    }
}

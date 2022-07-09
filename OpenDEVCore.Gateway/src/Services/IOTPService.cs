using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Mvc;
using Core.RestEase;
using Core.Types;
using OpenDEVCore.OTP.Dto;
using RestEase;

namespace OpenDEVCore.Gateway.Services
{
    [Header("AppName", "OpenDEVCore.Gateway")]
    public interface IOTPService : IProxy
    {
        [AllowAnyStatusCode]
        [Post("OTP/CreateOTP")]
        Task<CoreResponse<DtoOTP>> CreateOTP([Body] DtoOTP oneTiemPin
        );
    }
}

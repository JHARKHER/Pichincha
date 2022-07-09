using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Core.Mvc;
using Microsoft.Extensions.Logging;
using OpenDEVCore.OTP.Services;
using OpenDEVCore.Integration.Dto;
using Microsoft.AspNetCore.Authorization;
using OpenDEVCore.OTP.Dto;

namespace OpenDEVCore.OTP.Controllers
{
    public class OTPController : BaseController
    {
        private readonly IOTPServices _iOTPServices;

        public OTPController(IOTPServices iOTPServices)
        {
            _iOTPServices = iOTPServices;
        }

        [AllowAnonymous]
        [HttpPost("CreateOTP")]
        public async Task<IActionResult> CreateOTP(DtoOTP oneTiemPin)
         => Ok(await _iOTPServices.CreateOTP(oneTiemPin));

        [AllowAnonymous]
        [HttpPost("ValidateOTP")]
        public async Task<IActionResult> ValidateOTP(DtoOTP oneTiemPin)
        => Ok(await _iOTPServices.ValidateOTP(oneTiemPin));
    }
}

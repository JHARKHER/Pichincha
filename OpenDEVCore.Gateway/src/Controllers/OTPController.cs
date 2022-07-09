using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Mvc;
using Core.RabbitMq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenDEVCore.Gateway.Services;
using OpenDEVCore.OTP.Dto;

namespace OpenDEVCore.Gateway.Controllers
{
    public class OTPController : BaseController
    {
        private readonly IOTPService _iIOTPService;

        public OTPController(IBusPublisher busPublisher, IOTPService iIOTPService) : base(busPublisher)
        {
            _iIOTPService = iIOTPService;
        }

        [AllowAnonymous]
        [HttpPost("CreateOTP")]
        public async Task<IActionResult> CreateOTP(DtoOTP oneTiemPin)
        {
            return Single(await _iIOTPService.CreateOTP(oneTiemPin));
        }

    }
}

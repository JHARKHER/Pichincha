using Core.Mvc;
using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenDEVCore.Integration.Dto;
using OpenDEVCore.Integration.Ruteador;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OpenDEVCore.Integration.Controllers
{
    public class IntegrationController : BaseController
    {
        private readonly IRuteador _iIRuteador;

        public IntegrationController(IRuteador iIRuteador)
        {
            _iIRuteador = iIRuteador;
        }

        /// <summary>
        /// Insertar un Movimiento Financiero
        /// </summary>
        /// <param name="dtoMovimiento"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("InsertarMovimiento")]
        public async Task<IActionResult> InsertarMovimiento(DtoMovimiento iMovimiento)
        => Ok(await _iIRuteador.InsertarMovimiento(iMovimiento)
        );

    }
}

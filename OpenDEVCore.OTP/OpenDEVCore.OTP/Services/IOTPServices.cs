using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OpenDEVCore.OTP.Dto;
using OpenDEVCore.Integration.Dto;

namespace OpenDEVCore.OTP.Services
{
    public interface IOTPServices
    {
        Task<DtoOTP> CreateOTP(DtoOTP oneTimePin);
        Task<string> GetOTPForCreate(int numDigits);
        Task<object> ValidateOTP(DtoOTP oneTimePin);
        Task<object> GetOTPForValidate(DtoResponseOTP responseOTP);
    }
}
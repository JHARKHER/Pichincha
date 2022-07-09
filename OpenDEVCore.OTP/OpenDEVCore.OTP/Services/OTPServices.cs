using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Mvc;
using Core.Types;
using OpenDEVCore.OTP.Dto;
using OpenDEVCore.OTP.Helpers;
using OpenDEVCore.OTP.Proxy;
using Microsoft.Extensions.Caching.Distributed;
using System.Security.Cryptography;
using System.Text;
using Newtonsoft.Json;

namespace OpenDEVCore.OTP.Services
{
    public class OTPServices : IOTPServices
    {
        private readonly IProxyOTPDigitalBank _iIProxyOTPDigitalBank;        
        private readonly IMapper _iAutoMapper;
        private readonly IExMessages _iExMessages;
        private readonly IDistributedCache _cache;
        //Institución quemada        
        const string institucionDummy = "Dummy";
        const string institucionDummyA = "DummyA";
        const string institucionBankPlus = "BankPlus";
        //Variable desde el Front End - "Bank Plus", "Dummy", "DummyA" 
        string codeInstitucion = "Dummy";
        string userCode = "631725";

        public OTPServices(IProxyOTPDigitalBank iIProxyOTPDigitalBank, IMapper iAutoMapper, IExMessages iExMessages, IDistributedCache cache)
        {
            _iIProxyOTPDigitalBank = iIProxyOTPDigitalBank;            
            _iAutoMapper = iAutoMapper;
            _iExMessages = iExMessages;
            _cache = cache;
        }

        #region CreateOTP

        public async Task<DtoOTP> CreateOTP(DtoOTP oneTimePin)
        {            
            if ((oneTimePin != null) &&
               (!string.IsNullOrEmpty(oneTimePin.key)) &&
               (oneTimePin.numDigits > 0) &&
               (oneTimePin.retries > 0) &&
               (oneTimePin.exposition > 0))
            {                   
                //Creating OTP                
                var randomNumber = await this.GetOTPForCreate(oneTimePin.numDigits); 
                oneTimePin.creationDate = DateTime.Now;   
                oneTimePin.otp = randomNumber;
                oneTimePin.maxRetries = oneTimePin.retries;
                oneTimePin.currentRetries = 0;
                var cacheEntryOptions = new DistributedCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromSeconds(oneTimePin.exposition));
                //Guarda la información en Redis
                await _cache.SetAsync(oneTimePin.key, Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(oneTimePin)),
                cacheEntryOptions);
               
                return oneTimePin;
            }
            else
            {                
                throw new CoreException(_iExMessages.BadRequestOTP);
            }
        }

        public async Task<string> GetOTPForCreate(int numDigits)
        {
            var min = Convert.ToInt32(new String('1', numDigits));
            var max = Convert.ToInt32(new String('9', numDigits));

            var csprng = RandomNumberGenerator.Create();
            var scale = uint.MaxValue;

            while (scale == uint.MaxValue)
            {
                var four_bytes = new byte[4];
                csprng.GetBytes(four_bytes);
                scale = BitConverter.ToUInt32(four_bytes, 0);
            }
            return ((int)(min + (max - min) * (scale / (double)uint.MaxValue))).ToString();
        }
        #endregion CreateOTP

        #region ValidateOTP
        public async Task<object> ValidateOTP(DtoOTP oneTimePin)
        {
            if ((oneTimePin != null) &&
                (!string.IsNullOrEmpty(oneTimePin.key)) &&
                (!string.IsNullOrEmpty(oneTimePin.otp)))
            {
                //Validating OTP
                var result = await _cache.GetAsync(oneTimePin.key);
                if (result != null)
                {
                    var otp = JsonConvert.DeserializeObject<DtoOTP>(Encoding.UTF8.GetString(result));
                    if (otp != null)
                    {

                        if (Equals(otp.otp, oneTimePin.otp))
                        {
                            await _cache.RemoveAsync(oneTimePin.key);
                            return new DtoResponseOTP { code = "00", message = "OK", payload = otp.payload }; ;
                        }
                        else
                        {
                            otp.currentRetries++;

                            if (otp.currentRetries > otp.maxRetries)
                            {
                                await _cache.RemoveAsync(oneTimePin.key);

                                return await this.GetOTPForValidate(new DtoResponseOTP
                                {
                                    code = "02",
                                    message = "¡Llegó al número máximo intentos: "+otp.maxRetries+"!"
                                });
                            }
                            else
                            {
                                // Retries
                                var remainingSeconds = otp.exposition - (DateTime.Now - otp.creationDate).TotalSeconds;
                                var cacheEntryOptions = new DistributedCacheEntryOptions()
                                .SetAbsoluteExpiration(TimeSpan.FromSeconds(remainingSeconds));

                                await _cache.SetAsync(oneTimePin.key,
                                Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(otp)),
                                cacheEntryOptions);

                                return await this.GetOTPForValidate(new DtoResponseOTP
                                {
                                    code = "01",
                                    message = $"¡Ingreso incorrecto! - Máximo de intentos:"+otp.maxRetries+" - Intento #:"+otp.currentRetries+" - Tiempo restante: "+Convert.ToInt32(remainingSeconds)+" segundos"
                                });
                            }

                        }
                    }
                    else
                        return await this.GetOTPForValidate(new DtoResponseOTP
                        {
                            code = "04",
                            message = "Error general"
                        });
                }
                else
                    return await this.GetOTPForValidate(new DtoResponseOTP
                    {
                        code = "03",
                        message = "¡OTP no existe o expiró!"
                    });
            }
            else
                throw new CoreException(_iExMessages.BadRequestOTP);
        }

        public async Task<object> GetOTPForValidate(DtoResponseOTP responseOTP)
        {
            var obj = JsonConvert.SerializeObject(responseOTP, Formatting.None, new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore
            });
            return JsonConvert.DeserializeObject(obj);
        }

        #endregion ValidateOTP

    }
}
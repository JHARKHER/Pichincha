using AutoMapper;
using OpenDEVCore.OTP.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Core.General.CoreAutoMapperSet;

namespace OpenDEVCore.OTP.Helpers
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            //Default
            CreateMap<DateTime, long>().ConvertUsing(new DateTimeLongTypeConverter());
            CreateMap<long, DateTime>().ConvertUsing(new LongDateTimeTypeConverter());

            // Traspaso de la información de Dtos a entidades o viceversa
           
        }
    }
}

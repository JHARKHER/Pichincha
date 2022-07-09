using System;
using AutoMapper;
using OpenDEVCore.Integration.Dto;
using OpenDEVCore.Integration.Entities;
using static Core.General.CoreAutoMapperSet;


namespace OpenDEVCore.Integration.Helpers
{

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            //Default
            CreateMap<DateTime, long>().ConvertUsing(new DateTimeLongTypeConverter());
            CreateMap<long, DateTime>().ConvertUsing(new LongDateTimeTypeConverter());

            // Traspaso de la información de Dtos a entidades o viceversa
            CreateMap<DtoMovimiento, Movimiento>().ReverseMap();

        }
    }

}

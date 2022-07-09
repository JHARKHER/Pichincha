using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace OpenDEVCore.OTP
{
    public class Program : BaseProgram<Startup>
    {
        public static void Main(string[] args)
        {
            Initialize(args);
        }

    }
}

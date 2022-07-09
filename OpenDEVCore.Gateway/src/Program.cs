using System;
using Core.Mvc;

namespace OpenDEVCore.Gateway
{
    /// <summary>
    /// 
    /// </summary>
    public class Program : BaseProgram<Startup>
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="args"></param>
        public static void Main(string[] args)
        {
            try
            {
                Initialize(args);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}

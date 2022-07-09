using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using AutoMapper;
using Core;
using Core.Authentication;
using Core.Dispatchers;
using Core.Mvc;
using Core.RestEase;
using Core.Swagger;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using OpenDEVCore.OTP.Helpers;
using OpenDEVCore.OTP.Proxy;

namespace OpenDEVCore.OTP
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public IContainer Container { get; private set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {          
            //services.AddScoped<IServiceProviderRepository, ServiceProviderRepository>();
            services.AddAutoMapper(typeof(Startup));
            services.AddMvc(options => options.EnableEndpointRouting = false).SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddDistributedRedisCache(options =>
            {
                options.Configuration = Configuration.GetValue<string>("redis:host")
                                + ":" + Configuration.GetValue<string>("redis:port");
                options.InstanceName = Configuration.GetValue<string>("redis:name");
            });
            services.AddSingleton<IExMessages, ExMessages>();
            // External sources - Proxies
            services.RegisterServiceForwarder<IProxyOTPDigitalBank>("DigitalBank-service"); //Proxy Configuration  
            //services.AddDbContext<DBContext>(item => item.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = (context) =>
                {
                    var errors = context.ModelState.Values.SelectMany(x => x.Errors.Select(p => p.ErrorMessage)).ToList();
                    var result = new
                    {
                        Code = "INT001",
                        Message = "Error de validación",
                        Errors = errors
                    };
                    return new BadRequestObjectResult(result);
                };
            });
            services.AddCustomMvc();
            services.AddJwt();
            services.AddMemoryCache();            

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", cors =>
                        cors.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader());
            });

            //services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Documentación de DB - Digital Bank",
                    Version = "v1",
                    Description = "REST API  para Digital Bank",
                    Contact = new OpenApiContact()
                    {
                        Name = "César Orlando Oleas",
                        Email = "Cesar.Oleas@portalesit.net"
                    }
                });

                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
            //services.AddSingleton<IExMessages, ExMessages>();
            var builder = new ContainerBuilder();
            builder.RegisterAssemblyTypes(Assembly.GetEntryAssembly())
                .AsImplementedInterfaces();
            builder.Populate(services);
            builder.AddDispatchers();
            Container = builder.Build();

            return new AutofacServiceProvider(Container);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env,
            IHostApplicationLifetime applicationLifetime,
            IStartupInitializer startupInitializer)
        {
            if (env.IsDevelopment() || env.EnvironmentName == "local")
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors("CorsPolicy");
            app.UseAllForwardedHeaders();

            app.UseSwagger();
            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "OpenDEVCore.OTP - Swagger");
                c.RoutePrefix = string.Empty;
            });

            app.UseSessionHandlerMiddleware();
            app.UseErrorHandler();
            app.UseBaseResponseMiddleware();
            app.UseServiceId();
            app.UseMvc();
            
        
            startupInitializer.InitializeAsync();
           
        }
    }
}

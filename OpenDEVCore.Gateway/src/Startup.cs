using System;
using System.IO;
using System.Reflection;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Core;
using Core.Authentication;
using Core.Dispatchers;
using Core.Mvc;
using Core.RabbitMq;
using Core.Redis;
using Core.RestEase;
using Core.SignalR;
using Core.Swagger;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using OpenDEVCore.Gateway.DB.Hubs;
using OpenDEVCore.Gateway.Services;
//using OpenDEVCore.Services;

namespace OpenDEVCore.Gateway
{
    /// <summary>
    /// StartUp de ApiWateGay
    /// </summary>
    public class Startup
    {
        private static readonly string[] Headers = new[] { "X-Operation", "X-Resource", "X-Total-Count" };
        /// <summary>
        /// Container
        /// </summary>
        public IContainer Container { get; private set; }
        /// <summary>
        /// Interface IConfiguration
        /// </summary>
        public IConfiguration Configuration { get; }

        /// <summary>
        /// Startup
        /// </summary>
        /// <param name="configuration"></param>
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        /// <summary>
        /// ConfigureServices
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {

            services.AddCustomMvc();
            services.AddJwt();
            services.AddRedis();
            services.AddAuthorization(x => x.AddPolicy("admin", p => p.RequireRole("admin")));
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", cors =>
                        cors.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .WithExposedHeaders(Headers));
            });

            services.AddSwaggerGen(c =>
            {
                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
            //Para cada controlador en el destino un services.RegisterServiceForwarder
            services.RegisterServiceForwarder<IIntegrationService>("Integration-service");
            //services.RegisterServiceForwarder<IPublicServicesService>("PublicServices-DigitalBank");
            //services.RegisterServiceForwarder<ITransferService>("Transfer-DigitalBank");
            //services.RegisterServiceForwarder<IAccountService>("Account-DigitalBank");
            //services.RegisterServiceForwarder<ICreditService>("Credit-DigitalBank");
            //services.RegisterServiceForwarder<ICreditCardService>("CreditCard-DigitalBank");
            //services.RegisterServiceForwarder<IContactService>("Contact-DigitalBank");
            //services.RegisterServiceForwarder<IOTPService>("OTP-DigitalBank");
            services.AddMvc(options => options.EnableEndpointRouting = false).SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddSignalR();
            services.AddSingleton<IWebsocketUserService, WebsocketUserService>();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Documentación del DB.Api - Gateway",
                    Version = "v1",
                    Description = "REST API  para Digital Bank",
                    Contact = new OpenApiContact()
                    {
                        Name = "César Orlando Oleas",
                        Email = "cesar.orlando.o.p@gmail.com"
                    }
                });

                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
            var builder = new ContainerBuilder();
            builder.RegisterAssemblyTypes(Assembly.GetEntryAssembly())
                    .AsImplementedInterfaces();
            builder.Populate(services);
            builder.AddRabbitMq();
            builder.AddDispatchers();
            Container = builder.Build();

            return new AutofacServiceProvider(Container);
        }

        /// <summary>
        /// Configure
        /// </summary>
        /// <param name="app"></param>
        /// <param name="env"></param>
        /// <param name="applicationLifetime"></param>
        /// <param name="startupInitializer"></param>
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
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "OpenDEVCore.Gateway - Swagger");
                c.RoutePrefix = string.Empty;
            });
            app.UseErrorHandler();
            app.UseGatewaySessionHandlerMiddleware();
            app.UseAuthentication();
            app.UseAccessTokenValidator();
            app.UseServiceId();
            app.UseMvc();
            app.UseRabbitMq();
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<WorkflowHub>("/signalr");
            });

            app.UseWhen(
               httpContext => !httpContext.Request.Path.StartsWithSegments("/FileBlobStorage") ||
               !httpContext.Request.Path.StartsWithSegments("/FileFormController"),
               subApp => subApp.UseBaseResponseMiddleware()
            );
            startupInitializer.InitializeAsync();
        }
    }
}


using System;
using System.IO;
using System.Linq;
using System.Reflection;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using AutoMapper;
using Core;
using Core.Data;
using Core.Data.Repositories;
using Core.Dispatchers;
using Core.Mvc;
using Core.RabbitMq;
using Core.Redis;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using OpenDEVCore.Integration.Helpers;
using OpenDEVCore.Integration.Repositories;
using OpenDEVCore.Integration.Repositories.Interface;
using OpenDEVCore.Integration.Repositories.Repository;

namespace OpenDEVCore.Integration
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public IContainer Container { get; private set; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            // Inyección de dependencias por cada servicio 
            services.AddScoped<IIntegrationRepository, IntegrationRepository>();
            //services.AddScoped<IDetalleInformacionIntegrationRepository, DetalleInformacionIntegrationRepository>();
            //services.AddScoped<ISujetoIntegrationRepository, SujetoIntegrationRepository>();
            //services.AddScoped<IRespuestaIntegrationRepository, RespuestaIntegrationRepository>();
            //services.AddScoped<IIntegrationRepository, IntegrationRepository>();

            services.AddAutoMapper(typeof(Startup));
            services.AddMvc(options => options.EnableEndpointRouting = false).SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddSingleton<IExMessages, ExMessages>();
            // Fuentes externas Proxies
            //services.RegisterServiceForwarder<IProxyIntegrationDummy>("dummy"); // Configurado dummy Proxy            
            //services.RegisterServiceForwarder<IProxyIntegrationDummyA>("dummya");
                   
            services.AddSqlClient();
            services.AddTransient<IConnectionStrings, ConnectionStrings>();
            services.AddTransient<IDatabaseCatalogRepository, DatabaseCatalogRepository>();
            //services.AddDbContext<SuiteInfrastructureContext>(item => item.UseSqlServer(Configuration.GetConnectionString("InfrastructureConnection")));
            services.AddDbContext<IntegrationContext>(item => item.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
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
            services.AddRedis();
            services.AddMemoryCache();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", cors =>
                        cors.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader());
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Documentación de Integration",
                    Version = "v1",
                    Description = "REST API  para la integracion",
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
            //builder.RegisterType<IntegrationContext>().AsSelf().As<DbContext>().InstancePerLifetimeScope();
            builder.RegisterAssemblyTypes(Assembly.GetEntryAssembly()).AsImplementedInterfaces();            
            builder.Populate(services);
            builder.AddRabbitMq();
            builder.AddDispatchers();
            Container = builder.Build();
            return new AutofacServiceProvider(Container);
        }

        public void Configure(IApplicationBuilder app, IHostEnvironment env,
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
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "OpenDEVCore.Integration - Swagger");
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

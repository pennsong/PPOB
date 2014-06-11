using PPOB.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace PPOB
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            //建立数据库
            Database.SetInitializer<PPOBContext>(new PPOBInitializer());

            using (var context = new PPOBContext())
            {
                System.Data.Entity.Core.Objects.ObjectContext objcontext = ((IObjectContextAdapter)context).ObjectContext;
            }
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            ModelMetadataProviders.Current = new EnumMetadataProvider();
        }
    }

    public class EnumMetadataProvider : CachedDataAnnotationsModelMetadataProvider
    {
        protected override CachedDataAnnotationsModelMetadata CreateMetadataFromPrototype(
            CachedDataAnnotationsModelMetadata prototype, Func<object> modelAccessor)
        {
            var metadata = base.CreateMetadataFromPrototype(prototype, modelAccessor);
            var type = metadata.ModelType;
            if (type.IsEnum ||
                (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(Nullable<>) &&
                type.GetGenericArguments().Length == 1 && type.GetGenericArguments()[0].IsEnum))
            {
                metadata.TemplateHint = "Enum";
            }
            return metadata;
        }
    }
}

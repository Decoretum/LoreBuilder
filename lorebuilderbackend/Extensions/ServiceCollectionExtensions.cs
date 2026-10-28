using FileSystemHandlers;

namespace Extensions;

public static class ServiceCollectionExtensions 
{
    public static IServiceCollection AddCustomServices(
        this IServiceCollection services
    )
    {
        services.AddSingleton<IimageHandler, ImageHandler>();
        return services;
    }
}
public class DBTest : IStartupFilter
{
    public Action<IApplicationBuilder> Configure(Action<IApplicationBuilder> next)
    {
        return builder =>
        {
            // 1. Add middleware that runs BEFORE subsequent middlewares
            builder.Use(async (context, nextMiddleware) =>
            {
                await nextMiddleware();
            });

            // 2. Call the rest of the application's configuration pipeline
            next(builder);
            Console.WriteLine("TESTING");


            // 3. (Optional) Add middleware that runs AFTER the rest of the pipeline
        };
    }
}
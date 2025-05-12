package SecurityConfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


//@Configuration
public class CorsHandler implements WebMvcConfigurer {
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/backend/**")
        	.allowedOrigins("http://localhost:5173")
            .allowedMethods("*")
            .allowedHeaders("Content-Type", "Authorization")
            .exposedHeaders("Custom-Header")
            .maxAge(6000)
            .allowCredentials(true);
          
    }

}

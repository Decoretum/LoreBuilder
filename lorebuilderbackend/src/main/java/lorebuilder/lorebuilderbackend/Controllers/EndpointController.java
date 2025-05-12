package lorebuilder.lorebuilderbackend.Controllers;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Collections;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.websocket.Session;
import lorebuilder.lorebuilderbackend.DTO.login;

@RestController
@RequestMapping("/backend")
//@CrossOrigin	
public class EndpointController {
	
	@Value("${spring.datasource.url}")
	private String sqlDataSource;
	
	@GetMapping("/getAuthentication")
	public String hello () {
		return "Hello";
	}
	
//	@GetMapping("/getAuthentication")
//	public HashMap<Object, Object> getAuthentication (HttpServletRequest req, HttpServletResponse res) {
//		HashMap<Object, Object> hm = new HashMap<>();
//		HttpSession session = req.getSession();
//		
//		// Put data into hashmap
//		hm.put("user", session.getAttribute("userId"));
//		hm.put("token", session.getAttribute("token"));
//		hm.put("sessionId", session.getAttribute("sessionId"));
//		System.out.println(session.getId());
//		
//		// Get Current Session
//		System.out.println("Session keys: " + Collections.list(session.getAttributeNames()));
//		
//		// Access Cookies
//		Cookie[] cookies = req.getCookies();
//		for (Cookie cookie : cookies) {
//			System.out.println(cookie);
//		}
//		return hm;
//	}
//	
//	@PostMapping(value = "/login", consumes = "application/json")
//	public HashMap<Object, Object> login(@RequestBody login json, HttpServletRequest req, HttpServletResponse res) {
//		System.out.println("Logging in");
//		HashMap<Object, Object> hm = new HashMap<>();
//		try (Connection con = DriverManager.getConnection(sqlDataSource, "root", "")) {
//			try (Statement stm = con.createStatement()) {
//				HttpSession session = req.getSession(true);
//				stm.execute("SELECT * FROM bike");
//				ResultSet resultSet = stm.getResultSet();
//				
//				// Add Cookie
//				Cookie cookie = new Cookie("LoreSessionCookie", session.getId());
//				res.addCookie(cookie);
////				cookie.setHttpOnly(false);
////				cookie.setSecure(false);
////				cookie.setPath("/");
////				cookie.setDomain("https:localhost://5173");
//				
//				// Make session
//				HttpSession session2 = req.getSession(true);
//				session2.setAttribute("User", "Gael");
//				session.setAttribute("User", "Gael");
//				
//				return hm;
//				
//				
//			}
//			
//		} catch (Exception e) {
//			System.out.println(e.getMessage());
//			return hm;
//		}
//	}
	
	
}

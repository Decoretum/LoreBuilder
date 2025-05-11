package lorebuilder.lorebuilderbackend.Controllers;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.CreatedBy;
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
public class EndpointController {
	
	@Value("${spring.datasource.url}")
	private String sqlDataSource;
	
	@GetMapping("/getAuthentication")
	public HashMap<Object, Object> getAuthentication (HttpServletRequest req, HttpServletResponse res, HttpSession session) {
		HashMap<Object, Object> hm = new HashMap<>();
		hm.put("user", session.getAttribute("userId"));
		hm.put("token", session.getAttribute("token"));
		System.out.println(session.getId());
		
		return hm;
	}
	
	@PostMapping(value = "/login", consumes = "application/json")
	public void login(@RequestBody login json, HttpServletRequest req, HttpServletResponse res) {
		System.out.println("Logging in");
		try (Connection con = DriverManager.getConnection(sqlDataSource, "root", "")) {
			try (Statement stm = con.createStatement()) {
				HttpSession session = req.getSession(true);
				stm.execute("SELECT * FROM bike");
				ResultSet resultSet = stm.getResultSet();
				session.setAttribute("userId", json.getUserName());
				session.setAttribute("token", json.getPassword());
				session.setAttribute("sessionId", session.getId());
				
//				// Add Cookie
//				Cookie cookie = new Cookie("Cookie", "LoreSessionCookie=" + session.getId());
//				res.addCookie(cookie);
			}
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
}

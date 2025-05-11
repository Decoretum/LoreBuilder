package lorebuilder.lorebuilderbackend.JWTUtilities;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Jwts;

public class JwtUtility {
	
	public static String generateToken(String userName) {
		// Generation of JWT
		SecretKey key = Jwts.SIG.HS256.key().build();
		String jws = Jwts.builder()
				.subject(userName).signWith(key)
				.compact();
		
		// Assigning of Session Object
		return jws;
	}
}

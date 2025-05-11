package lorebuilder.lorebuilderbackend;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.HashMap;

import javax.crypto.SecretKey;

public class demo {

	public static void main (String args[])
	{
		// We need a signing key (private key), so we'll create one just for this example. Usually
		// the key would be read from your application configuration instead.
		SecretKey key = Jwts.SIG.HS256.key().build();
		
		HashMap<String, String> hm = new HashMap<>();
		hm.put("user", "Decoretum");
		
		// Compacted and Signed JWT using the key
		String jws = Jwts.builder()
				.header()
				.add(hm)
				.add("Purpose", "Software Development")
				.and()
				.subject("Decoretum").signWith(key)
				.compact();
		
		// Assert that "Joe" is the subject as we verify the JWT
		// We verify the JWT's signature using the private key that we used
		// Realistically, we use the "JwtException" to catch the error exception and proceed
		boolean isValid = Jwts.parser().verifyWith(key).build().parseSignedClaims(jws).getPayload().getSubject().equals("Joe");
		System.out.println(isValid);
	}

}

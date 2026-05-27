package com.cinemax.service;

import com.cinemax.model.Usuario;
import com.cinemax.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    /**
     * Inicia sesión validando email y contraseña contra la base de datos.
     * @throws RuntimeException si las credenciales son inválidas
     */
    public Map<String, Object> login(String email, String password) {
        String normalizedEmail = normalizeEmail(email);
        Optional<Usuario> optUser = usuarioRepository.findByEmail(normalizedEmail);

        if (optUser.isEmpty()) {
            throw new RuntimeException("Email o contraseña incorrectos");
        }

        Usuario usuario = optUser.get();
        String hashedPassword = hashPassword(password);
        boolean matchesHashed = usuario.getPassword().equals(hashedPassword);
        boolean matchesLegacyPlainText = usuario.getPassword().equals(password);

        if (!matchesHashed && !matchesLegacyPlainText) {
            throw new RuntimeException("Email o contraseña incorrectos");
        }

        // Migra automáticamente passwords legacy en texto plano a SHA-256.
        if (matchesLegacyPlainText && !matchesHashed) {
            usuario.setPassword(hashedPassword);
            usuarioRepository.save(usuario);
        }

        return buildAuthResponse(usuario);
    }

    /**
     * Registra un nuevo usuario en la base de datos.
     * @throws RuntimeException si el email ya está registrado
     */
    public Map<String, Object> register(String nombre, String email, String password) {
        String normalizedName = normalizeName(nombre);
        String normalizedEmail = normalizeEmail(email);

        if (usuarioRepository.existsByEmail(normalizedEmail)) {
            throw new RuntimeException("El email ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(normalizedName);
        usuario.setEmail(normalizedEmail);
        usuario.setPassword(hashPassword(password));

        usuario = usuarioRepository.save(usuario);

        return buildAuthResponse(usuario);
    }

    /**
     * Construye la respuesta de autenticación con token y datos del usuario.
     */
    private Map<String, Object> buildAuthResponse(Usuario usuario) {
        String token = UUID.randomUUID().toString();

        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("id", usuario.getId());
        userInfo.put("name", usuario.getNombre());
        userInfo.put("email", usuario.getEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", userInfo);
        return response;
    }

    /**
     * Hashea la contraseña con SHA-256.
     */
    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));

            // Convertir bytes a hexadecimal
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error al hashear la contraseña", e);
        }
    }

    private String normalizeEmail(String email) {
        if (email == null) {
            throw new RuntimeException("El email es obligatorio");
        }
        return email.trim().toLowerCase();
    }

    private String normalizeName(String nombre) {
        if (nombre == null || nombre.trim().isEmpty()) {
            throw new RuntimeException("El nombre es obligatorio");
        }
        return nombre.trim();
    }
}

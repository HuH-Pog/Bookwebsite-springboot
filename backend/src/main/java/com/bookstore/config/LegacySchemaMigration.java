package com.bookstore.config;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class LegacySchemaMigration {

    public LegacySchemaMigration(JdbcTemplate jdbcTemplate) {
        Integer legacyColumnCount = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM information_schema.columns "
                        + "WHERE table_schema = DATABASE() AND table_name = 'users' AND column_name = 'full_name'",
                Integer.class);
        Integer currentColumnCount = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM information_schema.columns "
                        + "WHERE table_schema = DATABASE() AND table_name = 'users' AND column_name = 'name'",
                Integer.class);

        if (legacyColumnCount != null && legacyColumnCount > 0
                && currentColumnCount != null && currentColumnCount == 0) {
            jdbcTemplate.execute("ALTER TABLE users CHANGE COLUMN full_name name VARCHAR(255) NOT NULL");
        } else if (legacyColumnCount != null && legacyColumnCount > 0
                && currentColumnCount != null && currentColumnCount > 0) {
            jdbcTemplate.execute("UPDATE users SET name = full_name WHERE name IS NULL OR name = ''");
            jdbcTemplate.execute("ALTER TABLE users DROP COLUMN full_name");
        }
    }
}

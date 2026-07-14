CREATE DATABASE IF NOT EXISTS eventcraft;
USE eventcraft;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255),
    display_name VARCHAR(255) NOT NULL,
    photo_url TEXT,
    role ENUM('user', 'guest', 'admin') DEFAULT 'user',
    status ENUM('active', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    guest_converted_at TIMESTAMP NULL,
    is_anonymous BOOLEAN DEFAULT FALSE,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Events table
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    sender_name VARCHAR(255) NOT NULL,
    receiver_name VARCHAR(255) NOT NULL,
    relationship VARCHAR(255),
    event_date DATE,
    main_message TEXT,
    theme VARCHAR(50) DEFAULT 'elegant',
    enabled_pages JSON,
    user_id INT,
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Event photos table
CREATE TABLE event_photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    photo_url TEXT NOT NULL,
    upload_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    INDEX idx_event_id (event_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Event statistics table
CREATE TABLE event_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_slug VARCHAR(255) UNIQUE NOT NULL,
    views INT DEFAULT 0,
    shares INT DEFAULT 0,
    last_viewed TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_slug) REFERENCES events(slug) ON DELETE CASCADE,
    INDEX idx_event_slug (event_slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Custom pages table
CREATE TABLE custom_pages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    title VARCHAR(255),
    body TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    INDEX idx_event_id (event_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

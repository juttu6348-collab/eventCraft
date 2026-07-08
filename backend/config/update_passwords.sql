USE eventcraft;
UPDATE users SET password_hash = '$2a$10$K9vzon3.2ZyEG6Pz3.9hLeGPEAgLvE3v1rf6s9zoE0VDsRiGsVQtW' WHERE email = 'admin@eventcraft.com';
UPDATE users SET password_hash = '$2a$10$K9vzon3.2ZyEG6Pz3.9hLeGPEAgLvE3v1rf6s9zoE0VDsRiGsVQtW' WHERE email = 'user@test.com';
SELECT email, LEFT(password_hash, 20) as hash_check FROM users WHERE email IN ('admin@eventcraft.com', 'user@test.com');

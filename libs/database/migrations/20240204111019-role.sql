-- Path: libs/database/migrations/20240204111019-role.sql

ALTER TABLE users.accounts ADD COLUMN role VARCHAR(255) NOT NULL DEFAULT 'student';

DROP DATABASE IF EXISTS userauth_app;
CREATE DATABASE userauth_app;

\c userauth_app;

CREATE TABLE IF NOT EXISTS users(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL
);
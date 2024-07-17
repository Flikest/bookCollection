CREATE Table users (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(300) NOT NULL,
    email VARCHAR(300) NOT NULL,
    role BIT VARYING(3) DEFAULT '000',
    confirm_email BOOLEAN DEFAULT FALSE,
    confirmation_link VARCHAR(300) NOT NULL
);
create table book(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(120) NOT NULL,
    author VARCHAR(120) NOT NULL,
    publicationDate DATE NOT NULL,
    genres VARCHAR(300) NOT NULL
);
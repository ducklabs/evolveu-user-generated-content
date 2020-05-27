CREATE TABLE messages(
    "id" serial PRIMARY KEY,
    "messageText" VARCHAR(2048),
    "author" VARCHAR(128),
    "messageDate" VARCHAR(32)
);

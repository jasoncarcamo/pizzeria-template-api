CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    first_name TEXT,
    last_name TEXT,
    address TEXT,
    suite TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    mobile_number TEXT,
    email TEXT,
    password VARCHAR(65535),
    points INTEGER DEFAULT 0,
    member BOOLEAN DEFAULT FALSE,
    date_last_modified TIMESTAMP,
    date_created TIMESTAMP
);
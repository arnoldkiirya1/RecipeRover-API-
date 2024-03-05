create table users(
    id serial primary key, -- Primary Key
    name varchar(30),
    email varchar(50),
    phone varchar(15),
    password text,
    image text,
    level integer, -- 0 Admin, 1 User
    date_created date
);

create table recipes(
    id serial primary key,
    title varchar(30),
    ingredient text,
    owner integer references users(id) on delete cascade,
    image text,
    date_created date
);

create table likes(
    id serial primary key,
    users integer references users(id) on delete cascade,
    recipes integer references recipes(id) on delete cascade,
    date_created date
);

create table saved(
    id serial primary key,
    users integer references users(id) on delete cascade,
    recipes integer references recipes(id) on delete cascade,
    date_created date
);

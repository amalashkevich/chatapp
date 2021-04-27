## Create PostgreSQL user and database

```shell script
createuser --createdb chatapp
createdb chatapp -U chatapp
psql -d chatapp -U chatapp
```

```sql
CREATE TABLE "message" (
  "id" SERIAL PRIMARY KEY,
  "created_dt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "author" TEXT NOT NULL,
  "message" TEXT NOT NULL
);

INSERT INTO message (author, message) VALUES  ('John', 'Test message 1');
INSERT INTO message (author, message) VALUES  ('Kate', 'Test message 2');
INSERT INTO message (author, message) VALUES  ('Paul', 'Test message 3');
```


## Start backend

```shell script
cd backend
yarn
yarn run dev
```


## Start frontend

```shell script
cd frontend
yarn
yarn start
```
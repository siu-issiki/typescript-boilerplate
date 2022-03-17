# how to use this boilerplate

## server up

```
$ make
$ make up
```

ping `http://localhost:3000/api/ping`

## test

```
$ make test
```

### testing with hot reload

```
$ make watch_test
```

## DB migration

after edit `prisma/schema.prisma`

```
$ make migration_create
```

and type migration name

```
$ make migration_up
$ yarn schema:generate
```

for apply migration

# 実装

- [x] User 作成 / ログイン
  - `src/services/user_service.ts`, `src/api/users.ts`
- [x] 認証
  - `src/services/user_service.ts`, `src/middlewares/authenticate.ts`
- [ ] Post 作成
- [ ] Post 読み出し

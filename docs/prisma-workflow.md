# Prisma & Database Workflow Guide

This guide will help you avoid common migration and schema issues when working with Prisma and your database.

---

## 1. Never Edit or Delete Applied Migrations in Production


- Only edit or delete migration files in development, and only if you're sure no one else has applied them.
- In a team or production environment, always create new migrations for changes.


## 2. Use Feature Branches for Schema Changes

- Make schema changes in a feature branch.
- Merge to main only after you've tested the migrations and the app together.



## 3. Always Run Migrations After Switching Branches

- If you switch to a branch with a different schema, run:

  ```sh
  npx prisma migrate reset
  ```

  (in dev, this is safe—just remember it wipes your data!)


## 4. Keep Your Schema and Code in Sync


- After any schema change, always run:
  ```sh
  npx prisma generate

  ```
- Restart your dev server to pick up the new client.


## 5. Use Seed Scripts for Test Data

- Add a `prisma/seed.ts` (or `.js`) to quickly repopulate your dev DB after a reset.

## 6. If You Get Stuck:


- Check your migration history: `prisma/migrations/`
- Check your current schema: `prisma/schema.prisma`
- Use `npx prisma studio` to inspect your DB.
- If all else fails, reset: `npx prisma migrate reset`

## 7. For Production:


- Never use `migrate reset` in production! Use `npx prisma migrate deploy`.
- Always back up your production database before running new migrations.

---

## Useful Commands


- See migration status: `npx prisma migrate status`
- Open Prisma Studio: `npx prisma studio`
- Generate client: `npx prisma generate`
- Reset DB (dev only!): `npx prisma migrate reset`

---

**Happy coding!**

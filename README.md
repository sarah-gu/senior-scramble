# Senior Scramble

## Required Dependencies
- Google OAuth account 
- Prisma DB connection
- NextJS / Vercel deployment
- Amazon S3 blob storage (for PFPs) 
- Next Auth 

These variables are referenced as process.env.[var] and you should put the env variables in a file called .env in the root directory. if .env isnt getting picked up, try .env.development.local


## Running the app
Next.js 15 with their new app routing is used to set up this app https://nextjs.org/docs/app/getting-started/layouts-and-pages
make sure to run `bun run install && bun run build` 
https://bun.sh/ can use bun run start to start the app. Homepage is page.tsx under /app. 
 

# Install dependencies only when needed
FROM node:20.10.0 as deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:20.10.0 as builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npx prisma generate

RUN yarn build

# Production image, copy all the files and run next
FROM node:20.10.0 AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/media ./media
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env.production ./

ENV PORT 8000

CMD ["node", "./dist/index.js"]
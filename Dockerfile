FROM node:18 AS builder

WORKDIR /app

COPY . .

RUN npm ci

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npx prisma generate
RUN npm run build

FROM node:18 AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/.next /app

USER 10014
EXPOSE 3000

ENV HOSTNAME 0.0.0.0
ENV PORT 3000

CMD ["npm", "start"]
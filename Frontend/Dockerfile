FROM node:19 AS build
WORKDIR /app
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
RUN pnpm prune --prod
FROM nginx:1.23.2-alpine as serve
COPY --from=build /app/build usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
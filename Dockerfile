FROM node:16-alpine as build
WORKDIR /build
COPY . .
RUN npm install
RUN npm run build

FROM node:16-alpine
ENV NODE_ENV production
WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/ormconfig.js ./
COPY --from=build /build/dist ./dist
EXPOSE 3006
ENTRYPOINT [ "npm", "run", "start:prod" ]
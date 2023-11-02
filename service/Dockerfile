###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:gallium-alpine As development

WORKDIR /app

COPY --chown=node:node package*.json ./
COPY --chown=node:node prisma ./

RUN npm install --force

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:gallium-alpine As build

WORKDIR /app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm install -g nest --force

RUN npm run build

RUN npm install --force --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:gallium-alpine As production

COPY --chown=node:node --from=build /app/package.json ./package.json
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/.env .
COPY --chown=node:node --from=build /app/prisma ./prisma

CMD [ "npm", "run", "start:prod" ]
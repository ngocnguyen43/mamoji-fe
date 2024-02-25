FROM node:20-alpine3.18 AS builder

WORKDIR /app

COPY . .

RUN npm ci &&  npm run build

FROM node:20-alpine3.18 

WORKDIR /app

ARG DOPPLER_TOKEN

ENV DOPPLER_TOKEN ${DOPPLER_TOKEN}


RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add doppler

RUN doppler secrets download doppler.encrypted.json

COPY --from=builder /app/package*.json /app
COPY --from=builder /app/build /app/build
COPY --from=builder /app/node_modules /app/node_modules
# COPY --from=builder /app/build /usr/share/nginx/html

# RUN rm /etc/nginx/conf.d/default.conf

# COPY deploy/nginx/nginx.conf /etc/nginx/conf.d

# EXPOSE 5173

ENTRYPOINT ["doppler", "run", "--fallback=doppler.encrypted.json", "--"]

CMD ["node",  "./build/index.js" ]

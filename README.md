
## Requirements

**NodeJS:** 16++

## Install
- For ``Linux Server`` install no-gui systems ( ignore if Windows )
```bash
sudo apt install -y gconf-service libgbm-dev libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```
- Clone the project

```bash
  git clone https://git.bintangtechnology.com/microservices/whatsapp-gateway.git
```

- Run npm install & update
```bash
  npm install
```
```bash
  npm update
```

## Environment Variables
```
PORT=3000
SERVER_OS=LINUX # WINDOWS OR LINUX default is LINUX
HEADLESS=true # default true
ACCESS_TOKEN=
```

## Generate ``ACCESS_TOKEN``
```bash
npm run token-generate
```

## Running local
- With npm

```bash
  npm run start
```
- with node
```bash
  node index.js
```

## Running with pm2
To run with pm2, first install pm2 globally

```bash
  npm install pm2@latest -g
```
running scripts
```bash
  npm run pm2-start
```
```bash
  npm run pm2-stop
```
```bash
  npm run pm2-delete
```
```bash
  npm run pm2-restart
```
```bash
  npm run pm2-reload
```

## API Reference
- Headers
| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `ACCESS_TOKEN` | `string` | **Required**. Your ACCESS_TOKEN |

#### Get status
```http
  POST /api/status
```
- response
| response | type     | description |
| :-------- | :------- | :------- |
| `message`      | `string` | message |
| `state`      | `string` | `READY` or `NOT_READY`  |
| `is_initialize`      | `boolean` | `true` when puppeter is already launched |
| `is_auth`      | `boolean` | `true` when whatsapp is linked |
| `is_loading`      | `boolean` | `true` when puppeter is opening web whatsapp |
| `is_ready`      | `boolean` | `true` when app is ready to send message |
| `qr_code`      | `string` | `null` when client is already login  |
| `client_info`      | `Object` | `null` when client is not ready |

#### Initialize puppetter if needed
```http
  POST /api/initialize
```
- response
| response | type     | description |
| :-------- | :------- | :------- |
| `message`      | `string` | message |

#### Logout client
```http
  POST /api/logout
```
- response
| response | type     | description |
| :-------- | :------- | :------- |
| `message`      | `string` | message |

#### Restart client
```http
  POST /api/restart
```
- response
| response | type     | description |
| :-------- | :------- | :------- |
| `message`      | `string` | message |

#### Send Message
```http
  POST /api/send-message
```
- body
| body | type     | example |
| :-------- | :------- | :------- |
| `to`      | `number` | `621234567890` must include country code  |
| `message` | `string` | `any` |

- response
| response | type     | description |
| :-------- | :------- | :------- |
| `message`      | `string` | message |
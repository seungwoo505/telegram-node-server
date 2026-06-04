# 텔레그램 Node 서버

텔레그램 봇을 위한 Node.js 서버입니다. [Telegraf](https://telegraf.js.org/) 라이브러리를 사용합니다.

## 시작하기

### 1. 봇 토큰 발급

1. 텔레그램에서 [@BotFather](https://t.me/BotFather) 검색 후 대화 시작
2. `/newbot` 입력 후 봇 이름·사용자명 설정
3. 발급된 **토큰**을 복사

### 2. 설치 및 실행

```bash
cd telegram-node-server
npm install
cp .env.example .env
# .env 파일을 열어 BOT_TOKEN, CHANNEL_ID를 설정
npm start
```

개발 시 자동 재시작:

```bash
npm run dev
```

### 3. 환경변수

| 변수 | 설명 |
|------|------|
| `BOT_TOKEN` | BotFather에서 발급받은 봇 토큰 |
| `CHANNEL_ID` | 메시지를 보낼 텔레그램 채널 ID |
| `CHANNEL_NAME` | 응답과 테스트 메시지에 표시할 채널 이름 (선택) |
| `PORT` | API 서버 포트 (기본값: `3000`) |

### 4. API

헬스 체크:

```bash
curl http://127.0.0.1:3000/health
```

테스트 메시지 전송:

```bash
curl -X POST http://127.0.0.1:3000/channel/test
```

메시지 전송:

```bash
curl -X POST http://127.0.0.1:3000/channel/send \
  -H "Content-Type: application/json" \
  -d '{"message":"보낼 내용"}'
```

## 프로젝트 구조

```
telegram-node-server/
├── src/
│   └── index.js   # API 서버 진입점
├── .env.example   # 환경변수 예시
├── package.json
└── README.md
```

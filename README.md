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
# .env 파일을 열어 BOT_TOKEN= 발급받은_토큰 으로 수정
npm start
```

개발 시 자동 재시작:

```bash
npm run dev
```

### 3. 기본 명령어

| 명령어 | 설명 |
|--------|------|
| `/start` | 봇 시작 인사 |
| `/help` | 도움말 |
| `/ping` | 연결 확인 (pong 응답) |
| `/echo [메시지]` | 입력한 메시지 그대로 반환 |

## 프로젝트 구조

```
telegram-node-server/
├── src/
│   └── index.js   # 봇 진입점 및 명령 핸들러
├── .env.example   # 환경변수 예시
├── package.json
└── README.md
```

## 확장하기

- `src/index.js`에 `bot.command('명령어', ...)` 또는 `bot.on('text', ...)` 추가
- 웹훅 모드가 필요하면 [Telegraf 웹훅 문서](https://telegraf.js.org/#/?id=webhook) 참고

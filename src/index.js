require('dotenv').config();
const express = require('express');
const { Telegraf } = require('telegraf');

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID || process.env.CHANNEL_ID_1;
const CHANNEL_NAME = process.env.CHANNEL_NAME || '채널';
const PORT = process.env.PORT || 3000;

if (!BOT_TOKEN) {
  console.error('.env에 BOT_TOKEN을 설정해주세요.');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);
const app = express();

app.use(express.json());

// GET / - 헬스 체크
app.get('/', (req, res) => {
  res.json({ ok: true, message: '텔레그램 봇 API 서버' });
});

// GET /health
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// POST /channel/test - 채널에 테스트 메시지 전송
app.post('/channel/test', async (req, res) => {
  if (!CHANNEL_ID) return res.status(400).json({ ok: false, error: 'CHANNEL_ID 미설정' });

  try {
    await bot.telegram.sendMessage(
      CHANNEL_ID,
      `📢 ${CHANNEL_NAME} 테스트 메시지\n\n봇 연결이 정상입니다. ✅`
    );
    res.json({ ok: true, channel: CHANNEL_NAME });
  } catch (err) {
    res.status(500).json({ ok: false, channel: CHANNEL_NAME, error: err.message });
  }
});

// POST /channel/send - 채널에 메시지 전송
// body: { "message": "보낼 내용" }
app.post('/channel/send', async (req, res) => {
  if (!CHANNEL_ID) return res.status(400).json({ ok: false, error: 'CHANNEL_ID 미설정' });

  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ ok: false, error: 'message (문자열) 필수' });
  }

  try {
    await bot.telegram.sendMessage(CHANNEL_ID, message);
    res.json({ ok: true, channel: CHANNEL_NAME });
  } catch (err) {
    res.status(500).json({ ok: false, channel: CHANNEL_NAME, error: err.message });
  }
});

// 404
app.use((req, res) => {
  res.status(404).json({ ok: false, error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`✅ API 서버 실행 중 ${PORT}`);
});

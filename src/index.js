require('dotenv').config();
const express = require('express');
const { Telegraf } = require('telegraf');

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID_1 = process.env.CHANNEL_ID_1;
const CHANNEL_ID_2 = process.env.CHANNEL_ID_2;
const PORT = process.env.PORT || 3000;

if (!BOT_TOKEN) {
  console.error('.env에 BOT_TOKEN을 설정해주세요.');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);
const app = express();

app.use(express.json());

const channels = {
  1: { id: CHANNEL_ID_1, name: '채널 1' },
  2: { id: CHANNEL_ID_2, name: '채널 2' },
};

function getChannel(num) {
  const n = Number(num);
  if (n !== 1 && n !== 2) return null;
  return channels[n];
}

// GET / - 헬스 체크
app.get('/', (req, res) => {
  res.json({ ok: true, message: '텔레그램 봇 API 서버' });
});

// GET /health
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// POST /channels/1/test - 채널 1에 테스트 메시지 전송
// POST /channels/2/test - 채널 2에 테스트 메시지 전송
app.post('/channels/:channel/test', async (req, res) => {
  const ch = getChannel(req.params.channel);
  if (!ch) return res.status(404).json({ ok: false, error: '채널을 찾을 수 없습니다. (1 또는 2)' });
  if (!ch.id) return res.status(400).json({ ok: false, error: 'CHANNEL_ID 미설정' });

  try {
    await bot.telegram.sendMessage(
      ch.id,
      `📢 ${ch.name} 테스트 메시지\n\n봇 연결이 정상입니다. ✅`
    );
    res.json({ ok: true, channel: ch.name });
  } catch (err) {
    res.status(500).json({ ok: false, channel: ch.name, error: err.message });
  }
});

// POST /channels/1/send - 채널 1에 메시지 전송
// POST /channels/2/send - 채널 2에 메시지 전송
// body: { "message": "보낼 내용" }
app.post('/channels/:channel/send', async (req, res) => {
  const ch = getChannel(req.params.channel);
  if (!ch) return res.status(404).json({ ok: false, error: '채널을 찾을 수 없습니다. (1 또는 2)' });
  if (!ch.id) return res.status(400).json({ ok: false, error: 'CHANNEL_ID 미설정' });

  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ ok: false, error: 'message (문자열) 필수' });
  }

  try {
    await bot.telegram.sendMessage(ch.id, message);
    res.json({ ok: true, channel: ch.name });
  } catch (err) {
    res.status(500).json({ ok: false, channel: ch.name, error: err.message });
  }
});

// 404
app.use((req, res) => {
  res.status(404).json({ ok: false, error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`✅ API 서버 실행 중 http://127.0.0.1:${PORT}`);
});

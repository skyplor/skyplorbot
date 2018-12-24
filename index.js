import Telegraf from 'telegraf';
import express from 'express';
import Extra from 'telegraf/extra';
import Markup from 'telegraf/markup';

const app = express();
const bot = new Telegraf(process.env.TELEGRAM_BOT_API);
bot.telegram.getMe().then(botInfo => {
  bot.options.username = botInfo.username;
});
bot.start(ctx => ctx.reply('Welcome!'));
bot.help(ctx => ctx.reply('Send me a sticker'));
bot.on('sticker', ctx => ctx.reply('👍'));
bot.hears('hi', ctx => ctx.reply('Hey there'));
bot.command('hello', ctx => ctx.reply('Hello ' + ctx.message.from.first_name));
bot.command('custom', ({ reply }) => {
  return reply(
    'Custom buttons keyboard',
    Markup.keyboard([
      ['🔍 Search', '😎 Popular'], // Row1 with 2 buttons
      ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
      ['📢 Ads', '⭐️ Rate us', '👥 Share'] // Row3 with 3 buttons
    ])
      .oneTime()
      .resize()
      .extra()
  );
});
bot.hears('🔍 Search', ctx => ctx.reply('Yay!'));
bot.hears('📢 Ads', ctx => ctx.reply('Free hugs. Call now!'));
bot.command('random', ctx => {
  return ctx.reply(
    'random example',
    Markup.inlineKeyboard([
      Markup.callbackButton('Coke', 'Coke'),
      Markup.callbackButton('Dr Pepper', 'Dr Pepper', Math.random() > 0.5),
      Markup.callbackButton('Pepsi', 'Pepsi')
    ]).extra()
  );
});
app.get('/', (req, res) => res.send('Hello World!'));
app.use(bot.webhookCallback('/new-message'));
app.listen(3000, () => {
  console.log('Telegram bot listening on port 3000!');
});

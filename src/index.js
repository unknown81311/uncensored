const { Client, GatewayIntentBits, Events, WebhookClient } = require('discord.js');
const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
] });


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

 const webhook = new WebhookClient({url: process.env['webhookKey']});

client.on('messageCreate', async (message) => {
  if(message.webhookId)return;
  message.delete().catch(console.error);

  let webhook = await message.channel.fetchWebhooks().then((webhooks) => webhooks.first());

  let author = message.author;

  const attachments = message.attachments;

  const files = attachments.map((attachment) => ({
    name: attachment.name,
    attachment: attachment.url
  }));

  let username = author.username;
  let avatarURL = `https://cdn.discordapp.com/avatars/${author.id}/${author.avatar}.webp?size=32`;

  let anonymous = String(message.member.nickname).toLowerCase().indexOf("anon")==-1;

  webhook.send({
    content:message.cleanContent,
    username:anonymous && username || undefined,
    avatarURL:anonymous && avatarURL || undefined,
    files: files
  });
});

client.login(process.env['token']);

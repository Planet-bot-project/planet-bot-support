const http = require('http');
http.createServer(function(req, res) {
  res.write("index.js is active.\nPleace check it.");
  res.end();
}).listen(8080);

// Discord bot implements
const Discord = require("discord.js");
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
const prefix = 'spu!';
const token = process.env.TOKEN;

// botが準備できれば発動され、 上から順に処理される。
client.on("ready", () => {
  // コンソールにReady!!と表示
  console.log("Ready!!");

  // ステータスを設定する
  setInterval(() => {
    client.user.setActivity({
      name: `Planet-bot server support`
    })
  }, 10000)
  client.channels.cache.get("889486664760721418").send("起動しました！");

  // readyイベントここまで
});

// botがメッセージを受信すると発動され、 上から順に処理される。
client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'help') {
    message.channel.send({
      embeds: [{
        title: "HELP",
        description: "ないよう",
        color: 0x227fff,
        timestamp: new Date(),
        thumbnail: {
          url: 'attachment://logo.png'
        },
        footer: {
          text: 'This bot is made by Hoshimikan6490',
          icon_url: 'attachment://me.png',
        },
      }
      ],
      files: [
        {
          attachment: "images/logo.png",
          name: "logo.png"
        }, {
          attachment: "images/me.png",
          name: "me.png"
        }
      ]
    })
  } else if (command === 'member_role') {
    if (message.author.id == '728495196303523900') {
      if (message.guild.id === '889474199704436776') {
        const tic1 = new Discord.MessageButton()
          .setCustomId("join")
          .setStyle("SUCCESS")
          .setLabel("参加する");
        message.channel.send({
          embeds: [
            {
              title: '📖利用規約📖',
              description: '①__**すべての人に敬意をもって接しましょう**__。ハラスメントや糾弾、セクシズム（性差別）、レイシズム（人種差別）、ヘイトスピーチは一切認められていません。\n②__**スパム行為や、宣伝行為（サーバーへの招待、広告掲載など）は禁止**__です。他のメンバーへのDM送信による場合も含みます。\n③__**閲覧注意（NSFW）コンテンツやわいせつなコンテンツは禁止**__されています。これには裸体・性行為・ハードな暴力シーンなどを描いた文章・画像・リンク、そのほか見た人を不快にさせる露骨なコンテンツが含まれます。\n④スタッフは、__ユーザーの個人間の問題に一切関与しません__。該当の当事者間での対応をお願いします。\nルール違反行為や、安全を脅かされるように感じる場面を見かけたら、スタッフにご報告ください。',
              color: 0x498205,
              thumbnail: {
                url: 'attachment://logo.png',
              },
              footer: {
                text: '↓このボタンをおして、参加しましょう！↓',
                icon_url: 'attachment://me.png',
              },
            },
          ],
          files: [
            {
              attachment: 'images/logo.png',
              name: 'logo.png',
            },
            {
              attachment: 'images/me.png',
              name: 'me.png',
            },
          ],
          components: [new Discord.MessageActionRow().addComponents(tic1)]
        });
      } else {
        message.channel.send({
          embeds: [
            {
              title: '🚫エラー！！',
              description: 'ここはサポートサーバーではありません。恥ずかしいと思うので、スポイラーにしておきましたｗ',
              color: 0xFF0000,
            }
          ],
          ephemeral: true
        })
      }
    } else {
      message.channel.send({
        embeds: [
          {
            title: '🚫エラー！！',
            description: '権限が不足しています。このコマンドはBOTAdmin限定機能です。',
            color: 0xFF0000,
          }
        ],
        ephemeral: true
      })
    }
  } else if (command === 'role_panel') {
    if (message.author.id == '728495196303523900') {
      if (message.guild.id === '889474199704436776') {
        const tic2 = new Discord.MessageButton()
          .setCustomId("role1")
          .setStyle("PRIMARY")
          .setLabel("📢アナウンスロール");
        message.channel.send({
          embeds: [
            {
              title: '⚒ロール設定⚒',
              description: '<@&951364197600591882>：ちょっとだけ重要なアナウンス時にメンションを受け取れます。\n\n　__**※外したい場合は、もう１度ボタンを押してください**__',
              color: 0x498205,
              thumbnail: {
                url: 'attachment://logo.png',
              },
            },
          ],
          files: [
            {
              attachment: 'images/logo.png',
              name: 'logo.png',
            }
          ],
          components: [new Discord.MessageActionRow().addComponents(tic2)]
        });
      } else {
        message.channel.send({
          embeds: [
            {
              title: '🚫エラー！！',
              description: 'ここはサポートサーバーではありません。恥ずかしいと思うので、スポイラーにしておきましたｗ',
              color: 0xFF0000,
            }
          ],
          ephemeral: true
        })
      }
    } else {
      message.channel.send({
        embeds: [
          {
            title: '🚫エラー！！',
            description: '権限が不足しています。このコマンドはBOTAdmin限定機能です。',
            color: 0xFF0000,
          }
        ],
        ephemeral: true
      })
    }
  }
})

client.on("interactionCreate", async (interaction) => {
  if (interaction.customId === "join") {
    if (interaction.member.roles.cache.has('889474498699595826')) {
      await interaction.reply({
        content: 'あなたは既に参加済みです',
        ephemeral: true
      });
    } else {
      interaction.member.roles.add('889474498699595826')
      await interaction.reply({
        content: '参加手続きが完了しました。',
        ephemeral: true
      });
      await client.channels.cache.get('889756065531564052').send({
        embeds: [
          {
            title: "📥認証ログ",
            description: `<@${interaction.user.id}> の参加手続きが完了しました。`,
            color: 0x33FF33,
            timestamp: new Date()
          }
        ]
      });
      return;
    }
  } else if (interaction.customId === 'role1') {
    if (interaction.member.roles.cache.has('951364197600591882')) {
      interaction.member.roles.remove('951364197600591882')
      await interaction.reply({
        content: 'ロールを剝奪しました',
        ephemeral: true
      });
    } else {
      interaction.member.roles.add('951364197600591882')
      await interaction.reply({
        content: 'ロールを付与しました',
        ephemeral: true
      });
    }
    return;
  }
})

// botログイン
client.login(token);

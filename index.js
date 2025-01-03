const http = require("http");
http
  .createServer(function (req, res) {
    res.write("index.js is active.\nPleace check it.");
    res.end();
  })
  .listen(8080);

// Discord bot implements
const {
  Client,
  GatewayIntentBits,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  MessageFlags,
} = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});
require("dotenv").config();

const prefix = "spu!";
const token = process.env.token;

// botが準備できれば発動され、 上から順に処理される。
client.on("ready", () => {
  // コンソールにReady!!と表示
  console.log("Ready!!");

  // ステータスを設定する
  setInterval(() => {
    client.user.setActivity({
      name: `Planet-bot server support`,
    });
  }, 10000);
  client.channels.cache.get("889486664760721418").send("起動しました！");

  // readyイベントここまで
});

// botがメッセージを受信すると発動され、 上から順に処理される。
client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();

  if (command === "help") {
    message.channel.send({
      embeds: [
        {
          title: "HELP",
          description: "ないよう",
          color: 0x227fff,
          timestamp: new Date(),
          thumbnail: {
            url: "attachment://logo.png",
          },
          footer: {
            text: "This bot is made by Hoshimikan6490",
            icon_url: "attachment://me.png",
          },
        },
      ],
      files: [
        {
          attachment: "images/logo.png",
          name: "logo.png",
        },
        {
          attachment: "images/me.png",
          name: "me.png",
        },
      ],
    });
  } else if (command === "member_role") {
    if (
      message.author.id == "728495196303523900" ||
      message.author.id == "839803902026579968"
    ) {
      if (message.guild.id === "889474199704436776") {
        message.delete();
        const member_role = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("join")
            .setLabel("参加する")
            .setStyle(ButtonStyle.Success)
            .setEmoji("📝")
        );
        message.channel.send({
          embeds: [
            {
              title: "📖利用規約📖",
              description:
                "①__**すべての人に敬意をもって接しましょう**__。ハラスメントや糾弾、セクシズム（性差別）、レイシズム（人種差別）、ヘイトスピーチは一切認められていません。\n②__**スパム行為や、宣伝行為（サーバーへの招待、広告掲載など）は禁止**__です。他のメンバーへのDM送信による場合も含みます。\n③__**閲覧注意（NSFW）コンテンツやわいせつなコンテンツは禁止**__されています。これには裸体・性行為・ハードな暴力シーンなどを描いた文章・画像・リンク、そのほか見た人を不快にさせる露骨なコンテンツが含まれます。\n④スタッフは、__ユーザーの個人間の問題に一切関与しません__。該当の当事者間での対応をお願いします。\nルール違反行為や、安全を脅かされるように感じる場面を見かけたら、スタッフにご報告ください。",
              color: 0x498205,
              thumbnail: {
                url: "attachment://logo.png",
              },
              footer: {
                text: "↓このボタンをおして、参加しましょう！↓",
                icon_url: "attachment://me.png",
              },
            },
          ],
          files: [
            {
              attachment: "images/logo.png",
              name: "logo.png",
            },
            {
              attachment: "images/me.png",
              name: "me.png",
            },
          ],
          components: [member_role],
        });
      } else {
        message.channel.send({
          embeds: [
            {
              title: "🚫エラー！！",
              description:
                "ここはサポートサーバーではありません。恥ずかしいと思うので、スポイラーにしておきましたｗ",
              color: 0xff0000,
            },
          ],
          flags: MessageFlags.Ephemeral,
        });
      }
    } else {
      message.channel.send({
        embeds: [
          {
            title: "🚫エラー！！",
            description:
              "権限が不足しています。このコマンドはBOTAdmin限定機能です。",
            color: 0xff0000,
          },
        ],
        flags: MessageFlags.Ephemeral,
      });
    }
  } else if (command === "role_panel") {
    if (
      message.author.id == "728495196303523900" ||
      message.author.id == "839803902026579968"
    ) {
      if (message.guild.id === "889474199704436776") {
        message.delete();
        const announce_role = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("role1")
            .setLabel("アナウンスロール")
            .setStyle(ButtonStyle.Primary)
            .setEmoji("📢")
        );
        message.channel.send({
          embeds: [
            {
              title: "⚒ロール設定⚒",
              description:
                "<@&951364197600591882>：ちょっとだけ重要なアナウンス時にメンションを受け取れます。\n\n　__**※外したい場合は、もう１度ボタンを押してください**__",
              color: 0x498205,
              thumbnail: {
                url: "attachment://logo.png",
              },
            },
          ],
          files: [
            {
              attachment: "images/logo.png",
              name: "logo.png",
            },
          ],
          components: [announce_role],
        });
      } else {
        message.channel.send({
          embeds: [
            {
              title: "🚫エラー！！",
              description:
                "ここはサポートサーバーではありません。恥ずかしいと思うので、スポイラーにしておきましたｗ",
              color: 0xff0000,
            },
          ],
          flags: MessageFlags.Ephemeral,
        });
      }
    } else {
      message.channel.send({
        embeds: [
          {
            title: "🚫エラー！！",
            description:
              "権限が不足しています。このコマンドはBOTAdmin限定機能です。",
            color: 0xff0000,
          },
        ],
        flags: MessageFlags.Ephemeral,
      });
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.customId === "join") {
    if (interaction.member.roles.cache.has("889474498699595826")) {
      await interaction.reply({
        content: "あなたは既に参加済みです",
        flags: MessageFlags.Ephemeral,
      });
    } else {
      interaction.member.roles.add("889474498699595826");
      await interaction.reply({
        content: "参加手続きが完了しました。",
        flags: MessageFlags.Ephemeral,
      });
      await client.channels.cache.get("889756065531564052").send({
        embeds: [
          {
            title: "📥認証ログ",
            description: `<@${interaction.user.id}> の参加手続きが完了しました。`,
            color: 0x33ff33,
            timestamp: new Date(),
          },
        ],
      });
      return;
    }
  } else if (interaction.customId === "role1") {
    if (interaction.member.roles.cache.has("951364197600591882")) {
      interaction.member.roles.remove("951364197600591882");
      await interaction.reply({
        content: "<@" + interaction.user.id + ">からロールを剝奪しました",
        flags: MessageFlags.Ephemeral,
      });
    } else {
      interaction.member.roles.add("951364197600591882");
      await interaction.reply({
        content: "<@" + interaction.user.id + ">にロールを付与しました",
        flags: MessageFlags.Ephemeral,
      });
    }
    return;
  }
});

// botログイン
client.login(token);

// -----------------
// Global variables
// -----------------

// Codebeat:disable[LOC,ABC,BLOCK_NESTING,ARITY]
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-disable consistent-return */
const db = require("../../core/db");

// -------------
// Command Code
// -------------

module.exports = async function run (guild, config)
{

   // Try system channel
   let defaultChannel = "";
   Override: if (guild.systemChannel)
   {

      if (guild.systemChannel.permissionsFor(guild.me).has("SEND_MESSAGES"))
      {

         defaultChannel = guild.systemChannel;
         break Override;

      }

   }
   // If not able to use system channel find another
   if (defaultChannel === "")
   {

      defaultChannel = guild.channels.cache.find((channel) => channel.type === "text" && channel.permissionsFor(guild.me).has("SEND_MESSAGES"));

   }

   db.updateServerTable(
      guild.id,
      "servername",
      guild.name,
      function error (err)
      {

         if (err)
         {

            return console.log(`DEBUG: Unable to save guild name to DB on Server Join`);

         }

      }
   );

   const owner = await guild.members.fetch(guild.ownerID);

   if (owner)
   {

      db.updateServerTable(
         guild.id,
         "owner",
         `${owner.user.username}#${owner.user.discriminator}`,
         function error (err)
         {

            if (err)
            {

               return console.log(`DEBUG: Unable to save owner details to DB on Server Join`);

            }

         }
      );

   }


   /*
   // Invite settings
   const invite = await defaultChannel.createInvite({
      "maxAge": 0,
      "reason": "Remote Support",
      "temporary": true,
      "unique": false
   },).
      catch(console.log);

   // Save invite to DB
   db.updateServerTable(
      guild.id,
      "invite",
      invite.url,
      function error (err)
      {

         if (err)
         {

            return console.log(`DEBUG: Unable to save link to DB on Server Join`);

         }

      }
   );
   */

   return defaultChannel.send(`Hello, I'm BOW. Thanks for inviting me.`, {"embed": {
      "color": 9514728,
      "description": "We developed BOW to be the best free Translator Bot on Discord (& soon Guilded).\nSpeaking to other people should not have to cost you an arm and a leg, Our aim is to break that language barrier without you having to pay out for the privilege.",
      "fields": [
         {
            "name": ":tada: Getting Started",
            "value": `To get started try running the help command, **!tr help** or take a look at our Quick Setup guide **!tr newbot**`
         },
         {
            "name": ":tools: Support ",
            "value": "If you need some support why not drop by our [Support Server](https://discord.gg/SAbtGN9dFb) and we will be more than willing to lend a hand."
         },
         {
            "name": ":lock: Permissions",
            "value": `BOW has many functions, These all need different permissions to work. To check that BOW has all the permissions she needs to functions correctly please use the **!tr checkperms bot** command.`
         },
         {
            "name": ":moneybag: On a side note.",
            "value": `While BOW Translator is free, and we always aim to keep it this way, She does have costs.\nCurrently the Dev Team pays these cost. If you would like to support us and enable us to continue to provide BOW for free then please contact @ARROW#0229, or type **${config.translateCmdShort} donate** for more info`
         }
      ],

      "footer": {
         "text": "BOW is developed by ARROW"
      },
      "title": "A MESSAGE FROM THE DEV TEAM"
   }});

};

module.exports.newBot = function newBot (data)
{

   data.message.channel.send({"embed": {
      "color": 9514728,
      "description": "Let's get started:\nBOW supports a few different methods of translations.\n**‏‏‎ ‎‎‎‎‎‎**",
      "fields": [
         {
            "name": ":flag_white: Translate by Reacting",
            "value": `React to a message with a flag and it will translate to that language.\n**‏‏‎ ‎‎‎‎‎‎**`
         },
         {
            "name": ":abc: Translate Custom Text",
            "value": `You can also translates a single custom message.
            *!tr this to [lang]:* message here\n**‏‏‎ ‎‎‎‎‎‎**`
         },
         {
            "name": ":hash: Translate Channel (Automatic)",
            "value": `Automatically translates any new messages in channel and forwards them to you.
            Admins/mods can set forwarding to other channels or users in server. 
            Messages in forwarded channels will also be sent back to origin.
            *!tr channel from [lang] to [lang] for [me/@/#]*\n**‏‏‎ ‎‎‎‎‎‎**`
         },
         {
            "name": ":wrench: Customize your Bot, Change your prefix",
            "value": `We know you like to customize thing, so you can change the prefix of your bot.
            *!tr prefix [prefix]*\n**‏‏‎ ‎‎‎‎‎‎**`
         },
         {
            "name": ":grey_question: Help Commands",
            "value": `The following command will help you learn everything you need to know. 
            *!tr help commands*
            *!tr help modules*\n**‏‏‎ ‎‎‎‎‎‎**`
         },
         {
            "name": ":bell: Need Support",
            "value": `Need some extra Support, a little bit stuck. Join our [Support Server](https://discord.gg/hXaedzCQ8d)\n**‏‏‎ ‎‎‎‎‎‎**`
         }
      ],

      "footer": {
         "text": `BOW is developed by ARROW`
      },
      "title": "THANK YOU FOR CHOOSING TO USE BOW."
   }});

};

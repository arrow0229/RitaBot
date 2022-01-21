// -----------------
// Global variables
// -----------------

// Codebeat:disable[LOC,ABC,BLOCK_NESTING,ARITY]
const sendMessage = require("../../core/command.send");

module.exports = function docs (data)
{

   // -----------------------------------
   // Error if settings param is missing
   // -----------------------------------

   if (!data.cmd.params)
   {

      data.color = "info";
      data.text = `**Thank you for choosing BOW Translator! For a full list of commands and usage examples,**\n\n` +
                  `**please review our [documentation (Will work soon)](<>)!!**\n\n`;

      // -------------
      // Send message
      // -------------

      return sendMessage(data);

   }

   // ----------------
   // Execute setting
   // ----------------
   // console.log(`DEBUG: Get Perms`);
   return docs(data);

};

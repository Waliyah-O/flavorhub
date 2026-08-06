import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testConnection() {
  try {
    console.log("Testing OpenAI connection...");

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Say 'Hello from FlavorHub!' if you can hear me.",
        },
      ],
      max_tokens: 50,
    });

    console.log("✅ Success! OpenAI response:");
    console.log(completion.choices[0].message.content);
    console.log("\nModel used:", completion.model);
    console.log("Tokens used:", completion.usage?.total_tokens);
  } catch (error: any) {
    console.error("❌ Error:", error.message);

    if (error.message.includes("API key")) {
      console.log("\n💡 Tips:");
      console.log("1. Check that your API key is correct in .env.local");
      console.log('2. Make sure the key starts with "sk-"');
      console.log("3. Restart your dev server after adding the key");
    } else if (error.message.includes("billing")) {
      console.log("\n💡 Tips:");
      console.log(
        "1. You need to set up billing at https://platform.openai.com/account/billing",
      );
      console.log("2. Add a payment method to your account");
    } else if (error.message.includes("quota")) {
      console.log("\n💡 Tips:");
      console.log("1. You may have exceeded your rate limit");
      console.log("2. Check your usage at https://platform.openai.com/usage");
      console.log("3. Wait a few minutes and try again");
    }
  }
}

testConnection();

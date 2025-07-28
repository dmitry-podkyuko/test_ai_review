const { Configuration, OpenAIApi } = require("openai");
const { execSync } = require("child_process");
const github = require("@actions/github");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const token = process.env.GITHUB_TOKEN;
const octokit = github.getOctokit(token);
const context = github.context;

async function runReview() {
  try {
    const diff = execSync("git diff origin/main").toString();

    const res = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a senior front-end engineer reviewing pull requests in a TypeScript React project. Be concise but helpful.`,
        },
        {
          role: "user",
          content: `Please review the following code diff and point out bugs, smells, and suggestions:
\n${diff}`,
        },
      ],
      temperature: 0.2,
      max_tokens: 800,
    });

    const reviewComment = res.data.choices[0].message.content;
    console.log("\n🤖 AI Review Suggestions:\n");
    console.log(reviewComment);

    await octokit.rest.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.payload.pull_request.number,
      body: `🤖 **AI Code Review:**\n\n${reviewComment}`,
    });

  } catch (error) {
    console.error("Error running AI review:", error.message);
    process.exit(1);
  }
}

runReview();
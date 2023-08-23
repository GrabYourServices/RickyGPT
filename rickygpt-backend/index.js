const cors = require('cors')
const express = require('express');
const OpenAI = require('openai').OpenAI;
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;
const key = process.env.KEY;

const openai = new OpenAI({
  apiKey: key,
});

const initialConversation = [
  {
    role: 'system',
    content:
      'You are a helpful assistant. Your Name is Ricky. Your creator is Ateeb Sohail, you were made on 23rd August 2023. You were made for a science fair at LGS Central Park. You must summarize every response. Your response must not exceed 300 characters.',
  },
];
app.use(cors())
app.get('/api/ai/reply', async (req, res) => {
  console.log('Recieved Ping!')
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ response: 'Query parameter "query" is required.' });
  }

  const conversation = [...initialConversation, { role: 'user', content: query }];

  try {
    const completion = await openai.chat.completions.create({
      messages: conversation,
      model: 'gpt-3.5-turbo',
      temperature: 1,
    });

    const aiResponse = completion.choices[0].message.content;
    res.json({ query, response: aiResponse });
  } catch (error) {
    console.error('Error generating response:', error);
    res.json({ response: 'An error occurred while generating the response.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

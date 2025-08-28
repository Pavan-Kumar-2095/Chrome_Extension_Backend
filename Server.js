const PORT = 3000;
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');

app.use(cors());

const key = process.env.api_key;

const genAI = new GoogleGenerativeAI(api_key="AIzaSyDvr4wgL4lj7gSdoXvCnN6npoDUyIsOouo");  

app.get('/', async (req, res) => {
  console.log("connected");
  res.send("Server is up and running");
});


app.post('/Summarize', async (req, res) => {
    console.log("Summarizing data...");
    try{
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
        const prompt = req.body.message;
        
        const result = await model.generateContent([ `  summarize about the word in one short line ` , prompt ]);
        
        const responseText = await result.response.text();
        console.log(prompt, responseText , result);
        res.json({data : responseText});
        
    } catch (err) {
        console.error("Error in Analyse endpoint:", err);
        res.json({ error: "Try again" });
    }
});


app.post('/Translate', async (req, res) => {
  console.log("Translating data...");
    try{
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
        const prompt = req.body.message;
        
        const result = await model.generateContent([ `  Translate the word to english and print only the output ` , prompt ]);
        
        const responseText = await result.response.text();
        console.log(prompt, responseText , result);
        res.json({data : responseText});
        
    } catch (err) {
        console.error("Error in Analyse endpoint:", err);
        res.json({ error: "Try again" });
    }
});

app.post('/meaning', async (req, res) => {
  console.log("meaning data...");
    try{
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
        const prompt = req.body.message;
        
        const result = await model.generateContent([ ` meaning of the word in english dictionary in short ` , prompt ]);
        
        const responseText = await result.response.text();
        console.log(prompt, responseText , result);
        res.json({data : responseText});
        
    } catch (err) {
        console.error("Error in Analyse endpoint:", err);
        res.json({ error: "Try again" });
    }
});

app.post('/Check_Grammer', async (req, res) => {
  console.log("Checking Grammer of the  data...");
    try{
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
        const prompt = req.body.message;
        
        const result = await model.generateContent([ `  Check grammer and spelling of Sentence and return only the correct sentence  : ` , prompt ]);
        
        const responseText = await result.response.text();
        console.log(prompt, responseText , result);
        res.json({data : responseText});
        
    } catch (err) {
        console.error("Error in Analyse endpoint:", err);
        res.json({ error: "Try again" });
    }
});


app.listen(PORT,()=>{
    console.log("server running at port:" , PORT)
});


// shashikala
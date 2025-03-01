'use server'

import fs from "fs";
import os from "os";

export async function getServerIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]!) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
}


export async function getQuestions() {
    const data = fs.readFileSync("public/questions.json", "utf8");
    const questions = JSON.parse(data);
    return questions.map((q: any) => ({
      id: q.id,
      question: q.question,
      choices: q.choices,
      answer: q.answer
    }));

}

  
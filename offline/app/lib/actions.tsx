'use server'

import fs from "fs";



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

  
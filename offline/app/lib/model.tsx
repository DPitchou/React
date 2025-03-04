export type Question = {
    question: string;
    choices: string[];
    answer: string;
  }


// export class Question{
//     question: string;
//     choices: string[];
//     answer: string;

//     constructor(question: string, choices: string[], answer: string){
//         this.question = question;
//         this.choices = choices;
//         this.answer = answer;
//     }

//     toString():string {
//         return this.question + "\n" + this.choices + "\n" + this.answer;
//     }

//     static fromJson(json: { id: number; question: string; choices: string[]; answer: string }): Question {
//         return new Question(json.question, json.choices, json.answer);
//     }

//     toJson():{question: string; choices: string[]; answer: string }{
//         return {question: this.question, choices: this.choices, answer: this.answer };
//     }

    

// }

export type Player = {
    id?: number;
    pseudo: string;
    score: number;
  }

// export class Player{
//     pseudo: string;
//     score: number;

//     constructor(pseudo: string, score: number){
//         this.pseudo = pseudo;
//         this.score = score;
//         }

//     toString():string {
//         return this.pseudo + "\n" + this.score;
//     }

//     static fromJson(json: {pseudo: string; score: number }): Player {
//         return new Player(json.pseudo, json.score);
//     }

//     toJson():{pseudo: string; score: number }{
//         return {pseudo: this.pseudo, score: this.score };
//     }

// }
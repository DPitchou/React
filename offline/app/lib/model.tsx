
export class Question{
    id: number;
    question: string;
    choices: string[];
    answer: string;

    constructor(id: number, question: string, choices: string[], answer: string){
        this.id = id;
        this.question = question;
        this.choices = choices;
        this.answer = answer;
    }

    toString():string {
        return this.id + ". " + this.question + "\n" + this.choices + "\n" + this.answer;
    }

    static fromJson(json: { id: number; question: string; choices: string[]; answer: string }): Question {
        return new Question(json.id, json.question, json.choices, json.answer);
    }

    

}
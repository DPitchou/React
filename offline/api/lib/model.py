

class Question:
    def __init__(self, question : str, choices : list[str], answer:str):
        self.question : str = question
        self.choices : list[str] = choices
        self.answer : str = answer
    
    def __str__(self):
        return f"{self.question} - {self.choices} - {self.answer}"
    
    def from_json(data: dict):
        return Question(data["question"], data["choices"], data["answer"])
    
    def to_json(self) -> dict:
        return {
            "question": self.question,
            "choices": self.choices,
            "answer": self.answer
        }

class Player:
    def __init__(self, pseudo:str, score:int = 0):
        self.pseudo:str = pseudo
        self.score:int = score
    
    def from_json(data:dict):
        return Player(data["pseudo"], data["score"])
    
    def to_json(self) -> dict:
        return {
            "pseudo": self.pseudo,
            "score": self.score
        }

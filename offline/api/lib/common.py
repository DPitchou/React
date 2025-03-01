import json
from lib.model import Question
import socket

def get_questions() -> list[Question]:
    questions = []
    with open('../public/questions.json') as f:
        for e in json.load(f):
            questions.append(Question.from_json(e))
    return questions
            
    

def players_to_dict(players_dict: dict) -> dict:
    return {player_id: player.to_json() for player_id, player in players_dict.items()}

def get_local_ip() -> str:
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # doesn't even have to be reachable
        s.connect(('10.254.254.254', 1))
        local_ip = s.getsockname()[0]
    except Exception:
        local_ip = '127.0.0.1'
    finally:
        s.close()
    return local_ip
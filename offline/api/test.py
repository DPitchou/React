from lib.common import players_to_dict, get_questions
from lib.model import Player


players = {}

players = {1: Player(1, "toto", 0), 2: Player(2, "tata", 0)}

print(players_to_dict(players))
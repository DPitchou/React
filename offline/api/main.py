import asyncio
import json
from dotenv import load_dotenv
from websockets.asyncio.server import serve
from websockets.exceptions import ConnectionClosed

from lib.common import get_questions, players_to_dict, get_local_ip
from lib.model import Question, Player
import os

players = {}  # Stocke { "id": Player }
questions = get_questions()
question = questions[0]
clients = set()  # Stocke toutes les connexions WebSocket

load_dotenv("../.env")

PORT = int(os.getenv("WS_PORT", 3001))

async def broadcast_players():
    """Envoie la liste des joueurs à tous les clients connectés."""
    if clients:  # Vérifie s'il y a des clients connectés
        data = {
            "action": "updatePlayers",
            "players": players_to_dict(players)
        }
        message = json.dumps(data)
        await asyncio.gather(*(client.send(message) for client in clients))

async def broadcast_question():

    if clients:
        data = {
            "action": "question",
            "question": question,
        }
        message = json.dumps(data)
        await asyncio.gather(*(client.send(message) for client in clients))

async def game_engine(websocket):
    """Gère la connexion WebSocket d'un client."""
    global clients
    clients.add(websocket)
    player_id = None

    try:
        async for message in websocket:
            data = json.loads(message)
            print(f"📩 Reçu: {data}")

            if data["action"] == "test":
                await websocket.send(json.dumps({"action": "test", "message": "Hello World"}))
                print("✅ Test message envoyé")

            elif data["action"] == "join":
                player_id = len(players) + 1
                player = Player.from_json(data["player"])
                players[player_id] = player
                await websocket.send(json.dumps({"id":player_id, "player": player.to_json()}))
                await broadcast_players()  # Met à jour tous les clients
            
            elif data["action"] == "getPlayers":
                await broadcast_players()

            elif data["action"] == "updateScore":
                player_id = data["id"]
                if player_id in players:
                    players[player_id].score += data["score"]
                    await websocket.send(json.dumps({"action": "scoreUpdated"}))
                    # print(f"🎯 Score de {player_id} mis à jour: {players[player_id].score}")
                    await broadcast_players()  # Mise à jour des scores pour tous

            elif data["action"] == "getQuestion":
                question_id = data["id"]
                question = questions.get(question_id)
                if question:
                    await websocket.send(json.dumps({"action": "question", "question": question.to_json()}))
                else:
                    await websocket.send(json.dumps({"action": "error", "message": "Question non trouvée"}))

            elif data["action"] == "ping":
                await websocket.send(json.dumps({"action": "pong"}))  # Répond au ping

    except ConnectionClosed:
        print(f"🔌 Déconnexion de {player_id}")
    finally:
        clients.discard(websocket)
        if player_id and player_id in players:
            del players[player_id]
            await broadcast_players()  # Mise à jour quand un joueur part

async def main():
    ip = get_local_ip()
    async with serve(game_engine, ip, PORT) as server:
        print(f"🚀 Serveur WebSocket démarré sur ws://{ip}:{PORT}")
        await server.serve_forever()  # Garde le serveur actif

try:
    asyncio.run(main())
except KeyboardInterrupt:
    print("🛑 Arrêt du serveur WebSocket")

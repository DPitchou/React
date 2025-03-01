#!/usr/bin/env python

from lib.model import Player

from websockets.sync.client import connect
import json

def hello():
    with connect("ws://192.168.1.13:3001") as websocket:
        # websocket.send(json.dumps({"action": "test"}))
        # message = websocket.recv()
        # print(f"Received: {message}")

        websocket.send(json.dumps({"action": "join", "player": Player("toto", 0).to_json()}))
        message = websocket.recv()
        print(f"Received: {message}")

        # websocket.send(json.dumps({"action": "updateScore", "id": 1, "score": 10}))
        # message = websocket.recv()
        # print(f"Received: {message}")

        # websocket.send(json.dumps({"action": "getQuestion", "id": 0}))
        # message = websocket.recv()
        # print(f"Received: {message}")
        input("Press Enter to continue...")
        

hello()
import asyncio
import websockets # type: ignore
import json

async def test_websocket():
    uri = "ws://localhost:5000/ws" 
    async with websockets.connect(uri) as websocket:
        while True:
            try:
                message = await websocket.recv()
                data = json.loads(message)
                print(f"Received message: {data}")
            except Exception as e:
                print(f"Error receiving message: {e}")
                break

if __name__ == "__main__":
    asyncio.run(test_websocket())

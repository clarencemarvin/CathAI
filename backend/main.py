import logging
import socket
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app import create_app

# Set up logging
logger = logging.getLogger(__name__)
handler = logging.StreamHandler()
formatter = logging.Formatter(
    '%(asctime)s %(name)-12s %(levelname)-8s %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.INFO)

# Initialize FastAPI app
app = create_app()

if __name__ == "__main__":
    logging.info("Starting application ...")
    
    # Bind socket to get an available port
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind(('localhost', 0))  # Bind to an available port
    port = sock.getsockname()[1]
    sock.close()
    
    # Run FastAPI app with uvicorn
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=port, reload=True)
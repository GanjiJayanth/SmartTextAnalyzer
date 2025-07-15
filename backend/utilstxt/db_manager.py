from pymongo import MongoClient
import os
import logging

logger = logging.getLogger(__name__)

# MongoDB connections
try:
    # Grammar tool database
    client = MongoClient(os.getenv('MONGODB_URI', 'mongodb://localhost:27017'))
    db = client['grammar_tool']
    col = db['text_analyses']
    col.create_index("user")
    col.create_index("timestamp")
    
    # User authentication database
    clients = MongoClient('mongodb://localhost:27017/')  
    dbs = clients['flask']
    cols = dbs['flaskers']
    
except Exception as e:
    logger.error(f"Failed to connect to MongoDB: {e}")
    client = None
    db = None
    col = None
    clients = None
    dbs = None
    cols = None
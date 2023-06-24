from firebase_admin import credentials, firestore, initialize_app
from flask import request, jsonify
from db_config import db 
import db_config
from uuid import uuid1

# DB init
cred = credentials.Certificate("key.json")
default_app = initialize_app(cred)
db = firestore.client()
db_config.db = db

# Collection references 
services_ref = db.collection('services')
requests_ref = db.collection('request')

def read_list():
    try:
        services_id = request.args.get('id')
        if services_id:
            q = services_ref.document(services_id).get()
            return jsonify(q.to_dict()), 200
        else:
            l = [doc.to_dict() for doc in services_ref.stream()]
            return jsonify(l), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

def create_request(data):
    
    try:
        id = uuid1()
        requests_ref.document(str(id)).set(data)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"
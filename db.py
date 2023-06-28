from firebase_admin import credentials, firestore, initialize_app
from flask import request, jsonify, make_response
import json
from uuid import uuid1

from db_config import db 
import db_config
from constants import SERVICE_STATE

# DB init
cred = credentials.Certificate("key.json")
default_app = initialize_app(cred)
db = firestore.client()
db_config.db = db

# Collection references 
services_ref = db.collection('services')
requests_ref = db.collection('request')

#####################################################################
#                       Request CRUD

def create_request(data):
    try:
        id = uuid1()
        requests_ref.document(str(id)).set(data)
        return True
    except Exception as e:
        return False

def read_request(id=None):
    try:
        if id:
            request_id = request.args.get(id)
            doc = services_ref.document(request_id).get()
            q = {}
            q['id'] = doc.id
            q['data'] = doc
            return q.to_dict()
        else:
            l = [{'id':doc.id, 'data':doc.to_dict()} for doc in requests_ref.stream()]
            return l
    except Exception as e:
        return {}
    
def update_request(id, state, oic, dates):
    try:
        doc = requests_ref.document(id)
        doc.set({state:state, oic:oic, dates:dates}, merge=True)
        return make_response(jsonify(doc), 200)
    except Exception as e:
        return {}
    
    
#####################################################################
#                       Services CRUD

def read_services():
    try:
        services_id = request.args.get('id')
        if services_id:
            q = services_ref.document(services_id).get()
            return jsonify(q.to_dict()), 200
        else:
            l = [doc.to_dict() for doc in services_ref.stream()]
            return l
    except Exception as e:
        return {}
    
def read_services_value(name):
    try:
        if(not name or name is None): return {'Response', 'name error'}
        query = services_ref.where('name', '==', name).get()
        result = {}

        if len(query) > 0:
            doc = query[0]
            result = doc.to_dict()

        return {'value': result['value']}
        
    except Exception as e:
        return {'Error Ian', e}
from firebase_admin import credentials, firestore, initialize_app
from flask import request, jsonify, make_response
from google.cloud.firestore_v1.base_query import FieldFilter
import json
from uuid import uuid1

import db_config
from db_config import db 
from constants import SERVICE_STATE
from utils import today, db_today

# DB init
cred = credentials.Certificate("key.json")
default_app = initialize_app(cred)
db = firestore.client()
db_config.db = db

# Collection references 
services_ref = db.collection('services')
requests_ref = db.collection('request')
state_ref = db.collection('request_state')
officer_ref = db.collection('officer')

################################################################################
#                               Request CRUD

def create_request(data):
    try:
        gen = uuid1()
        id = db_today() + '-' + str(gen)
        requests_ref.document(id).set(data)
        return True
    except Exception as e:
        return False

def read_request(id=None, state_filter=None, service_filter=None):
    try:
        if id and id != 'null':
            doc = requests_ref.document(id).get()
            print({'id': id})
            return {'id': doc.id, 'data': doc}.to_dict()
        
        else:
            q = requests_ref
            
            if service_filter and service_filter != 'null':
                try:
                    q = q.where('service.name', '==', service_filter)
                except Exception:
                    q = requests_ref

            if state_filter or state_filter == 0:
                try:
                    q = q.where('state', '==', state_filter)
                except Exception:
                    q = requests_ref
                    
            l = [{'id':doc.id, 'data':doc.to_dict()} for doc in q.get()]
            # print({'siya': l})
            return l
    except Exception as e:
        return str({'errror': e})
    
def update_request(id, state, reject=None):
    try:
        doc = requests_ref.document(id)
        data = {
            'state': state+1,
            'dates' : {
                SERVICE_STATE.DATE[state+1]: today()
            }
        }
        doc.set(data, merge=True)
        return str({'response', True})
    except Exception as e:
        return str({'response': {'error': e}})
    
    
################################################################################
#                               Services CRUD

def read_services(id=None):
    try:
        services_id = request.args.get('id')
        q = services_ref
        if services_id:
            q = q.document(services_id).get()
            return jsonify(q.to_dict()), 200
        else:
            q = q.get()
            return [doc.to_dict() for doc in q]
        
    except Exception as e:
        return {'eror': e}
    
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
    

################################################################################
#                                   Utils CRUD

def read_states():
    try:
        l = [doc.to_dict() for doc in state_ref.stream()]
        return l
    except Exception as e:
        return False
    

################################################################################
#                                   Office CRUD

def read_officers():
    try:
        q = [{'name': doc.to_dict()['name'], 
                'role':doc.to_dict()['role'], 
                'super':doc.to_dict()['super']
            } for doc in officer_ref.get()]
        return q
    except Exception as e:
        return []
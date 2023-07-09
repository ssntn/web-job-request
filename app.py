# 3rd Part thigns
from flask import Flask, render_template, redirect, request, session, request, jsonify, url_for

# Ian defined imports
import routes as route
import db_config, db
from utils import today
from constants import SERVICE_STATE


# App config
app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.secret_key = "23456789"
app.config["SESSION_TYPE"] = 'filesystem'



#Routing
@app.route('/')
def index():
    if 'response_create' in session: session.clear()
    return render_template(route.homepage)

@app.route('/clear_session')
def clear_session():
    return redirect(url_for('index'))

@app.route('/form', methods=['GET', 'POST'])
def form():
    if request.method == 'POST':
        return render_template(route.forms)
    

@app.route('/form/a', methods=['POST'])
def form_a():
    if request.method == 'POST':        
        session["name"] = request.form.get("name")
        session["email"] = request.form.get("email")
        session["contact"] = request.form.get("contact")
        session["service"] = request.form.get("service")
        return render_template(route.service_a)
    
@app.route('/form/b', methods=['POST'])
def form_b():
    if request.method == 'POST':        
        session["name"] = request.form.get("name")
        session["email"] = request.form.get("email")
        session["contact"] = request.form.get("contact")
        session["service"] = request.form.get("service")
        return render_template(route.service_b)
    
@app.route('/form/c', methods=['POST'])
def form_c():
    if request.method == 'POST':        
        session["name"] = request.form.get("name")
        session["email"] = request.form.get("email")
        session["contact"] = request.form.get("contact")
        session["service"] = request.form.get("service")
        return render_template(route.service_c)
    
@app.route('/form/d', methods=['POST'])
def form_d():
    #
    if request.method == 'POST':        
        session["name"] = request.form.get("name")
        session["email"] = request.form.get("email")
        session["contact"] = request.form.get("contact")
        session["service"] = request.form.get("service")
        return render_template(route.service_d)
    
@app.route('/form/e', methods=['POST'])
def form_e():
    if request.method == 'POST':        
        session["name"] = request.form.get("name")
        session["email"] = request.form.get("email")
        session["contact"] = request.form.get("contact")
        session["service"] = request.form.get("service")
        return render_template(route.service_e)
    
@app.route('/form/f', methods=['POST'])
def form_f():
    if request.method == 'POST':        
        session["name"] = request.form.get("name")
        session["email"] = request.form.get("email")
        session["contact"] = request.form.get("contact")
        session["service"] = request.form.get("service")
        return render_template(route.service_f)
        
@app.route('/form/g', methods=['POST'])
def form_g():
    if request.method == 'POST':        
        session["name"] = request.form.get("name")
        session["email"] = request.form.get("email")
        session["contact"] = request.form.get("contact")
        session["service"] = request.form.get("service")
        return render_template(route.service_g)



@app.route('/loading', methods=['POST'])
def loading():
    if request.method == 'POST':
        if('name' in session):
            data = {
                'user': {
                    "name": session["name"],
                    "email": session["email"],
                    "contact": session["contact"]
                },
                'dates': {
                    'requested': today(),
                    'accepted': None,
                    'completed': None
                },
                'service': {
                    'name': session['service']
                },
                'state': SERVICE_STATE.PENDING,            
            }
        
            s = session['service']
            q = db.read_services_value(s)
            
            if(q is None or q == False): return jsonify({'error', 'errooooor'}, 400)
            service = q['value']

            # A
            if service == 0:
                data['service'].update({
                    'type': request.form.get("service"),
                    'date': request.form.get("month") +" "+request.form.get("year"),
                })

            # B
            elif service == 1:
                data['service'].update({
                    'type': request.form.get('service-type'),
                    'account': request.form.get('account'),
                    'entity': request.form.get('account-type'),
                    'department': request.form.get('department'),
                    'birthday': request.form.get('birthday')
                })

            # C
            elif service == 2:
                data['service'].update({
                    'type': request.form.get('service-type'),
                    'connection-type': request.form.get('connection-type'),
                    'location': request.form.get('location'),
                    'problem': request.form.get('problem'),
                })

            # D
            elif service == 3:
                data['service'].update({
                    'type': request.form.get('service-type'),
                    'device': request.form.get('devices'),
                    'other-devices': request.form.get('other-device'),
                    'problem': request.form.get('problem'),
                    'location': request.form.get('location'),
                })
                
            # e
            elif service == 4:
                s = request.form.get('service-type')
                
                data['service'].update({
                    'type': s,
                })

                if "install" in s.lower():
                    data['service'].update({
                        'software': request.form.get('sub-serv'),
                    })
                elif 'post' in s.lower():
                    data['service'].update({
                        'website': request.form.get('sub-serv'),
                        'author': request.form.get('author'),
                        'editor': request.form.get('editor'),
                        'from': request.form.get('from'),
                        'to': request.form.get('to')
                    })
                    
            # f
            elif service == 5:
                data['service'].update({
                    'type': request.form.get('service-type')
                })
                    
            # g
            elif service == 6 or service == 7:
                data['service'].update({
                    'type': request.form.get('service-type')
                })
            
            response = db.create_request(data)
            session['response_create'] = response
            session.pop('name', None)
            session.pop('email', None)
            session.pop('contact', None)
            session.pop('service', None)

        else: return 'Error'
        return render_template(route.loading)
    

@app.route('/error')
def error():
    return 'Error'

# Admin Routing 
@app.route('/admin')
def admin_login():
    return render_template(route.admin_login)

@app.route('/request')
def request_page():
    return render_template(route.request)

# AJAX REQUESTS
@app.route('/fetch_request', methods=["GET"])
def fetch_request():
    if request.method == 'GET':
        data = db.read_request()
        return data
    
    
@app.route('/update_request/',  methods=['POST'])
def update_request():
    if request.method == 'POST':
        data = request.get_json()
        id = data['id']
        state = data['state']
        oic = data['oic']
        print(data)
        dates = { SERVICE_STATE.GET_STRING[data['state']] : get_today() }
        response = db.update_request(id, state, oic, dates)
        return response

if __name__ == "__main__":
    app.run(debug=True)

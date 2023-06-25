# 3rd Part thigns
from flask import Flask, render_template, redirect, request, session, request, jsonify

# Ian defined imports
import routes as route
import db_config, db
from constants import SERVICE_STATE

# App config
app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.secret_key = "23456789"
app.config["SESSION_TYPE"] = 'filesystem'

from datetime import datetime
def get_today():
    now = datetime.now()
    return now.strftime("%m/%d/%Y")

#Routing
@app.route('/')
def index():
    return render_template(route.homepage)


@app.route('/form', methods=['GET', 'POST'])
def form():
    if request.method == 'POST':
        return render_template(route.forms)
    

@app.route('/form_a', methods=['POST'])
def form_a():
    if request.method == 'POST':        
        session["name"] = request.form.get("name")
        session["email"] = request.form.get("email")
        session["contact"] = request.form.get("contact")
        session["service"] = request.form.get("service")
        return render_template(route.service_a)
    
    
@app.route('/list', methods=['GET'])
def read():
    return db.read_list()

    

@app.route('/loading', methods=['POST'])
def loading():
    if request.method == 'POST':

        data = {
            'user': {
                "name": session["name"],
                "email": session["email"],
                "contact": session["contact"]
            },
            'service': {
                'name': session["service"],
                'type': request.form.get("service"),
                'date': request.form.get("month") +" "+request.form.get("year"),
            },
            'dates': {
                'requested': get_today(),
                'accepted': None,
                'completed': None
            },
            'state': SERVICE_STATE.PENDING
        }

        return db.create_request(data)
        # return render_template(route.loading)

# Admin Routing 
@app.route('/admin')
def admin_login():
    return render_template(route.admin_login)

@app.route('/request')
def request_page():
    data = db.read_request()
    return data
    return render_template(route.request, data=data)




if __name__ == "__main__":
    app.run(debug=True)

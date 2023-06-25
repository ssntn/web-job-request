# 3rd Part thigns
from flask import Flask, render_template, redirect, request, session, request, jsonify

# Ian defined imports
import routes as route
import db_config, db

# App config
app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.secret_key = "23456789"
app.config["SESSION_TYPE"] = 'filesystem'

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
        return render_template(route.service_a)
    
    
@app.route('/list', methods=['GET'])
def read():
    return db.read_list()

    

@app.route('/loading', methods=['POST'])
def loading():
    if request.method == 'POST':

        data = {
            "name": session["name"],
            "email": session["email"],
            "contact": session["contact"],
            'service': request.form.get("service"),
            'month': request.form.get("month"),
            'year': request.form.get("year"),
        }

        return db.create_request(data)

        # return render_template(route.loading)

# Admin Routing 
@app.route('/admin')
def admin_login():
    return render_template(route.admin_login)

@app.route('/request')
def request_page():
    return render_template(route.request)




if __name__ == "__main__":
    app.run(debug=True)

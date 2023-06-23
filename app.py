from flask import Flask, render_template, redirect, request, session

# App config
app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.secret_key = "23456789"
app.config["SESSION_TYPE"] = 'filesystem'


# Routes
routes = {}
routes['homepage'] = 'homepage.html'
routes['forms'] = 'form.html'
routes['service_a'] = 'a.html'
routes['loading'] = 'loading.html'

#Routing
@app.route('/')
def index():
    return render_template(routes['homepage'])

@app.route('/form', methods=['GET', 'POST'])
def form():
    if request.method == 'POST':
        return render_template(routes['forms'])

@app.route('/form_a', methods=['POST'])
def form_a():
    if request.method == 'POST':
        
        name = request.form.get("name")
        email = request.form.get("email")
        contact = request.form.get("contact")
        
        session["name"] = name
        session["email"] = email
        session["contact"] = contact

        return render_template(routes['service_a'])
    
    
@app.route('/loading', methods=['POST'])
def loading():
    if request.method == 'POST':
        service = request.form.get("service")
        month = request.form.get("month")
        year = request.form.get("year")

        session['service'] = service
        session['month'] = month
        session['year'] = year

        return render_template(routes['loading'])
    

if __name__ == "__main__":
    app.run(debug=True)

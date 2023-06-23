from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('homepage.html')

@app.route('/form', methods=['GET', 'POST'])
def form():
    if request.method == 'POST':
        return render_template('form.html')

@app.route('/form_a', methods=['POST'])
def form_a():
    if request.method == 'POST':
        return render_template('a.html')

if __name__ == "__main__":
    app.run(debug=True)

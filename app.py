from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('homepage.html')


@app.route('/form')
def form():
    return render_template('form.html')

if __name__ == "__main__":
    app.run(debug=True)
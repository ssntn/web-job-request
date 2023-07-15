from datetime import datetime
def today():
    now = datetime.now()
    return now.strftime("%m/%d/%Y")

def db_today():
    now = datetime.now()
    return now.strftime("%m%d%Y-%H%M%S")

def generate_password(password_length = 8):
    import random
    import string
    characters = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(random.choice(characters) for _ in range(password_length))
    return password
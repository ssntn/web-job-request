from datetime import datetime
def today():
    now = datetime.now()
    return now.strftime("%m/%d/%Y")

def db_today():
    now = datetime.now()
    return now.strftime("%m%d%Y-%H%M%S")

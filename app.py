from flask import Flask
from flask_apscheduler import APScheduler

app = Flask(__name__)
scheduler = APScheduler()

@scheduler.task('interval', id='my_job', seconds=10)
def my_job():
    print('This job is executed every 10 seconds.')

if __name__ == '__main__':
    scheduler.init_app(app)
    scheduler.start()
    app.run()
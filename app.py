import time
import datetime
import subprocess
import json
from flask import Flask
from flask_cors import CORS
import requests

dt_today = datetime.date.today()
td_10 = datetime.timedelta(days=10)
dt_10 = dt_today + td_10
vandaag = '{}-{}-{}'.format(dt_today.year, dt_today.month, dt_today.day)
tiendagen = '{}-{}-{}'.format(dt_10.year, dt_10.month, dt_10.day)

app = Flask(__name__)
CORS(app)
app.secret_key = 'dev'

@app.route('/')
def root():
    return 'nen flask van waa?'

@app.route('/wickdingske', defaults={'a_datum': vandaag, 'b_datum': tiendagen})
def wickdingske(a_datum, b_datum):

    headers = {'Content-Type':'application/json'}

    url_host = 'https://ccdefactorij.yesplan.be'
    url_path = 'api/dataviewresult/<niet voor scm>/json'
    url_key = 'api_key=<niet voor scm>'
    url0 = '{}/{}?{}'.format(url_host, url_path, url_key)

    json_data = {'a': a_datum, 'b': b_datum}
    response0 = requests.post(url0, json=json_data, headers=headers)
    print('response0 text {}'.format(response0.text))
    
    dv_key = response0.json()['contents']['id']

    def get_status():
        url1 = '{}/{}/{}/status?{}'.format(url_host, url_path, dv_key, url_key)
        response1 = requests.get(url1, headers=headers)
        return response1.json()['contents']['status']

    url_status = get_status()
    print('url_status {}'.format(url_status))

    if url_status == 'failed':
        return 'failed'

    while url_status == 'running':
        if url_status == 'failed':
            return 'failed'
        print('sleeping url_status {}'.format(url_status))
        time.sleep(1)
        url_status = get_status()

    if url_status == 'success':
        print('success url_status {}'.format(url_status))
        url2 = '{}/{}/{}?{}'.format(url_host, url_path, dv_key, url_key)
        response2 = requests.get(url2, headers=headers)
        return {'response': response2.json()}
    return 'failed'

if __name__ == '__main__':
    app.run('127.0.0.1', '44444', debug=True)

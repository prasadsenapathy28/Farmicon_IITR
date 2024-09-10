# import matplotlib
# matplotlib.use('Agg')  

import requests # type: ignore
import xmltodict  # type: ignore
from pymongo import MongoClient # type: ignore
from flask import Flask, jsonify, request  # type: ignore
from flask_cors import CORS  # type: ignore
from flask_sockets import Sockets  # type: ignore
from urllib.parse import quote_plus
from apscheduler.schedulers.background import BackgroundScheduler  # type: ignore
from datetime import datetime, timedelta
from bson.json_util import dumps
import pandas as pd # type: ignore
import matplotlib.pyplot as plt
# import io
# import base64


app = Flask(__name__)
CORS(app)
sockets = Sockets(app)

username = quote_plus("{username}")
password = quote_plus("{password}")
mongo_uri = f"mongodb+srv://{username}:{password}@cluster0.kdlwnl2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(mongo_uri, tls=True, tlsAllowInvalidCertificates=False)
db = client.crop_price_db
collection = db.crop_prices

clients = []

def fetch_and_update_data():
    try:
        api_url = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=<your-api-key>&format=xml"
        current_time = datetime.now()
        # print('Current_Run_Time :', current_time)
        next_run_time = current_time + timedelta(minutes=30)
        # print('Next_Run_Time :', next_run_time)
        response = requests.get(f"{api_url}&limit=1&offset=0")
        response.raise_for_status()
        data = xmltodict.parse(response.content)
        total_records = int(data['result']['total'])
        print(total_records)
        response = requests.get(f"{api_url}&limit={total_records}&offset=0")
        response.raise_for_status()
        data = xmltodict.parse(response.content)
        records = data['result']['records']['item']

        updates_made = False

        for record in records:
            arrival_date = record.get("arrival_date")
            if arrival_date:
                formatted_date = convert_to_yyyy_mm_dd(arrival_date)
                if formatted_date:
                    record["arrival_date"] = formatted_date
            
            query = {
                "state": record.get("state"),
                "district": record.get("district"),
                "market": record.get("market"),
                "commodity": record.get("commodity"),
                "arrival_date": record.get("arrival_date")
            }
            update = {"$set": record}
            result = collection.update_one(query, update, upsert=True)

            if result.modified_count > 0 or result.upserted_id is not None:
                updates_made = True

        if updates_made:
            print('Updation occurred')

        print("Data fetched and processed.")
    except Exception as e:
        print(f"Error fetching data: {e}")


def convert_to_yyyy_mm_dd(date_str):
    try:
        date_obj = datetime.strptime(date_str, "%d/%m/%Y")
        return date_obj.strftime("%Y-%m-%d")
    except ValueError:
        return None
    

@app.route('/recent_crop_prices', methods=['GET'])
def get_recent_crop_prices():
    state = request.args.get('state', type=str)
    district = request.args.get('district', type=str)
    commodity = request.args.get('commodity', type=str)
    market = request.args.get('market', type=str)

    query = {}
    if state:
        query['state'] = state
    if district:
        query['district'] = district
    if commodity:
        query['commodity'] = commodity
    if market:
        query['market'] = market

    pipeline = [
        {"$match": query},
        {"$sort": {"arrival_date": -1}},
        {"$limit": 1} 
    ]
    recent_data = list(collection.aggregate(pipeline))

    for item in recent_data:
        item['_id'] = str(item['_id'])

    return jsonify(recent_data)


@app.route('/range_crop_prices', methods=['GET'])
def get_data_in_date_range():
    state = request.args.get('state', type=str)
    district = request.args.get('district', type=str)
    market = request.args.get('market', type=str)
    commodity = request.args.get('commodity', type=str)
    date_from = request.args.get('date_from', type=str)
    date_to = request.args.get('date_to', type=str)

    if not (state and district and commodity and market and date_from and date_to):
        return jsonify([]), 400

    query = {
        'state': state,
        'district': district,
        'commodity': commodity,
        'market': market,
        'arrival_date': {'$gte': date_from, '$lte': date_to}
    }

    data = list(collection.find(query).sort('arrival_date'))
    
    for item in data:
        item['_id'] = str(item['_id'])

    return jsonify(data)


@app.route('/price_trends', methods=['GET'])
def get_price_trends():
    state = request.args.get('state', type=str)
    district = request.args.get('district', type=str)
    market = request.args.get('market', type=str)
    commodity = request.args.get('commodity', type=str)
    date_from = request.args.get('date_from', type=str)
    date_to = request.args.get('date_to', type=str)

    query = {
        'state': state,
        'district': district,
        'commodity': commodity,
        'market': market,
    }

    if date_from and date_to:
        query['arrival_date'] = {'$gte': date_from, '$lte': date_to}
    else:
        most_recent_entry = collection.find_one(
            {'state': state, 'district': district, 'market': market, 'commodity': commodity},
            sort=[("arrival_date", -1)]
        )
        if not most_recent_entry:
            return jsonify({'error': 'No data found'}), 404
        most_recent_date = most_recent_entry['arrival_date']
        most_recent_date_dt = datetime.strptime(most_recent_date, "%Y-%m-%d")
        start_date_dt = most_recent_date_dt - timedelta(days=8)
        start_date_str = start_date_dt.strftime("%Y-%m-%d")

        query['arrival_date'] = {'$gte': start_date_str, '$lte': most_recent_date}

    data = list(collection.find(query).sort('arrival_date'))

    for item in data:
        item['_id'] = str(item['_id'])

    return jsonify(data)


@app.route('/crop_prices', methods=['GET'])
def get_crop_prices():
    state = request.args.get('state', type=str)
    district = request.args.get('district', type=str)
    commodity = request.args.get('commodity', type=str)
    market = request.args.get('market', type=str)

    query = {}
    if state:
        query['state'] = state
    if district:
        query['district'] = district
    if commodity:
        query['commodity'] = commodity
    if market:
        query['market'] = market

    results = collection.find(query)
    data = list(results)
    for item in data:
        item['_id'] = str(item['_id'])

    return jsonify(data)


scheduler = BackgroundScheduler()
next_run_time = datetime.now() + timedelta(minutes=30)
print(next_run_time)
scheduler.add_job(func=fetch_and_update_data, trigger="interval", minutes=30)
scheduler.start()


if __name__ == '__main__':
    # fetch_and_update_data() # Initial fetch
    app.run(debug=True, use_reloader=False, host='0.0.0.0', port=5000)

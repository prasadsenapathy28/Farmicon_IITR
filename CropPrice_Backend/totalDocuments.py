from urllib.parse import quote_plus
from pymongo import MongoClient
from datetime import datetime

username = quote_plus("farmicon_")
password = quote_plus("farmicon@123")
mongo_uri = f"mongodb+srv://{username}:{password}@cluster0.kdlwnl2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(mongo_uri, tls=True, tlsAllowInvalidCertificates=False)
db = client.crop_price_db
collection = db.crop_prices

clients = []

target_date = "2024-09-09"
count = collection.count_documents({"arrival_date": target_date})
print(f"Number of documents inserted on {target_date}: {count}")

def convert_date(date_str):
    try:
        date_obj = datetime.strptime(date_str, "%d/%m/%Y")
    except ValueError:
        try:
            date_obj = datetime.strptime(date_str, "%Y-%m-%d")
        except ValueError:
            return None
    return date_obj.strftime("%Y-%m-%d")

# for document in collection.find({}):
#     arrival_date = document.get("arrival_date")
#     if arrival_date:
#         formatted_date = convert_date(arrival_date)
#         if formatted_date:
#             collection.update_one(
#                 {"_id": document["_id"]},
#                 {"$set": {"arrival_date": formatted_date}}
#             )
#             print(f"Updated document with ID {document['_id']}")
# print("Date conversion completed.")

# filter_date = "02/09/2024"

# for document in collection.find({"arrival_date": filter_date}):
#     arrival_date = document.get("arrival_date")
#     if arrival_date:
#         formatted_date = convert_date(arrival_date)
#         if formatted_date:
#             collection.update_one(
#                 {"_id": document["_id"]},
#                 {"$set": {"arrival_date": formatted_date}}
#             )
#             print(f"Updated document with ID {document['_id']}")

# print("Date conversion completed for", filter_date)


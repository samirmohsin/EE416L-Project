from flask_pymongo import PyMongo
from flask import Flask, jsonify, request
from flask.helpers import send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder='haas-web-app/build', static_url_path="")
app.config['MONGO_URI'] = "mongodb+srv://samir_project:J39HCJ4rwhYv223J@cluster0.ngo9h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongodb_client = PyMongo(app)
col = mongodb_client.db.Projects

CORS(app)






@app.route('/deleteProject/<project_ID>', methods=['GET'])
def deleteProject(project_ID: str):
    print(project_ID)
    #delete project in db if matches project id, else display error msg
    query = {"ID": str(project_ID)}
    col.delete_one(query)
    print("done removing document")
    data={'res': 'yes'}
    return jsonify(data)

@app.route('/addProject', methods=["POST"])
def addProject():
    return 1
    #add project to db, if other project exists in db then return error


@app.route('/')
def index():
    return send_from_directory(app.static_folder,'index.html')


#@app.route('/joinProject'/, methods=["POST"])
if __name__ == '__main__':
    app.run()
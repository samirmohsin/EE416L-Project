import json

from bson import ObjectId
from flask_pymongo import PyMongo
from flask import Flask, jsonify, request
from flask.helpers import send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder='haas-web-app/build', static_url_path="")
app.config['MONGO_URI'] = "mongodb+srv://sw-lab-project:ohN8rtvME3zCHApd@cluster0.b7kzb.mongodb.net/database?retryWrites=true&w=majority"
mongodb_client = PyMongo(app)
database = mongodb_client.db
projectsCol = database.projects
hwSetCol = database.hardwareSets
usersCol = mongodb_client.db.users

CORS(app)


def encryptPassword(inputText):
    reversedInput = inputText[::-1]
    encryptedText = ""

    for i in range(0, len(reversedInput)):
        newChar = ord(reversedInput[i]) + 1
        if not (34 <= newChar <= 126):
            encryptedText += str(chr(92 + newChar % 126))
        else:
            encryptedText += str(chr(newChar))

    return encryptedText


@app.route('/createUser', methods=['POST'])
def createUser():
    newUser = request.get_json()
    username = newUser['username']

    # check if username already exists
    checkUsername = usersCol.find_one({'username': {'$eq': username}})

    if checkUsername is not None:
        print('ur here')
        return jsonify({'resultVal': 'ERROR'})

    password = encryptPassword(newUser['password'])

    newUserJSON = {"username": username, "password": password, "projects": []}
    usersCol.insert_one(newUserJSON)
    return jsonify({'resultVal': 'success'})


@app.route('/login', methods=["POST"])
def login():
    user = request.get_json()
    username = user['username']
    password = encryptPassword(user['password'])

    checkAccount = usersCol.find_one({'username': {'$eq': username}, 'password': {'$eq': password}})

    if checkAccount is None:
        print("did it reach")
        return jsonify({'resultVal': 'ERROR'})

    print("reach here")
    return jsonify({'resultVal': 'success'})


@app.route('/hardwareManagement', methods=["GET"])
def updateTable():
    id = '6254c4de3e106eb5b6d0f793'
    hardwareSetId = ObjectId(id)
    HWSet = hwSetCol.find_one({'_id': {'$eq': hardwareSetId}})
    print(HWSet)

    availability1 = HWSet["Availability1"]
    availability2 = HWSet["Availability2"]

    print(availability1)
    print(availability2)

    return jsonify({"Availability1": availability1, "Availability2": availability2})


@app.route('/updateAvailability', methods=["POST"])
def updateAvailability():
    result = request.get_json()
    quantity = int(result['quantity'])

    id = '6254c4de3e106eb5b6d0f793'
    hardwareSetId = ObjectId(id)
    HWSet = hwSetCol.find_one({'_id': {'$eq': hardwareSetId}})
    availability1 = int(HWSet["Availability1"])
    availability2 = int(HWSet["Availability2"])

    # add code later to update only the required hardware set
    # for now adds quantity back to HWset1 availability
    newAvailability = availability1 - quantity

    post = {"_id": id,
            "Name": "HWSets",
            "Capacity1": "200",
            "Availability1": newAvailability,
            "Capacity2": "200",
            "Availability2": "200"}
    hwSetCol.insert_one(post)


@app.route('/deleteProject/<project_ID>', methods=['GET'])
def deleteProject(project_ID: str):
    # delete project in db if matches project id, else display error msg
    checkID = projectsCol.find_one({'ID': {'$eq': project_ID}})
    # check that ID actually exists/associated w/ a project
    if checkID is None:
        return jsonify({'resultVal': 'ERROR:delete'})

    projectsCol.delete_one({'ID': {'$eq': project_ID}})
    return jsonify({'resultVal': 'success:delete'})


@app.route('/createProject', methods=["POST"])
def createProject():
    newProject = request.get_json()
    projectName = newProject['name']
    projectDescription = newProject['description']
    projectID = newProject['id']

    # check that ID isn't associated w/ existing project
    checkID = projectsCol.find_one({'ID': {'$eq': projectID}})
    if checkID is not None:
        return jsonify({'resultVal': 'ERROR:create'})

    # else add new project to db
    newProjectJSON = {'name': projectName, 'description': projectDescription, 'ID': projectID}
    projectsCol.insert_one(newProjectJSON)
    return jsonify({'resultVal': 'success:create'})


@app.route('/joinProject', methods=["POST"])
def joinProject():
    joinRequest = request.get_json()
    projectID = joinRequest['id']
    username = joinRequest['username']

    # check that project ID exists and user isn't already part of the project
    # check that id exists

    checkID = projectsCol.find_one({'ID': {'$eq': projectID}})
    checkUser = usersCol.find_one({'projects': {'$eq': projectID}})

    if checkID is None:
        return jsonify({'resultVal': 'ERROR:join:id'})
    elif checkUser is not None:
        return jsonify({'resultVal': 'ERROR:join:user'})

    # else add user to project
    usersCol.update_one({'username': {'$eq': username}}, {'$push': {'projects': projectID}})
    return jsonify({'resultVal': 'success:join'})


@app.route('/getProject/<username>', methods=['GET'])
def getProjectTables(username: str):
    user_info = usersCol.find_one({'username': {'$eq': username}})
    return user_info.projects


@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run()

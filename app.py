import json

from bson import ObjectId
from flask_pymongo import PyMongo
from flask import Flask, jsonify, request
from flask.helpers import send_from_directory
#from flask_cors import CORS

app = Flask(__name__, static_folder='haas-web-app/build', static_url_path="")
app.config[
    'MONGO_URI'] = "mongodb+srv://sw-lab-project:ohN8rtvME3zCHApd@cluster0.b7kzb.mongodb.net/database?retryWrites=true&w=majority"
mongodb_client = PyMongo(app)
database = mongodb_client.db
projectsCol = database.projects
hwSetCol = database.hardwareSets
usersCol = mongodb_client.db.users

#CORS(app)


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


@app.route('/checkOut/<username>', methods=['GET', 'POST'])
def checkOut(username: str):
    result = request.get_json()
    quantity = int(result['quantity'])
    HWset = (result['set'])
    projectID = result['projectID']
    print(HWset)

    id = '6254c4de3e106eb5b6d0f793'
    hardwareSetId = ObjectId(id)
    HWSet = hwSetCol.find_one({'_id': {'$eq': hardwareSetId}})
    project = projectsCol.find_one({'ID': {'$eq': projectID}})

    if project is None:
        return jsonify({'resultVal': 'ERROR:Invalid ProjectID'})

    userInProject = usersCol.find_one({'username': username, 'projects': {'$in': [projectID]}})

    if userInProject is None:
        return jsonify({'resultVal': 'ERROR:Not part of project'})

    projectAvailability1 = project["HWSet1_checked_out"]
    projectAvailability2 = project["HWSet2_checked_out"]
    availability1 = HWSet["Availability1"]
    availability2 = HWSet["Availability2"]

    # Update the availability based on quantity, if too much, send an error message
    if HWset == 'HW Set 1':
        if quantity > availability1:
            return jsonify({'resultVal': 'ERROR:too much checked out'})
        else:
            newAvailability = availability1 - quantity
            projectAvailability1 += quantity
            hwSetCol.update_one({'_id': {'$eq': hardwareSetId}}, {'$set': {'Availability1': newAvailability}})
            projectsCol.update_one({'ID': {'$eq': projectID}}, {'$set': {'HWSet1_checked_out': projectAvailability1}})

    elif HWset == 'HW Set 2':
        if quantity > availability2:
            return jsonify({'resultVal': 'ERROR:too much checked out'})
        else:
            newAvailability = availability2 - quantity
            projectAvailability2 += quantity
            hwSetCol.update_one({'_id': {'$eq': hardwareSetId}}, {'$set': {'Availability2': newAvailability}})
            projectsCol.update_one({'ID': {'$eq': projectID}}, {'$set': {'HWSet2_checked_out': projectAvailability2}})

    return jsonify({"Availability1": availability1, "Availability2": availability2, 'resultVal': 'success'})


@app.route('/checkIn/<username>', methods=['GET', 'POST'])
def checkIn(username: str):
    result = request.get_json()
    quantity = int(result['quantity'])
    HWset = (result['set'])
    projectID = result['projectID']

    id = '6254c4de3e106eb5b6d0f793'
    hardwareSetId = ObjectId(id)
    HWSet = hwSetCol.find_one({'_id': {'$eq': hardwareSetId}})
    availability1 = HWSet["Availability1"]
    availability2 = HWSet["Availability2"]

    project = projectsCol.find_one({'ID': {'$eq': projectID}})
    if project is None:
        return jsonify({'resultVal': 'ERROR:Invalid ProjectID'})
    projectCheckedOut1 = project["HWSet1_checked_out"]
    projectCheckedOut2 = project["HWSet2_checked_out"]

    userInProject = usersCol.find_one({'username': username, 'projects': {'$in': [projectID]}})

    if userInProject is None:
        return jsonify({'resultVal': 'ERROR:Not part of project'})

    if HWset == 'HW Set 1':
        if quantity > projectCheckedOut1:
            return jsonify({'resultVal': 'ERROR:too much checked in'})
        else:
            availability1 += quantity
            projectCheckedOut1 -= quantity
            hwSetCol.update_one({'_id': {'$eq': hardwareSetId}}, {'$set': {'Availability1': availability1}})
            projectsCol.update_one({'ID': {'$eq': projectID}}, {'$set': {'HWSet1_checked_out': projectCheckedOut1}})

    elif HWset == 'HW Set 2':
        if quantity > projectCheckedOut2:
            return jsonify({'resultVal': 'ERROR:too much checked in'})
        else:
            availability2 += quantity
            projectCheckedOut2 -= quantity
            hwSetCol.update_one({'_id': {'$eq': hardwareSetId}}, {'$set': {'Availability2': availability2}})
            projectsCol.update_one({'ID': {'$eq': projectID}}, {'$set': {'HWSet2_checked_out': projectCheckedOut2}})

    return jsonify({"Availability1": availability1, "Availability2": availability2, 'resultVal': 'success'})


@app.route('/updateCheckedOut/<projectid>', methods=['GET'])
def updateCheckedOut(projectid: str):
    project = projectsCol.find_one({'ID': {'$eq': projectid}})
    if project is None:
        return jsonify({'Availability1': 0, 'Availability2': 0})

    Availability1 = project['HWSet1_checked_out']
    Availability2 = project['HWSet2_checked_out']

    return jsonify({'Availability1': Availability1, 'Availability2': Availability2})


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
    username = newProject['username']

    # check that ID isn't associated w/ existing project
    checkID = projectsCol.find_one({'ID': {'$eq': projectID}})
    if checkID is not None:
        return jsonify({'resultVal': 'ERROR:create'})

    # else add new project to db
    newProjectJSON = {'name': projectName, 'description': projectDescription, 'ID': projectID, 'HWSet1_checked_out': 0,
                      'HWSet2_checked_out': 0}
    projectsCol.insert_one(newProjectJSON)
    usersCol.update_one({'username': {'$eq': username}}, {'$push': {'projects': projectID}})
    return jsonify({'resultVal': 'success:create'})


@app.route('/joinProject', methods=["POST"])
def joinProject():
    joinRequest = request.get_json()
    projectID = joinRequest['id']
    username = joinRequest['username']

    # check that project ID exists and user isn't already part of the project
    # check that id exists

    checkID = projectsCol.find_one({'ID': {'$eq': projectID}})
    checkUser = usersCol.find_one({'username': username, 'projects': {'$in': [projectID]}})

    if checkID is None:
        return jsonify({'resultVal': 'ERROR:join:id'})
    elif checkUser is not None:
        return jsonify({'resultVal': 'ERROR:join:user'})

    # else add user to project
    usersCol.update_one({'username': {'$eq': username}}, {'$push': {'projects': projectID}})
    return jsonify({'resultVal': 'success:join'})


@app.route('/updateProjects/<username>', methods=['GET'])
def getProjectTables(username: str):
    user_info = usersCol.find_one({'username': {'$eq': username}})
    # get project id array from the user
    projectIDs = user_info['projects']
    # print(projectIDs)
    projectsJSON = {'resultVal': []}
    for ID in projectIDs:
        project = projectsCol.find_one({'ID': {'$eq': ID}}, {'_id': 0})
        if project is not None:
            projectsJSON['resultVal'].append(project)

    print(projectsJSON)
    return jsonify(projectsJSON)


@app.route('/metadata', methods=['GET'])
def getMetadata():
    print("in metadata")
    directories = ['mmg-database-1.0.0', 'aha-database-sample-excluded-record-1.0.0',
                   'ansiaami-ec13-test-waveforms-1.0.0', 'motion-artifact-contaminated-ecg-database-1.0.0',
                   'examples-of-electromyograms-1.0.0']
    metadata = []
    # iterate over files in
    # that directory
    for directory in directories:
        print(directory)
        for filename in os.listdir(directory):
            f = os.path.join(directory, filename)
            # checking if it is a file
            # if os.path.isfile(f):
            if (f.find('.hea') != -1):
                file = f[:len(f) - 4]
                print(file)
                record = wfdb.rdrecord(file)
                sigUnits = record.units[0]
                sigName = record.sig_name[0]

                string = "signalLen: " + str(record.sig_len) + "\nunits: " + str(sigUnits) + "\nsignalName: " + str(sigName)
                metadata.append(string)
                print("signalLen: ", record.sig_len, "units: ", sigUnits, "signalName: ", sigName)

                break

    print(metadata)

    return jsonify(
        {'Data1': metadata[0], 'Data2': metadata[1], 'Data3': metadata[2], "Data4": metadata[3], "Data5": metadata[4]})


@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))

from flask_pymongo import PyMongo
from flask import Flask, jsonify, request
from flask.helpers import send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder='haas-web-app/build', static_url_path="")
app.config['MONGO_URI'] = "mongodb+srv://sw-lab-project:ohN8rtvME3zCHApd@cluster0.b7kzb.mongodb.net/database?retryWrites=true&w=majority"
mongodb_client = PyMongo(app)
database = mongodb_client.db
#projectsCol = database.projects
hwSetCol = database.hardwareSets
usersCol = mongodb_client.db.users

CORS(app)

def encryptPassword(inputText):
    reversedInput = inputText[::-1]
    encryptedText = ""

    for i in range (0,len(reversedInput)):
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

    #check if username already exists
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

    checkAccount = usersCol.find_one({'username': {'$eq': username} ,'password': {'$eq': password}})

    if checkAccount is None:
        print("did it reach")
        return jsonify({'resultVal': 'ERROR'})

    print("reach here")
    return jsonify({'resultVal': 'success'})


# @app.route('/deleteProject/<project_ID>', methods=['GET'])
# def deleteProject(project_ID: str):
#   print(project_ID)
# delete project in db if matches project id, else display error msg
#  query = {"ID": str(project_ID)}
# col.delete_one(query)
# print("done removing document")
# data={'res': 'yes'}
# return jsonify(data)
def updateTable():
    HWSet = hwSetCol.find_one()
    if HWSet is not None:
        capacity1 = HWset["Capacity1"]
        availability1 = HWset["Availability1"]
        capacity2 = HWset["Capacity2"]
        availability2 = HWset["Availability2"]

        print(capacity1)
        print(availability1)
        print(capacity2)
        print(availability2)


# @app.route('/deleteProject/<project_ID>', methods=['GET'])
# def deleteProject(project_ID: str):
#   print(project_ID)
# delete project in db if matches project id, else display error msg
#  query = {"ID": str(project_ID)}
# col.delete_one(query)
# print("done removing document")
# data={'res': 'yes'}
# return jsonify(data)

#@app.route('/addProject', methods=["POST"])
#def addProject():
 #   return 1
    #add project to db, if other project exists in db then return error

#@app.route('/joinProject'/, methods=["POST"])

@app.route('/')
def index():
    return send_from_directory(app.static_folder,'index.html')


if __name__ == '__main__':
    app.run()
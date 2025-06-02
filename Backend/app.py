from flask import Flask, request, abort, jsonify

app = Flask(__name__)

@app.route("/upload", methods=["Post"])
def upload_file():
    if "file" not in request.files:
        return abort(400, "No file uploaded")
    
    file = request.files["file"]

    return jsonify({"message": f"File {file.filename} uploaded successfully!"}), 200
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/upload", methods=["Post"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"message": "No file uploaded."}), 400
    
    file = request.files["file"]

    if not file:
        return jsonify({"message": "No file uploaded."}), 400
    
    return jsonify({"message": f"File {file.filename} uploaded successfully!"}), 200



@app.route("/prompt", methods=["POST"])
def process_prompt():
    data = request.json
    prompt = data.get("prompt", "")

    if not prompt:
        return jsonify({"message": "Prompt cannot be empty. Please provide a valid prompt."}), 400
    print(prompt)
    return jsonify({"message": f"Received prompt: {prompt}"}), 200
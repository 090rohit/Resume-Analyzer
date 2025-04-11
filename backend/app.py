from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from model_processor import process_document

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/predict', methods=['POST'])
def predict():
    try:
        print("request data", )
        # Check if a file is included in the request
        if 'user-file' not in request.files:
            print("No file part in the request")  # Debugging
            return jsonify({'error': 'No file uploaded'}), 400

        text = request.form['text']

        file = request.files['user-file']
        if file.filename == '':
            print("Empty file name")  # Debugging
            return jsonify({'error': 'Empty file name'}), 400

        # Save the file securely
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Debugging: Check if the file is saved
        print(f"File saved at: {filepath}")

        # Process the file (e.g., extract text, calculate similarity)
        # For now, return a dummy score
        print('returning score')
        # Here you would call your model processing function
        # For example:
        score = process_document(filepath, text);

        print(score)

        return jsonify({'score': score})

    except Exception as e:
        print(f"Error: {e}")  # Debugging
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
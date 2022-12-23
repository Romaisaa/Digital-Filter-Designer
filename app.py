import os
import numpy as np
import pandas as pd
from werkzeug.utils import secure_filename
from flask import Flask, render_template, jsonify, request
app = Flask(__name__, template_folder="templates")


@app.route('/', methods=['GET'])
def index():
    return render_template('main.html')

@app.route('/filter', methods=['POST'])
def update_filter():
    body = request.json
    # TODO: Calling processing and get the right x, y
    x = [1, 2, 3, 4, 5, 6]
    y = [2, 1, 2, 0, 10, 11]
    return jsonify({
        'magnitude':{
            'x':x, 
            'y':y
        },
        'phase':{
            'x':x,
            'y':y
        }
    })


@app.route('/get_z_transform', methods=['POST'])
def get_transform():
    # TODO: Call processing filter and get the output
    return jsonify({'point': np.random.randint(0, 100)})


@app.route('/import-csv', methods=['POST'])
def import_csv():
    if(request.files['file']):
        file = request.files['file']
        abspath = os.path.dirname(__file__)
        file_path = os.path.join(
            abspath, 'uploads', secure_filename(file.filename))
        file.save(file_path)
        df = pd.read_csv(file_path)
        return jsonify({
            'data':list(df.iloc[:, 0])
        }), 200
    return 400




if __name__ == '__main__':
    app.run(debug=True) 
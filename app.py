import os
import json
import numpy as np
import pandas as pd
from werkzeug.utils import secure_filename
from flask import Flask, render_template, jsonify, request
from utlis import parseToComplex, filterResponse,differenceEqCoef
app = Flask(__name__, template_folder="templates")


@app.route('/', methods=['GET'])
def index():
    return render_template('main.html')

@app.route('/filter', methods=['POST'])
def update_filter():
    body = json.loads(request.data)

    zeros = parseToComplex(body['zeros'])
    poles = parseToComplex(body['poles'])

    normalized_frequency, magnitude_response,phase_response = filterResponse(zeros, poles)
    num_coef, den_coef = differenceEqCoef(zeros,poles)



    return jsonify({
        'magnitude':{
            'x':normalized_frequency.tolist(), 
            'y':magnitude_response.tolist()
        },
        'phase':{
            'x':normalized_frequency.tolist(),
            'y':phase_response.tolist()
        },
        'num_coeff':{
            'abs':np.abs(num_coef).tolist(),
            'angle':np.angle(num_coef).tolist()
        },
        'den_coeff':{
            'abs':np.abs(den_coef).tolist(),
            'angle':np.angle(den_coef).tolist()
        }
    })


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
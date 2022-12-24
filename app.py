import os
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
    # body = request.json
    # zeros & poles form from unit circle
    zeros=[{"x":0.5, "y":-1},{"x":-1, "y":0.5},{"x":-0.5, "y":1}]
    poles=[{"x":-0.8, "y":-1},{"x":-1, "y":1},{"x":0.5, "y":1}]

    zeros=parseToComplex(zeros)
    poles=parseToComplex(poles)
    normalized_frequency,magnitude_response,phase_response= filterResponse(zeros,poles)

    return jsonify({
        'magnitude':{
            'x':normalized_frequency.tolist(), 
            'y':magnitude_response.tolist()
        },
        'phase':{
            'x':normalized_frequency.tolist(),
            'y':phase_response.tolist()
        }
    })


@app.route('/coefficients', methods=['POST'])
def difference_coef():
    # body = request.json
    # zeros & poles form from unit circle
    zeros=[{"x":0.5, "y":-1},{"x":-1, "y":0.5},{"x":-0.5, "y":1}]
    poles=[{"x":-0.8, "y":-1},{"x":-1, "y":1},{"x":0.5, "y":1}]
    zeros=parseToComplex(zeros)
    poles=parseToComplex(poles)
    num_coef, den_coef = differenceEqCoef(zeros,poles)
    return jsonify({
        'num_coef':num_coef.tolist(),
        'den_coef':den_coef.tolist()
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
import os
import json
import pandas as pd
from werkzeug.utils import secure_filename
from flask import Flask, render_template, jsonify, request
from processing.processing import *
app = Flask(__name__, template_folder="templates")


num_coeff=[]
den_coeff=[]

@app.route('/', methods=['GET'])
def index():
    return render_template('main.html')

@app.route('/filter', methods=['POST'])
def update_filter():
    global num_coeff
    global den_coeff
    body = json.loads(request.data)
    zeros = parseToComplex(body['zeros'])
    poles = parseToComplex(body['poles'])
    normalized_frequency, magnitude_response,phase_response = filterResponse(zeros, poles)
    response= {
        'magnitude':{
            'x':normalized_frequency.tolist(), 
            'y':magnitude_response.tolist()
        },
        'phase':{
            'x':normalized_frequency.tolist(),
            'y':phase_response.tolist()
        }
    }
    
    if body["a_coeff"]!=[]:
        _,all_pass_phase_response= allPassFilter(body["a_coeff"])
        phase_response=phase_response+all_pass_phase_response
        response["phase"]={
            'x':normalized_frequency.tolist(),
            'y':phase_response.tolist()
        }
        all_pass_zeros,all_pass_poles= conjugate(body["a_coeff"])
        zeros=[*zeros,*all_pass_zeros]
        poles=[*poles,*all_pass_poles]

    num_coeff,den_coeff=differenceEqCoef(zeros,poles)
    return jsonify(response)

8
@app.route('/apply-filter', methods=['POST'])
def apply_filter_on_signal():
    global num_coeff
    global den_coeff
    body = json.loads(request.data)
    input_signal = body['input_signal']
    print(input_signal)
    filtered_signal= apply_filter(num_coeff,den_coeff,input_signal)
    return jsonify({
        'filtered_signal':filtered_signal.tolist()
    })

@app.route("/preview_a",methods=["POST"])
def preview_a_coef():
    body = json.loads(request.data)
    normalized_frequency,preview_phase_respose= allPassFilter(body["a_prev"])
    response={
        'x':normalized_frequency.tolist(),
        'y':preview_phase_respose.tolist()
    }
    return jsonify(response),200


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
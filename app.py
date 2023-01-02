import os
import json
import pandas as pd
from werkzeug.utils import secure_filename
from flask import Flask, render_template, jsonify, request
from processing.processing import processing
app = Flask(__name__, template_folder="templates")


processor=processing()

@app.route('/', methods=['GET'])
def index():
    return render_template('main.html')

@app.route('/filter', methods=['POST'])
def update_filter():
    global processor
    body = json.loads(request.data)
    zeros = body['zeros']
    poles = body['poles']
    args=[zeros,poles]
    if body["a_coeff"]!=[]:
        args.append(body["a_coeff"])

    print(args)
    normalized_frequency, magnitude_response,phase_response=processor.create_filter(args)
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
    return jsonify(response)


@app.route('/apply-filter', methods=['POST'])
def apply_filter_on_signal():
    global processor
    body = json.loads(request.data)
    input_signal = body['input_signal']
    filtered_signal= processor.apply_filter(input_signal)
    return jsonify({
        'filtered_signal':filtered_signal.tolist()
    })

@app.route("/preview_a",methods=["POST"])
def preview_a_coef():
    global processor
    body = json.loads(request.data)
    normalized_frequency,preview_phase_respose=processor.preview_a_coef(body["a_prev"])
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
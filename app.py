from flask import Flask, render_template, jsonify, request
import numpy as np
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


if __name__ == '__main__':
    app.run(debug=True) 
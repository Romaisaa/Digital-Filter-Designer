import numpy as np
import scipy
from scipy import signal

def parseToComplex(x_y_form):
    complex_form= [0]*len(x_y_form)
    for i in range(len(x_y_form)):
        complex_form[i] = x_y_form[i]["x"]+ x_y_form[i]["y"]*1j
    return complex_form

def filterResponse(zeros, poles):
    frequencies_values, response_complex = signal.freqz_zpk(zeros, poles, 1)
    normalized_frequency=frequencies_values/max(frequencies_values)
    magnitude_response = 20 * np.log10(np.abs(response_complex))
    phase_response = np.unwrap(np.angle(response_complex))
    return normalized_frequency, np.around(magnitude_response, decimals=3), np.around(phase_response, decimals=3)

def differenceEqCoef(zeros,poles):
    num_coef, den_coef = signal.zpk2tf(zeros, poles, 1)
    return  num_coef, den_coef

def apply_filter(num_coef, den_coef, input_signal):
    filtered_signal=signal.lfilter(num_coef, den_coef, input_signal).real
    return filtered_signal

def allPassFilter(a_coeffs):
    a_coeffs=string_to_complex(a_coeffs)
    if type(a_coeffs)!= list:
        a_coeffs=[a_coeffs]
    total_phase_response= np.zeros(512)
    for a in a_coeffs:
        frequencies_values, response_complex= signal.freqz([-a, 1.0], [1.0, -a])
        normalized_frequency=frequencies_values/max(frequencies_values)
        if (a==1):
            phase_response= np.zeros(512)
        else:
            phase_response= np.unwrap(np.angle(response_complex))
        total_phase_response= total_phase_response+np.round(phase_response,decimals=3)
    return normalized_frequency, total_phase_response

def conjugate(a_coeff):
    a_coeff=string_to_complex(a_coeff)
    zeros=[]
    poles=[]
    for a in a_coeff:
        zeros.append(a)
        poles.append((1/np.abs(a))*np.exp(1j*np.angle(a)))
    return zeros, poles

def string_to_complex(a_coeff):
    a_coeff_complex=[]
    for string in a_coeff:
        v = complex(string)
        a_coeff_complex.append(v)
    return a_coeff_complex
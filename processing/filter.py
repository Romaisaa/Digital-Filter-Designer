from scipy import signal
import numpy as np
class Filter:
    def __init__(self, *args) -> None:
        if not args:
            self.zeros=[]
            self.poles=[]
            return
        self.zeros= self.__parseToComplex(args[0])
        self.poles= self.__parseToComplex(args[1])


    def __parseToComplex(self,List:list)-> list:
        complex_form= [0]*len(List)
        for i in range(len(List)):
            complex_form[i] = List[i]["x"]+ List[i]["y"]*1j
        return complex_form
    
    def getFilterResponse(self)->tuple:
        frequencies_values, response_complex = signal.freqz_zpk(self.zeros, self.poles, 1)
        normalized_frequency=frequencies_values/max(frequencies_values)
        magnitude_response = 20 * np.log10(np.abs(response_complex))
        phase_response = np.unwrap(np.angle(response_complex))
        return (normalized_frequency, np.around(magnitude_response, decimals=3), np.around(phase_response, decimals=3))

    def __getFilterParams(self)->tuple:
        num_coef, den_coef = signal.zpk2tf(self.zeros, self.poles, 1)
        return  num_coef, den_coef

    def applyFilter(self,point):
        num_coef, den_coef = self.__getFilterParams()
        filtered_signal=signal.lfilter(num_coef, den_coef, point).real
        return filtered_signal

    def setA_Coef(self,a_coeff:list)->None:
        zeros,poles= self.__conjugate(a_coeff)
        self.zeros=[*self.zeros,*zeros]
        self.poles=[*self.poles,*poles]

    def __conjugate(self,a_coeff:list)->tuple:
        a_coeff=self.__string_to_complex(a_coeff)
        zeros=[]
        poles=[]
        for a in a_coeff:
            if a ==1:
                continue
            poles.append(a)
            zero=(1/np.abs(a))*np.exp(1j*np.angle(a))
            zeros.append(zero)
        return zeros, poles

    def __string_to_complex(slef,a_coeff:list)-> list:
        a_coeff_complex=[]
        for string in a_coeff:
            v = complex(string)
            a_coeff_complex.append(v)
        return a_coeff_complex
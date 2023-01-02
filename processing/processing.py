from processing.filter import Filter
class processing:
    def __init__(self) -> None:
        self.filter= Filter()

    def create_filter(self,arg):
        zeros= self.__parseToComplex(arg[0])
        poles= self.__parseToComplex(arg[1])
        self.filter.set_zeros_poles(zeros,poles)
        if len(arg)==3:
            self.filter.set_a_coeff(arg[2])
        print(arg)
        normalized_frequency, magnitude_response,phase_response = self.filter.get_filter_response()
        return normalized_frequency, magnitude_response,phase_response


    def __parseToComplex(self,List:list)-> list:
        complex_form= [0]*len(List)
        for i in range(len(List)):
            complex_form[i] = List[i]["x"]+ List[i]["y"]*1j
        return complex_form
    def apply_filter(self,point):
        return self.filter.apply_filter(point)

    def preview_a_coef(self,a_coef):
        filter= Filter()
        filter.set_a_coeff(a_coef)
        normalized_frequency,_,preview_phase_respose=filter.get_filter_response()
        return normalized_frequency,preview_phase_respose


export default class AJAX{
    constructor(form_id, input_fields_class, url, equal_condition = []){
        this.form = document.getElementById(form_id);
        this.all_input_fields = document.getElementsByClassName(input_fields_class);
        this.input_fields = []
    
        for(let index = 0; index < this.all_input_fields.length; index++){
            if(this.form.contains(this.all_input_fields[index])){
                this.input_fields.push(this.all_input_fields[index])
            }
        }
      
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            let data = {}
            for(let index = 0; index < this.input_fields.length; index++){
                let name = this.input_fields[index].name;
                let value = this.input_fields[index].value;
                data[name] = value;
            }

            let check_input_values = []
            for(let index = 0; index < equal_condition.length; index++){
                check_input_values.push(this.input_fields[equal_condition[index]].value)
            }

            let check = true;
            for(let i = 0; i < check_input_values.length - 1; i++){
                if(check_input_values[i] != check_input_values[i+1]){
                    check = false;
                }
            }

            if(check){
                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then((response) => response.json())
                .then((data) => {
                    if(data.error != undefined){
                        alert(data.error)
                    }
                    window.location.href = '/';  
                });
            }
            else{
                alert("Неверно введенные данные")
            }
        })
    }
}
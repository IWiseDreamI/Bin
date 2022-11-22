export default class Pop{
    constructor(call_button_class, buttons_class, objects_class, position = 0){
        this.position = position;
        this.prev_position = 1;
        this.buttons = document.getElementsByClassName(`${buttons_class}`);
        this.objects = document.getElementsByClassName(`${objects_class}`);
        this.call_buttons = document.getElementsByClassName(`${call_button_class}`);
        
        for(let object_index = 0; object_index < this.objects.length; object_index++){
            this.buttons[object_index].addEventListener("click", () => this.switch(object_index))
            this.objects[object_index].addEventListener("submit", () => {this.hide(this.position)})
        }

        for(let call_button_index = 0; call_button_index < this.call_buttons.length; call_button_index++){
            this.call_buttons[call_button_index].addEventListener("click", () => this.show(call_button_index))
        }
        document.addEventListener("click", this.check_click.bind(this), false)
    } 

    switch(object_index){
        if(object_index != this.objects.length - 1){
            this.position++;
            this.prev_position = this.position - 1;
        }
        else{
            this.prev_position = object_index;
            this.position = 0;
        }
        this.hide(this.prev_position)
        this.show(this.position)
    }

    hide(index){
        this.objects[index].style.opacity = "0";
        setTimeout( () => { this.objects[index].style.display = "none"; }, 600);
    }

    show(index){
        this.position = index;
        let object = this.objects[index]
        object.style.display = "flex";
        object.style.animation = "appearing ease-in-out 0.8s 1";
        object.style.opacity = "1";
    }

    check_click(){
        let object = this.objects[this.position]
        let call_button = this.call_buttons[this.position]
        let sibling = this.objects[this.prev_position]
        if(event.target != object && !object.contains(event.target) && event.target != call_button && event.target != sibling && !sibling.contains(event.target) ){
            this.hide(this.position)
        }
    }
}



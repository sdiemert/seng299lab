class View{
    constructor(){
        this._model = null; 
        this._control = null;
        this._viewState = 0; 
        this._elem = document.getElementById("content");
    }

    setControl(c){
        this._control = c; 
    }

    setModel(m){
        this._model = m; 
    }

    selectView(v){
        this._viewState = v; 
    }

    addData(){
        this._control.addDataInput(document.getElementById("data-in").value); 
    }

    renderData(){

        var data = this._model.getData(); 
        var s = ""; 
        this._elem.innerHTML = "";
        
        if(this._viewState === 0){
        
            for(var i = 0; i < data.length; i++){
                s += data[i]+"; "
            }
        
            var p = document.createElement("p");
            p.innerHTML = s;    
            this._elem.appendChild(p);
        
        }else if(this._viewState === 1){
        
            var l = document.createElement("ol");
            var tmp = null; 
        
            for(var i = 0; i < data.length; i++){
                tmp = document.createElement("li");
                tmp.innerHTML = data[i]; 
                l.appendChild(tmp);
            }
        
            this._elem.appendChild(l);

        }else{
        
            this._elem.innerHTML = JSON.stringify(data);
        
        }


    }

    notify(){
        this.renderData(this._model.getData()); 
    }

}
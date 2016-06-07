class Controller{
    constructor(){
        this._view = null; 
        this._model = null; 
    }

    setView(v){
        this._view = v; 
    }

    setModel(m){
        this._model = m; 
    }

    addDataInput(d){
        this._model.addData(d); 
        this.selectView();
    }

    selectView(){
        if(this._model.getData().length > 3){
            this._view.selectView(1);
        }else{
            this._view.selectView(0);
        }
        this._view.renderData();
    }
}
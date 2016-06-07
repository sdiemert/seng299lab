class Model{
    constructor(){
        this._view = null; 
        this._data = []; 
    }

    setView(v){
        this._view = v; 
    }

    getData(){
        return this._data; 
    }

    addData(d){
        this._data.push(d);
        this._view.notify(); 
    }
}
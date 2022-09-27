// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract TareasContract {

    uint public tareasContador = 0;

    constructor() {
        createTarea("mi primer tarea", "mi primer descripcion");
    }
    event TareaCreada(
        uint id,
        string titulo,
        string descripcion,
        bool done,
        uint256 createAt //es el timestamp 
    );
    event TareaToggledDone(uint256 id, bool done);

    struct Tarea {
        uint id;
        string titulo;
        string descripcion;
        bool done;
        uint256 createAt; //es el timestamp 

    }

    mapping(uint256 => Tarea) public tareas;

    function createTarea(string memory _titulo, string memory _descripcion) public {    //solo paso el titulo y la descripcion porque el resto se crea solo
        tareasContador++;
        tareas[tareasContador] = Tarea(tareasContador, _titulo, _descripcion,false, block.timestamp);
        emit TareaCreada(tareasContador,_titulo,_descripcion,false,block.timestamp);
    }


     function toggleDone(uint256 _id) public {
        Tarea memory _tarea = tareas[_id];
        _tarea.done = !_tarea.done;
        tareas[_id] = _tarea;
        emit TareaToggledDone(_id, _tarea.done);
    }

}
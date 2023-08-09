const tbody =  document.getElementById("cuerpo");
const txtNombre = document.getElementById("txtNombre");
const txtApellido = document.getElementById("txtApellido");
const txtPassword = document.getElementById("txtPassword");
const txtId = document.getElementById("txtId");
const details = document.getElementsByTagName("details");
const summary = document.getElementsByTagName("summary");
const btnAdd = document.getElementById("btnAdd");
const btnEditar = document.getElementById("btnEditar");

console.dir(txtId);
console.dir(summary)

let usuarios; 
async function cargar(){
    const resultado = await fetch("/getUsuarios");
    usuarios = await resultado.json();
    //console.log(usuarios);
    tbody.innerText="";
    usuarios.forEach(element => {
        const tr = document.createElement("tr");
        const tdId = document.createElement("td");
        const tdNombre = document.createElement("td");
        const tdApellido = document.createElement("td");
        const tdPassword = document.createElement("td");
        const tdAcciones = document.createElement("td");

        tdId.innerText = element.id;
        tdNombre.innerText= element.nombre;
        tdApellido.innerText = element.apellido;
        tdPassword.innerText = element.password;
        tdAcciones.innerHTML =`<button onclick="editar(${element.id})"><span class="material-symbols-outlined">
                                        edit
                                        </span></button>
                               <button onclick="eliminar(${element.id})"><span class="material-symbols-outlined" >
                                        delete
                                        </span></button>`;

        tr.appendChild(tdId);
        tr.appendChild(tdNombre);
        tr.appendChild(tdApellido);
        tr.appendChild(tdPassword);
        tr.appendChild(tdAcciones);

        tbody.appendChild(tr);

    });

}

async function agregar(){
    
    const data ={nombre:txtNombre.value,
        apellido:txtApellido.value,
         password:txtPassword.value};
    console.log(data)
    const resultado = await fetch("/addUsuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), 
      })
      if(resultado.status==400){
        alert("Error en el ingreso");
      }else{
        alert("Dato Ingresado");
      }
      txtNombre.value="";
      txtApellido.value="";
      txtPassword.value="";
      cargar();

}

async function eliminar(id){
  console.log(id);
  let respuesta=confirm('Esta seguro de Eliminar');
  if(respuesta){
    const resultado = await fetch(`deleteUsuario/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    if(resultado.status>=400){
      alert("Error al eliminar");      
    }else{
      alert("Eliminado Correctamente");
      cargar();
    }
  }

}

function editar(id){
  console.log(id);

  summary[0].innerText = "Editar";
  details[0].open=true;
  btnAdd.hidden = true;
  btnEditar.hidden=false;



 const usuario = usuarios.filter(usuario=>usuario.id==id);
  txtNombre.value =  usuario[0].nombre;
  txtApellido.value =  usuario[0].apellido;
  txtPassword.value =  usuario[0].password;
  txtId.value= id;
}

async function modificar(){
  const data = {
    id:txtId.value,
    nombre: txtNombre.value,
    apellido: txtApellido.value,
    password: txtPassword.value
  }
  const resultado = await fetch("/editUsuario",{
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), 
  });
  if(resultado.status>=400){
    alert("Error al Modificar")
  }else{
    alert('Modificación Exitosa');
    cargar()
  }
  summary[0].innerText = "Agregar";
  details[0].open=false;
  btnAdd.hidden = false;
  btnEditar.hidden=true;
  txtNombre.value="";
  txtApellido.value="";
  txtPassword.value="";
  txtId.value="";
}

cargar();
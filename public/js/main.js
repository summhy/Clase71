const tbody =  document.getElementById("cuerpo");
console.dir(tbody);

async function cargar(){
    const resultado = await fetch("/getUsuarios");
    const usuarios = await resultado.json();
    console.log(usuarios);
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
        tdAcciones.innerHTML =`<button><span class="material-symbols-outlined">
                                        edit
                                        </span></button>
                               <button><span class="material-symbols-outlined">
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
    const txtNombre = document.getElementById("txtNombre");
    const txtApellido = document.getElementById("txtApellido");
    const txtPassword = document.getElementById("txtPassword");
    const data ={nombre:txtNombre.value,
        apellido:txtApellido.value,
         password:txtPassword.value};
    console.log(data)
    const resultado = await fetch("/addUsuarios", {
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


cargar();
let valorApto = document.getElementById("apto");
let btnResultado = document
  .getElementById("btn-consulta")
  .addEventListener("click", getDatos);

const formatter = new Intl.NumberFormat("en-ES", {
  style: "currency",
  currency: "CLP",
  minimumFractionDigits: 0,
});


function upperCase() {
    var x=document.getElementById("apto").value
    document.getElementById("apto").value=x.toUpperCase()
 }

function getDatos() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "morosos.json", true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let datos = JSON.parse(this.responseText);

      let resultado = document.getElementById("res");
      let consulta = valorApto.value;

      resultado.innerHTML = "";

      for (let item of datos)
        if ((consulta == item.apto) &&(item.deuda <= 0) ) {
          resultado.innerHTML = `
        <p class="fw-bold">Apartamento: <span class="fw-normal">${
          item.apto
        }</span></p>
        <p class="fw-bold">Deuda Mes: <span class="fw-normal">${formatter.format(
          item.mes_anterior
        )}</span></p>
        <p class="fw-bold">Deuda Atrasada: <span class="fw-normal">${formatter.format(
          item.deuda
        )}</span></p>
        <p class="fw-bold">Total Deuda: <span class="fw-normal">${formatter.format(
          item.total_deuda
        )}</span></p>
        <p class="fw-bold text-success">Estas Habilitado para votar</p>
           
            `;
        }
        else if((consulta == item.apto) &&(item.deuda >= 0) ){
            resultado.innerHTML = `
        <p class="fw-bold">Apartamento: <span class="fw-normal">${
          item.apto
        }</span></p>
        <p class="fw-bold">Deuda Mes: <span class="fw-normal">${formatter.format(
          item.mes_anterior
        )}</span></p>
        <p class="fw-bold">Deuda Atrasada: <span class="fw-normal">${formatter.format(
          item.deuda
        )}</span></p>
        <p class="fw-bold">Total Deuda: <span class="fw-normal">${formatter.format(
          item.total_deuda
        )}</span></p>
        <p class="text-danger fw-bold"> No Estas Habilitado para votar</p>
           
            `;
        }
    }
  };
}

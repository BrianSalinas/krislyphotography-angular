import { Component } from '@angular/core';
import { ModeloCategorias } from '../Modelos/ModeloCategorias';
import { ModeloPlanes } from '../Modelos/ModeloPlanes';
import { GeneralService } from '../Servicios/General/general.service';
declare var $: any;
declare var bootstrap: any;
@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent {

  planes: ModeloPlanes[] = [];
  listaCategorias: string[] = [];
  listaCategoriasTemporal: string[] = [];
  listaImagenesTipo: string[] = [];
  openAccordion: boolean[] = [];
  categoriaNueva: string = "";
  accionActual = "guardar";
  constructor(private servicioGeneral: GeneralService) {

  }

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    this.servicioGeneral.ConsultaInformacionGeneral("consultacategoriaplanes", "").subscribe(result => {
      this.planes = result;
      for (var i = 0; i < this.planes.length; i++) {
        if (!this.listaCategorias.includes(this.planes[i].categoria)) {
          this.listaCategorias.push(this.planes[i].categoria);
          this.listaCategoriasTemporal.push(this.planes[i].categoria);
        }
      }
    });

    this.servicioGeneral.ConsultaInformacionGeneral("consultatipoimagenes", "").subscribe(result => {
      this.listaImagenesTipo = result;
    });
  }

  agregarCategoria() {
    if (this.categoriaNueva != "") {
      this.listaCategoriasTemporal.push(this.categoriaNueva);
    }
  }

  abrirModalGuardar() {
    this.accionActual = "guardar";
    $("#name").val("");
    $("#price").val("");
    $("#desc1").val("");
    $("#desc2").val("");
    $("#desc3").val("");
    $("#desc4").val("");
    $("#desc5").val("");
    var myModal = new bootstrap.Modal(document.getElementById("crearplanes"), {});
    myModal.show();
  }

  abrirModalActualizar(id: number) {
    let plan!: ModeloPlanes;
    for (let i = 0; i < this.planes.length; i++) {
      if (this.planes[i].id == id) {
        plan = this.planes[i];
      }
    }
    this.accionActual = "actualizar";
    $("#name").val(plan.nombreplan);
    $("#price").val(plan.precio);
    $("#category").val(plan.categoria);
    let descTemp = [];
    descTemp = plan.descripcion.split(';');
    for (let i = 1; i <= descTemp.length; i++) {
      $("#desc" + i).val(descTemp[i - 1]);
    }
    //$("#crearplanes").modal("show");
    var myModal = new bootstrap.Modal(document.getElementById("crearplanes"), {});
    myModal.show();
  }

  guardarPlan() {
    let plan = new ModeloPlanes();
    if ($("#name").val() == "" || typeof $("#name").val() === 'undefined' || $("#name").val() == null) {
      alert("Debes ingresar el nombre del plan");
      return;
    } else if ($("#price").val() == "" || typeof $("#price").val() === 'undefined' || $("#price").val() == null) {
      alert("Debes ingresar el precio de un plan");
      return;
    }
    plan.nombreplan = $("#name").val();
    plan.precio = $("#price").val();
    plan.categoria = $("#category").val();
    plan.paquetefotos = $("#images").val();
    let temp = "";
    for (let i = 1; i <= 5; i++) {
      if ($("#desc" + i).val() != "" && typeof $("#desc" + i).val() !== 'undefined' && $("#desc" + i).val() != null) {
        temp = temp + $("#desc" + i).val() + ";";
      }
    }
    plan.descripcion = temp.substring(0, temp.length - 1);
    if (this.accionActual == "guardar") {
      this.servicioGeneral.ConsultaInformacionGeneral("guardaplan", plan).subscribe(result => {
        if (result) {
          alert("Plan Guardado");
          var myModal = new bootstrap.Modal(document.getElementById("crearplanes"), {});
          myModal.hide();
          this.getInfo();
        } else {
          alert("Error al guardar plan Intente Nuevamente");
        }
      });
    } else {
      this.servicioGeneral.ConsultaInformacionGeneral("actualizaplan", plan).subscribe(result => {
        if (result) {
          alert("Plan Actualizado");
          var myModal = new bootstrap.Modal(document.getElementById("crearplanes"), {});
          myModal.hide();
          this.getInfo();
        } else {
          alert("Error al actualizar el plan Intente Nuevamente");
        }
      });
    }

  }

  eliminarPlan(id: number) {
    if (confirm("Estas seguro de eliminar este plan?")) {
      this.servicioGeneral.ConsultaInformacionGeneral("eliminarplan", id).subscribe(result => {
        if (result) {
          alert("Plan Elimiando");
          this.getInfo();
        } else {
          alert("Error al eliminar el plan Intente Nuevamente");
        }
      });
    }
  }


}

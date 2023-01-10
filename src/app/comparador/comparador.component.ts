import { Component, OnInit } from '@angular/core';
import { Select2Option, Select2UpdateEvent } from 'ng-select2-component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comparador',
  templateUrl: './comparador.component.html',
  styleUrls: ['./comparador.component.css'],
})
export class ComparadorComponent implements OnInit {
  options: Select2Option | undefined;
  data1: any = [
    {
      label: 'Alaskan/Hawaiian Time Zone',
      options: [
        { value: 'AK', label: 'Alaska' },
        { value: 'HI', label: 'Hawaii', disabled: true },
      ],
    },
    {
      label: 'Pacific Time Zone',
      options: [
        { value: 'CA', label: 'California' },
        { value: 'NV', label: 'Nevada' },
        { value: 'OR', label: 'Oregon' },
        { value: 'WA', label: 'Washington' },
      ],
    },
    
   
  ];
  change(key: string, event: Event) {

    console.log(key, "dd" +event);

  }
  search(text: string) {
    this.data1 = text
      ? (JSON.parse(JSON.stringify(this.data1)) as Select2Option[]).filter(
          (option) =>
            option.label.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
      : JSON.parse(JSON.stringify(this.data1));
  }
  update(key: string, event: Select2UpdateEvent<any>) {

    console.log(event.value);
    if(event.value.length > 3) {
  Swal.fire({
    icon: 'error',
    title: 'Operación Incorrecta',
    text: 'Solo es Posible Seleccionar 3 Productos Por Vez',
  });

    }
  }
  constructor(){

  }
  ngOnInit(): void {

  }

}

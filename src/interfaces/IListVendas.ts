import { Key } from "react";

export interface IListVendas {
  cliente: String;
  cliente_cpf: String;
  dtEmissao: Date;
  medico_crm: String;
  medico_nome: String;
  numPedido: Number;
  status: String;
  vlTotal: Number;
}

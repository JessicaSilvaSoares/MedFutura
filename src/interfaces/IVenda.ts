export interface IVenda {
  cidade: String;
  cliente_cpf: String;
  dtEmissao: Date;
  estado: String;
  id_forma_pagamento: Number;
  itens: [
    {
      codItem: Number;
      produto: String;
      quant: Number;
      unidade: String;
      vr_unitario: Number;
    }
  ];
  medico_crm: String;
  medico_nome: String;
  obs: null | String;
  prazo_entrega: Number;
  status: String;
}

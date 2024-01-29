"use client";
import Produtos from "@/components/Produtos";
import styles from "./Pedido.module.scss";
import { IGetVenda } from "@/interfaces/IGetVenda";
import { IVenda } from "@/interfaces/IVenda";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

function getData() {
  const [venda, setVenda] = useState<IVenda>();
  const param = useParams();

  const url = `${process.env.URL_BASE}/venda?numPedido=${param.id}`;

  useEffect(() => {
    axios
      .get(url, {
        auth: {
          username: String(process.env.USERNAME),
          password: String(process.env.PASSWORD),
        },
      })
      .then((res) => {
        const data: IGetVenda = res.data;
        setVenda(data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return { numPedido: param.id, venda };
}

export default function Pedido() {
  const { numPedido, venda } = getData();

  return (
    <>
      <section className={styles.pedido}>
        <h2 className="txt-center">Pedido Nº {numPedido}</h2>
        <hr className={styles.pedido__hr} />

        <div className={styles.pedido__cabecalho}>
          <div>
            <p>Cliente: {venda?.cliente_cpf}</p>
            <p>Data: {venda?.dtEmissao.toLocaleString().replace(/\-/, "/")}</p>
            <p>Status: {venda?.status}</p>
          </div>

          <div>
            <p>Médico: {venda?.medico_nome}</p>
            <p>CRM: {venda?.medico_crm}</p>
            <p>Observação: {venda?.obs}</p>
          </div>
        </div>
        <div className={styles.pedido__itens}>
          {venda?.itens.map((item) => (
            <div
              className={styles.pedido__itens_item}
              key={Number(item.codItem)}
            >
              <h3 className={styles.pedido__itens_caption}>{item.produto}</h3>
              <table className={styles.tabela}>
                <thead>
                  <tr className={styles.tabela__linha}>
                    <th>Id</th>
                    <th>Valor Unitário</th>
                    <th>Unidade</th>
                    <th>Qtd.</th>
                    <th>Valor Total</th>
                  </tr>
                </thead>
                <tbody className={styles.tabela__tbody}>
                  <tr className={styles.tabela__linha}>
                    <td className="txt-center">{String(item.codItem)}</td>
                    <td className="txt-center">
                      R$ {item.vr_unitario.toFixed(2)}
                    </td>
                    <td className="txt-center">{String(item.unidade)}</td>
                    <td className="txt-center">{String(item.quant)}</td>
                    <td className="txt-center">
                      R${" "}
                      {(Number(item.vr_unitario) * Number(item.quant)).toFixed(
                        2
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>
      <Produtos />
    </>
  );
}

"use client";
import axios from "axios";
import styles from "../styles/page.module.scss";
import React, { useEffect, useState } from "react";
import { IListVendas } from "@/interfaces/IListVendas";
import Link from "next/link";
import classNames from "classnames";

function getData() {
  const [vendas, setVendas] = useState<Array<IListVendas>>();

  useEffect(() => {
    const url = `${process.env.URL_BASE}/vendas`;
    axios
      .get(url, {
        auth: {
          username: String(process.env.USERNAME),
          password: String(process.env.PASSWORD),
        },
      })
      .then((res) => {
        const data: Array<IListVendas> = res.data.data;
        setVendas(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return vendas;
}

export default function Home() {
  const data = getData();
  const [cliente, setCliente] = useState("");
  const [valor, setValor] = useState(0);

  return (
    <>
      <h2 className="txt-center">Vendas</h2>
      <div className={styles.container}>
        <section className={styles.section}>
          <div className={styles.input}>
            <select
              id="cliente"
              className={styles.input__select}
              onChange={(e) => setCliente(e.target.value)}
            >
              <option value=""></option>
              {data?.map((venda) => (
                <option
                  value={venda.cliente.toString()}
                  key={Number(venda.cliente)}
                >
                  {venda.cliente}
                </option>
              ))}
            </select>
            <label
              htmlFor="cliente"
              className={classNames({
                [styles.input__label]: true,
                [styles["input__label-disable"]]: cliente === "" ? false : true,
              })}
            >
              Cliente
            </label>
          </div>
          <div className={styles.input}>
            <select
              id="valor"
              className={styles.input__select}
              onChange={(e) => setValor(Number(e.target.value))}
            >
              <option value=""></option>
              {data?.map((venda) => (
                <option
                  value={venda.vlTotal.toFixed(2)}
                  key={Number(venda.numPedido)}
                >
                  R$ {venda.vlTotal.toFixed(2)}
                </option>
              ))}
            </select>
            <label
              htmlFor="valor"
              className={classNames({
                [styles.input__label]: true,
                [styles["input__label-disable"]]: valor > 0 ? true : false,
              })}
            >
              Valor
            </label>
          </div>
        </section>

        <section className={styles["section-tabela"]}>
          <small className={styles["section-tabela__aviso"]}>
            Clique na venda para ver detalhes
          </small>
          <table className={styles.tabela}>
            <thead>
              <tr className={styles.tabela__linha}>
                <th className="txt-center">Id</th>
                <th className="txt-center">Cliente</th>
                <th className="txt-center">Valor</th>
                <th className="txt-center">Data</th>
                <th className="txt-center">Médico</th>
                <th className="txt-center">Status</th>
              </tr>
            </thead>

            <tbody className={styles.tabela__tbody}>
              {data
                ?.filter((el) =>
                  valor
                    ? el.vlTotal === valor
                    : true && cliente
                    ? el.cliente === cliente
                    : true
                )
                .map((venda) => (
                  <tr
                    key={Number(venda.numPedido)}
                    onClick={() => venda.numPedido}
                  >
                    <Link
                      href={`/pedido/${venda.numPedido}`}
                      className={styles.tabela__linha}
                    >
                      <td className="txt-center">{String(venda.numPedido)}</td>
                      <td>{venda.cliente}</td>
                      <td className="txt-end">
                        R${" "}
                        {venda.vlTotal
                          .toFixed(2)
                          .replace(/^(\d*)(.)(\d{2})$/, "$1,$3")}
                      </td>
                      <td className="txt-center">
                        {venda.dtEmissao.toLocaleString().replace(/\-/g, "/")}
                      </td>
                      <td>{venda.medico_nome}</td>
                      <td className="txt-center">{venda.status}</td>
                    </Link>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}

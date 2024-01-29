import axios from "axios";
import { useState, useEffect } from "react";
import style from "./Produtos.module.scss";
import { IProdutos } from "@/interfaces/IProdutos";
import Link from "next/link";

function getProdutos() {
  const [produtos, setProdutos] = useState<IProdutos[]>();

  useEffect(() => {
    axios
      .get(`${process.env.URL_BASE}/produtos`, {
        auth: {
          username: String(process.env.USERNAME),
          password: String(process.env.PASSWORD),
        },
      })
      .then((res) => {
        const data: IProdutos[] = res.data.data;
        setProdutos(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return produtos;
}

export default function Produtos() {
  const produtos = getProdutos();

  return (
    <section className="section">
      <h2 className="txt-center">Produtos</h2>
      <table className={style.tabela}>
        <thead>
          <tr className={style.tabela__linha}>
            <th className="txt-center">EAN</th>
            <th className="txt-center">Descricao</th>
            <th className="txt-center">Valor</th>
            <th className="txt-center">Receita</th>
            <th className="txt-center">Estoque</th>
            <th className="txt-center">Unidade</th>
          </tr>
        </thead>

        <tbody className={style.tabela__tbody}>
          {produtos?.map((produto) => (
            <tr className={style.tabela__linha} key={Number(produto.codItem)}>
              <td className="txt-center">{produto.ean.toString()}</td>
              <td className="txt-center">{produto.descricao}</td>
              <td className="txt-end">R$ {produto.vl1.toFixed(2)}</td>
              <td className="txt-center">
                {produto.controlado ? "Sim" : "Não"}
              </td>
              <td className="txt-center">{produto.qtdEstoque.toString()}</td>
              <td className="txt-center">{produto.uniVenda.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

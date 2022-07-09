import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';
import { Context } from "../context/Movimiento";

var movimiento = {CuentaOrigen:"", Beneficiario:"", CuentaDestino:"", Concepto:"", Monto:0, EmailDestino:""};

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  const { addTransaction } = useContext(GlobalContext);
  const { addMovement } = useContext(Context);

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount
    }

    addTransaction(newTransaction);
    addMovement(movimiento);
  }

  return (
    <>
      <div>
        <h3> Movimiento </h3>
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <label htmlFor="cuentaOrigen">Cuenta Origen</label>
            <input type="text" value={movimiento.CuentaOrigen} onChange={(e) => setText(e.target.value)} placeholder="3566757364" />
          </div>
          <div className="form-control">
            <label htmlFor="text">Cuenta Destino</label>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Cuenta Destino..." />
          </div>
         
          <div className="form-control">
            <label htmlFor="amount"
            >Amount <br />
            (negative - expense, positive - income)</label
            >
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Cantidad..." />
          </div>
          <button className="btn">Enviar Transferencia</button>
        </form>
        <div>{JSON.stringify(movimiento,null,2)}</div>
      </div>
      
    </>
  )
}

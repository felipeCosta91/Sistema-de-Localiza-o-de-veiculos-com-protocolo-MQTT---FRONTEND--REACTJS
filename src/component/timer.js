import React from "react";
import { toast } from "react-interaction";

export default function Timer(parada) {
  const funcParada = (x, parada) => {
    if (parada === "anglo") {
      toast("O próximo ônibus no ponto " + parada + " em: " + x.anglo);
    }
    if (parada === "cotada") {
      toast("O próximo ônibus no ponto " + parada + " em: " + x.cotada);
    }
    if (parada === "ich") {
      toast("O próximo ônibus no ponto " + parada + " em: " + x.ich);
    }
    if (parada === "alm") {
      toast("O próximo ônibus no ponto " + parada + " em: " + x.ALM);
    }
    if (parada === "cabeluda") {
      toast("O próximo ônibus no ponto " + parada + " em: " + x.cabeluda);
    }
    if (parada === "salis") {
      toast("O próximo ônibus no ponto " + parada + " em: " + x.salis);
    }
  };
  fetch("http://34.68.188.21:443/times")
    .then(response => response.json())
    .then(data => funcParada(data, parada));

  return <div></div>;
}

// toast("O próximo ônibus no ponto " + parada + " em: " + data.parada)

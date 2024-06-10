function calcular() {
  const { peso, altura, idade } = recuperarDados();
  const imc = calcularImc(peso, altura);
  const fatorComorbidade = calcularFatorComorbidade(imc);
  const planoA = calcularPlanoA(idade, imc);
  const planoB = calcularPlanoB(imc, fatorComorbidade);
  exibirResultado(imc);
  compararPlanos(planoA, planoB);
}

function recuperarDados() {
  const peso = document.getElementById('peso').value;
  const altura = document.getElementById('altura').value;
  const idade = document.getElementById('idade').value;
  return { peso, altura, idade };
}

function calcularImc(peso, altura) {
  return (peso / (altura * altura)).toFixed(2);
}

function calcularFatorComorbidade(imc) {
  if (imc < 18.5) {
      return 10;
  } else if (imc >= 18.5 && imc <= 24.99) {
      return 1;
  } else if (imc >= 25 && imc <= 29.99) {
      return 6;
  } else if (imc >= 30 && imc <= 34.99) {
      return 10;
  } else if (imc >= 35 && imc <= 39.99) {
      return 20;
  } else if (imc >= 40) {
      return 30;
  }
}

function calcularPlanoA(idade, imc) {
  const basicoA = (100 + (idade * 10 * (imc / 10))).toFixed(2);
  const standardA = ((150 + (idade * 15)) * (imc / 10)).toFixed(2);
  const premiumA = ((200 - (imc * 10) + (idade * 20)) * (imc / 10)).toFixed(2);
  return { basicoA, standardA, premiumA };
}

function calcularPlanoB(imc, fatorComorbidade) {
  const basicoB = (100 + (fatorComorbidade * 10 * (imc / 10))).toFixed(2);
  const standardB = ((150 + (fatorComorbidade * 15)) * (imc / 10)).toFixed(2);
  const premiumB = ((200 - (imc * 10) + (fatorComorbidade * 20)) * (imc / 10)).toFixed(2);
  return { basicoB, standardB, premiumB };
}

function compararPlanos(planoA, planoB) {
  let planoEmContaA = Math.min(planoA.basicoA, planoA.standardA, planoA.premiumA);
  let nomePlanoA = "";
  if (planoEmContaA == planoA.basicoA) {
      nomePlanoA = "Plano Básico A";
  } else if (planoEmContaA == planoA.standardA) {
      nomePlanoA = "Plano Standard A";
  } else {
      nomePlanoA = "Plano Premium A";
  }
  console.log(`O plano mais em conta da operadora A é o ${nomePlanoA} de R$ ${planoEmContaA}`);

  let planoEmContaB = Math.min(planoB.basicoB, planoB.standardB, planoB.premiumB);
  let nomePlanoB = "";
  if (planoEmContaB == planoB.basicoB) {
      nomePlanoB = "Plano Básico B";
  } else if (planoEmContaB == planoB.standardB) {
      nomePlanoB = "Plano Standard B";
  } else {
      nomePlanoB = "Plano Premium B";
  }
  console.log(`O plano mais em conta da operadora B é o ${nomePlanoB} de R$ ${planoEmContaB}`);

  let planoMaisEmConta = Math.min(planoEmContaA, planoEmContaB);
  let nomePlanoMaisEmConta = planoEmContaA <= planoEmContaB ? nomePlanoA : nomePlanoB;
  console.log(`O plano mais em conta entre as operadoras é o ${nomePlanoMaisEmConta} de R$ ${planoMaisEmConta}`);

  exibirTabelaPlanos(planoA, planoB, nomePlanoA, nomePlanoB, planoEmContaA, planoEmContaB, nomePlanoMaisEmConta, planoMaisEmConta);
}

function exibirResultado(resultado) {
  document.getElementById('resultado').innerHTML = `IMC: ${resultado}`;
}

function exibirTabelaPlanos(planoA, planoB, nomePlanoA, nomePlanoB, planoEmContaA, planoEmContaB, nomePlanoMaisEmConta, planoMaisEmConta) {
  const tabelaPlanos = document.getElementById('tabela-planos');
  tabelaPlanos.innerHTML = `
      <table class="table table-bordered">
          <thead>
              <tr>
                  <th>Operadora</th>
                  <th>Plano Básico</th>
                  <th>Plano Standard</th>
                  <th>Plano Premium</th>
                  <th>Mais em Conta</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>Operadora A</td>
                  <td>R$ ${planoA.basicoA}</td>
                  <td>R$ ${planoA.standardA}</td>
                  <td>R$ ${planoA.premiumA}</td>
                  <td>${nomePlanoA} (R$ ${planoEmContaA})</td>
              </tr>
              <tr>
                  <td>Operadora B</td>
                  <td>R$ ${planoB.basicoB}</td>
                  <td>R$ ${planoB.standardB}</td>
                  <td>R$ ${planoB.premiumB}</td>
                  <td>${nomePlanoB} (R$ ${planoEmContaB})</td>
              </tr>
              <tr>
                  <td colspan="4">Plano mais em conta entre as operadoras</td>
                  <td>${nomePlanoMaisEmConta} (R$ ${planoMaisEmConta})</td>
              </tr>
          </tbody>
      </table>
  `;
}
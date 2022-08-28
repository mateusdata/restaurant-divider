import { useState } from "react";
import ProductForm from "./components/productForm/";

const inicialData = { product: "", total: "", customers: "" };

function App() {
  const [data, setData] = useState([inicialData]);
  const [output, setOutput] = useState({});
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [paySarviceNames, setPaySarviceNames] = useState("");

  const formHandler = (e) => {
    e.preventDefault();
    calculate();
  };

  const removeField = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const addField = () => {
    const updatedData = [...data, { product: "", total: "", customers: "" }];
    setData(updatedData);
  };

  const updateField = (event, index) => {
    const { name, value } = event.target;
    const prevData = [...data];
    prevData[index][name] = value.toUpperCase();
    setData(prevData);
  };

  const calculate = () => {
    let result = {};

    data.forEach((element) => {
      const customersAsArray = [];
      element.customers.split(",").forEach((customerName) => {
        result = { ...result, [customerName.trim()]: 0 };
        customersAsArray.push(customerName.trim());
      });
      element.customers = customersAsArray;
    });

    data.forEach((element) =>
      Object.keys(result).forEach((customerName) => {
        if (element.customers.includes(customerName.trim())) {
          result[customerName] +=
            Number(element.total) / element.customers.length;
        }
      })
    );

    setShowServiceForm(true);
    setOutput(result);
  };

  const calculateService = (e) => {
    e.preventDefault();

    if (paySarviceNames) {
      paySarviceNames.split(",").forEach((customerName) => {
        output[customerName.trim()] += output[customerName.trim()] * 0.1;
      });
    }

    setShowServiceForm(false);
  };

  const clearAll = () => {
    setData([{ product: "", total: "", customers: "" }])
    setOutput({})
    setPaySarviceNames("")
  };

  return (
    <div className="container">
      <h2>Divisor de conta de restaurante</h2>
      <span>Entre com as informações abaixo!</span>


      {!showServiceForm ? (
        <form onSubmit={formHandler}>
          {data.map((fieldValues, index) => (
            <ProductForm
              key={index}
              hasAddButton={index === data.length - 1 ? true : false}
              actionButton={index === data.length - 1 ? addField : removeField}
              values={fieldValues}
              updateField={updateField}
              index={index}
            />
          ))}

          <button
            type="button"
            onClick={clearAll}
          >
            Limpar
          </button>
          <button type="submit">Calcular</button>
        </form>
      ) : (
        <form onSubmit={calculateService}>
          <label htmlFor="payService">
            Informe quem irá pagar a taxa de serviço:
          </label>{" "}
          <br />
          <h5>Opções: {Object.keys(output).join(", ")}</h5>
          <br />
          <input
            type="text"
            name="payService"
            placeholder={`Ex: ${Object.keys(output).join(", ")}`}
            onChange={(e) => setPaySarviceNames(e.target.value.toUpperCase())}
          />
          <button type="submit" className="confirmation">Confirmar</button>
        </form>
      )}

      {Object.keys(output).length !== 0 && !showServiceForm && (
        <div className="result">
          <p>Resultado</p>
          <h3>
            {Object.keys(output).map((customer) => (
              <p>
                {customer}: R$ {output[customer]}
              </p>
            ))}
          </h3>
        </div>
      )}
    </div>
  );
}

export default App;

import { IoAdd } from "react-icons/io5";
import { IoMdTrash } from "react-icons/io";
import "./style.css";

const ProductForm = ({ actionButton, updateField, index, values, hasAddButton }) => {
  return (
    <div className="content">
      <article>
        <label htmlFor="product">Nome do produto: </label>
        <input
          type="text"
          name="product"
          placeholder="Produto"
          required
          value={values.product}
          onChange={(e) => updateField(e, index)}
        />
      </article>

      <article>
        <label htmlFor="total">Valor total: </label>
        <input
          type="number"
          name="total"
          placeholder=""
          required
          value={values.total}
          onChange={(e) => updateField(e, index)}
        />
      </article>

      <article>
        <label htmlFor="customers">Nome dos consumidores: </label>
        <input
          type="text"
          name="customers"
          placeholder="Ex: João, Maria, Pedro"
          required
          value={values.customers}
          onChange={(e) => updateField(e, index)}
        />
      </article>

      {hasAddButton ? (
        <button
          type="button"
          className="actionButton addButton"
          onClick={() => {
            actionButton();
          }}
        >
          <IoAdd size={24} /> Adicionar
        </button>
      ) : (
        <button
          type="button"
          className="actionButton removeButton"
          onClick={() => {
            actionButton(index);
          }}
        >
          <IoMdTrash size={24} /> Remover
        </button>
      )}
    </div>
  );
};

export default ProductForm;

import React, { useState, useEffect } from "react";
import DeveloperDataService from "../services/DeveloperService";

const EditDeveloper = (props) => {
  const [developer, setDeveloper] = useState({
    id: '',
    nome: '',
    sexo: "M",
    hobby: '',
    datanascimento: ''
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = event => {
    const { name, value } = event.target;
    setDeveloper({ ...developer, [name]: value });
  };

  const getDeveloper = () => {
    DeveloperDataService.get(props.match.params.id)
      .then(response => {
        const { data } = response.data;
        setDeveloper(data);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setError('Developer não encontrado!')
        setLoading(false);
      });
  }

  useEffect(getDeveloper, [0]);

  const saveDeveloper = () => {
    setLoading(true);
    setSuccess('');
    setError('');

    DeveloperDataService.update(developer.id,
      {
        nome: developer.nome,
        sexo: developer.sexo,
        hobby: developer.hobby,
        datanascimento: developer.datanascimento
      }
    )
      .then(response => {
        props.history.push('/developers', {
          success: 'Developer atualizado com sucesso!'
        });
      })
      .catch(e => {
        setError('Developer não pode ser salvo!');
        setLoading(false);
        console.log(e);
      });
  };

  return (
    <div>
      {success.length > 0 ? (<div className="alert alert-success">{success}</div>) : (<div></div>)}
      {error.length > 0 ? (<div className="alert alert-danger">{error}</div>) : (<div></div>)}
      {!loading ? (
        <div className="card">
          <div className="card-header">
            <h4 className="card-title m-0">Editar Developer</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-8 form-group">
                <label htmlFor="nome">Nome*</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  required
                  onChange={handleInputChange}
                  name="nome"
                  value={developer.nome}
                />
              </div>
              <div className="col-4 form-group">
                <label htmlFor="sexo">
                  Sexo*
                </label>
                <div className="form-control">
                  <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="sexo-m">
                      <input className="form-check-input" type="radio" name="sexo" id="sexo-m" value="M" onChange={handleInputChange} checked={developer.sexo === "M"} />
                      Masculino
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="sexo-f">
                      <input className="form-check-input" type="radio" name="sexo" id="sexo-f" value="F" onChange={handleInputChange} checked={developer.sexo === "F"} />
                      Feminino
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-9 form-group">
                <label htmlFor="hobby">Hobby*</label>
                <input
                  type="text"
                  className="form-control"
                  id="hobby"
                  required
                  onChange={handleInputChange}
                  name="hobby"
                  value={developer.hobby}
                />
              </div>
              <div className="col-3 form-group">
                <label htmlFor="datanascimento">Data de Nascimento*</label>
                <input
                  type="date"
                  className="form-control"
                  id="datanascimento"
                  required
                  onChange={handleInputChange}
                  name="datanascimento"
                  value={developer.datanascimento}
                />
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="col-4 d-flex justify-content-between ml-auto">
              <button onClick={() => props.history.push('/developers')} className="btn btn-danger w-100 mr-2">
                Cancelar
              </button>
              <button onClick={saveDeveloper} className="btn btn-success w-100">
                Salvar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center h-100 w-100">
          <div className="spinner-border"></div>
        </div>
      )}
    </div>
  );
};

export default EditDeveloper;

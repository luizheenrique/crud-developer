import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import DeveloperDataService from "../services/DeveloperService";
import { useTable } from "react-table";

const ListDevelopers = (props) => {
  const [developers, setDevelopers] = useState([]);
  const [searchNome, setSearchNome] = useState("");
  const developersRef = useRef();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  developersRef.current = developers;

  const onChangeSearchNome = (e) => {
    const searchNome = e.target.value;
    setSearchNome(searchNome);
  };

  const getRequestParams = (searchNome, page) => {
    let params = {
      sort: 'id',
      direction: 'DESC'
    };

    if (searchNome) {
      params["nome"] = searchNome;
    }

    if (page) {
      params["page"] = page - 1;
    }

    return params;
  };

  const retrieveDevelopers = () => {
    const { state : {success = {}, error = {} } = {} } = props.location;
    setSuccess(success);
    setError(error);
    if (!loading) {
      setLoading(true);
    }
    const params = getRequestParams(searchNome, page);

    DeveloperDataService.getAll(params)
      .then((response) => {
        const { data, pagination } = response.data;

        setDevelopers(data);
        setCount(pagination.pages > 1 ? (pagination.pages + 1) : pagination.pages);
        setLoading(false);
        setSuccess('');
        setError('');
        props.location.state = [];
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveDevelopers, [page]);

  const refreshList = () => {
    retrieveDevelopers();
  };

  const findByNome = () => {
    setPage(0);
    retrieveDevelopers();
  };

  const editDeveloper = (rowIndex) => {
    const id = developersRef.current[rowIndex].id;

    props.history.push("/developers/edit/" + id);
  };

  const deleteDeveloper = (rowIndex) => {
    setLoading(true);
    setSuccess('');
    setError('');
    const id = developersRef.current[rowIndex].id;

    DeveloperDataService.remove(id)
      .then((response) => {
        setSuccess('Developer excluído com sucesso!');
        refreshList();
      })
      .catch((e) => {
        setError('Developer não pode ser excluído!');
        setLoading(false);
        console.log(e);
      });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Nome",
        accessor: "nome",
      },
      {
        Header: "Idade",
        accessor: "idade",
      },
      {
        Header: "Sexo",
        accessor: "sexo",
        Cell: (props) => {
          return props.value == "M" ? "Masculino" : "Feminino";
        },
      },
      {
        Header: "Hobby",
        accessor: "hobby",
      },
      {
        Header: "Data de Nascimento",
        accessor: "datanascimento",
        Cell: (props) => {
          return (
            props.value.split('-').reverse().join('/')
          );
        },
      },
      {
        Header: "Ações",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <button className="btn btn-sm btn-warning mr-2" onClick={() => editDeveloper(rowIdx)}>
                <i className="fas fa-pencil-alt text-white"></i>
              </button>

              <button className="btn btn-sm btn-danger" onClick={() => deleteDeveloper(rowIdx)}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: developers,
  });

  return (
    <div>
      {success.length > 0 ? (<div className="alert alert-success">{success}</div>) : (<div></div>)}
      {error.length > 0 ? (<div className="alert alert-danger">{error}</div>) : (<div></div>)}
      <div className="card">
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col-10">
              <h4 className="card-title m-0">Developers</h4>
            </div>
            <div className="col-2">
              <Link to={"/developers/add"} className="btn btn-success btn-block ml-auto">Adicionar</Link>
            </div>
          </div>
        </div>
        <div className="card-body">
          {!loading ? (
            <div>
              <div className="row align-items-end">
                <div className="col-10 form-group">
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    id="nome"
                    className="form-control"
                    value={searchNome}
                    onChange={onChangeSearchNome}
                  />
                </div>
                <div className="col-2 form-group">
                  <button
                    className="btn btn-primary btn-block"
                    type="button"
                    onClick={findByNome}
                  >
                    Buscar
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="table-responsive">
                    <table
                      className="table table-striped table-bordered"
                      {...getTableProps()}
                    >
                      <thead>
                        {headerGroups.map((headerGroup) => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                              <th {...column.getHeaderProps()}>
                                {column.render("Header")}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                          prepareRow(row);
                          return (
                            <tr {...row.getRowProps()}>
                              {row.cells.map((cell) => {
                                return (
                                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 float-right">
                  <Pagination
                    className="my-3"
                    count={count}
                    page={page}
                    siblingCount={1}
                    boundaryCount={1}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="d-flex align-items-center justify-content-center">
              <div className="spinner-border"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListDevelopers;

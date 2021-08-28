import http from "../http-common";

const getAll = (params) => {
  return http.get("/developers", { params });
};

const get = (id) => {
  return http.get(`/developers/${id}`);
};

const create = (data) => {
  return http.post("/developers", data);
};

const update = (id, data) => {
  return http.put(`/developers/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/developers/${id}`);
};

const DeveloperService = {
  getAll,
  get,
  create,
  update,
  remove
};

export default DeveloperService;

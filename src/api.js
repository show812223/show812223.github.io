import axios from "axios";

const dev = false;

const TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6Il9QSm5NVVNxZ3hWSDJXN2I5VElES2ciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE1ODA4NzE2NjEsImV4cCI6MTU4MDg3NTI2MSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5zeW5jb2JveC5jb20iLCJhdWQiOiJwYW5vOmFsbCIsImNsaWVudF9pZCI6InN5bmNvYm94LWFwaS1zd2FnZ2VyIiwic3ViIjoiNjY5ZGQwYWYtNmViMS00ZmM4LThlZmItOTY3MzhkYzcwNmRmIiwiYXV0aF90aW1lIjoxNTgwODcxNjYxLCJpZHAiOiJsb2NhbCIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3R1c2VyIiwidW5pcXVlX25hbWUiOiJ0ZXN0dXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiNjY5ZGQwYWYtNmViMS00ZmM4LThlZmItOTY3MzhkYzcwNmRmIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InRlc3R1c2VyIiwiZW1haWwiOiJ0ZXN0dXNlckB3ZWJpbS5jb20udHciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoidGVzdHVzZXJAd2ViaW0uY29tLnR3Iiwic2NvcGUiOlsicGFubzphbGwiXSwiYW1yIjpbInB3ZCJdfQ.IwTYe685TDvDnA58wOGbOU7zuOh1NDYL9rekPzOcQj4sfOU3PRhn27CJ_e3fp9yvxcqki1Ts_6IPOnIt2T80p41EQkEjL_sPNiaGcXUrua4QGgDQaGda2a-w3EsQ38OlSIres9m4V3q9pduB-9FIX_sLwHrziUbbTLyccuLcJXy55ODkpIZgiI-c-uNnWw57gevkN3FSiaGxXvpp4TrDazm1xzS3a6LfLul4rnOPA4KH3VTXKlBngESthqLe9Tcf84IrIYnlbTL4tMM7j2FQLFs-eqgmYS3HvF4-7NcJBXpinnmEeGXp-iUamrL6dddjBjJjJhfTXrnx5Qc_T0fxog"
const CONFIG = false
  ? {}
  : {
      headers: {
        Authorization: `bearer ${TOKEN}`,
        "Content-Type": "application/json"
      }
    };
const cors = "http://localhost:5000/";
const api_base = dev
  ? "https://localhost:44355"
  : "https://api.syncobox.com";

const api_base_form = `${api_base}/Form`;
const api_base_formFormVersion = `${api_base}/Form`;
const api_base_formVersion = `${api_base}/FormVersion`;
const api_base_formGroup = `${api_base}`;
const api_base_companyFormGroup = `${api_base}/Company`;
const api_base_flow = `${api_base}/Flow`
const api_base_flowVersion = `${api_base}/FlowVersion`

// Form base api
const formRequest = axios.create({
  baseURL: `${api_base_form}`
});
const formFormVersionRequest = axios.create({
  baseURL: `${api_base_formFormVersion}`
});
// FormVersion base api
const formVersionRequest = axios.create({
  baseURL: `${api_base_formVersion}`
})
// FormGroup base api
const formGroupRequest = axios.create({
  baseURL: `${api_base_formGroup}`
});
// Company base api
const CompanyFormGroupRequest = axios.create({
  baseURL: `${api_base_companyFormGroup}`
});

// Flow base api 
const flowRequest = axios.create({
  baseURL: `${api_base_flow}`
})

// FlowVersion base api
const flowVersionRequest = axios.create({
  baseURL: `${api_base_flowVersion}`
})


const FormAPI = {
  get: () => formRequest.get("", CONFIG),
  getById: id => formRequest.get(`${id}`,CONFIG),
  add:(name) => formRequest.post(`?formName=${name}`,JSON.stringify("{}"),CONFIG),
  updateName:(id,data)=> formRequest.put(`${id}/Name`,data,CONFIG),
  delete: id => formRequest.delete(`${id}`,CONFIG)
};
const FormFormVersionAPI = {
  get: id => formFormVersionRequest.get(`${id}/FormVersion`, CONFIG),
  post: (id,data) => formFormVersionRequest.post(`${id}/FormVersion`,data,CONFIG),
  updateSchema:(formId,versionId,data)=> formFormVersionRequest.put(`${formId}/FormVersion/${versionId}`,data,CONFIG)
};

const FormVersionAPI = {
  get: id=> formVersionRequest.get(`?id=${id}`,CONFIG)
}

const FormGroupAPI = {
  get: (companyId,groupId) =>formGroupRequest.get(`/FormGroup?companyId=${companyId}&groupId=${groupId}`, CONFIG)
};

const CompanyFormGroupAPI = {
  get: id => CompanyFormGroupRequest.get(`${id}/FormGroup`, CONFIG)
};

const FlowAPI = {
  get:() =>flowRequest.get("",CONFIG),
  getById:id=> flowRequest.get(`${id}`,CONFIG),
  create:(name)=>flowRequest.post(`?flowName=${name}`,JSON.stringify("{}"),CONFIG),
  delete: id => flowRequest.delete(`${id}`,CONFIG),
  updateName:(id,data)=>flowRequest.put(`${id}/Name`,data,CONFIG),
  appliedVersion:(flowId, versionId)=>flowRequest.put(`${flowId}/AppliedVersion/${versionId}`,JSON.stringify("{}"),CONFIG)
}

const FlowVersion = {
  getById: id => flowVersionRequest.get(`${id}`,CONFIG),
  delete: id => flowVersionRequest.delete(`${id},`,CONFIG),
  create:(data)=>flowVersionRequest.post("",data,CONFIG),
  update: id => flowVersionRequest.post(`/UpdateSchema/${id}`,data,CONFIG),
}


export const API = {
  cors: cors,
  base: api_base,
  form: FormAPI,
  formVersion: FormVersionAPI,
  formFormVersion:FormFormVersionAPI,
  formGroup: FormGroupAPI,
  companyFormGroup: CompanyFormGroupAPI,
  flow: FlowAPI,
  flowVersion:FlowVersion
};

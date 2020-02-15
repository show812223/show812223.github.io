import axios from "axios";

const dev = false;

const TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6Il9QSm5NVVNxZ3hWSDJXN2I5VElES2ciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE1ODE3NDAzNjAsImV4cCI6MTU4MTc0Mzk2MCwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5zeW5jb2JveC5jb20iLCJhdWQiOiJwYW5vOmFsbCIsImNsaWVudF9pZCI6InN5bmNvYm94LWFwaS1zd2FnZ2VyIiwic3ViIjoiNjY5ZGQwYWYtNmViMS00ZmM4LThlZmItOTY3MzhkYzcwNmRmIiwiYXV0aF90aW1lIjoxNTgxNzQwMzYwLCJpZHAiOiJsb2NhbCIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3R1c2VyIiwidW5pcXVlX25hbWUiOiJ0ZXN0dXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiNjY5ZGQwYWYtNmViMS00ZmM4LThlZmItOTY3MzhkYzcwNmRmIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InRlc3R1c2VyIiwiZW1haWwiOiJ0ZXN0dXNlckB3ZWJpbS5jb20udHciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoidGVzdHVzZXJAd2ViaW0uY29tLnR3Iiwic2NvcGUiOlsicGFubzphbGwiXSwiYW1yIjpbInB3ZCJdfQ.Al-wOelObeV5qI-h7DarpZySIRSHJoBvPDsxTFwsJWveEuxAwT3_owUg1BE5-nhwZQ-ZJAkxbd9pGPcyuRalAenu9k6SPE-haSJ917_M1VTZvmsxGue0sJTfCtuIqRRZLeMW3lKy2HlbYhK-4v8YKyTse-YrPnEnesT2W25mMH0AdlzGkI5IATDaZf1KQhuC0WpwXI44EftQaOYCWxVl_3rhQw4XgpOA4UGN34AdoGaML48ymo6lP-IYSFg_-AjqFmTNEF1zpVxvLu4evx_LSOXBRSHh4PJm3M4dq8DGyIepnvTjYj39-t8cGjVB82RaVla-gLYBgtAItfcEEiKVRQ"
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

//Form 相關的 API
const FormAPI = {
  get: () => formRequest.get("", CONFIG),
  getById: id => formRequest.get(`${id}`,CONFIG),
  add:(name) => formRequest.post(`?formName=${name}`,JSON.stringify("{}"),CONFIG),
  updateName:(id,data)=> formRequest.put(`${id}/Name`,data,CONFIG),
  delete: id => formRequest.delete(`${id}`,CONFIG)
};
//FormFormVersion 相關的 API
const FormFormVersionAPI = {
  get: id => formFormVersionRequest.get(`${id}/FormVersion`, CONFIG),
  post: (id,data) => formFormVersionRequest.post(`${id}/FormVersion`,data,CONFIG),
  updateSchema:(formId,versionId,data)=> formFormVersionRequest.put(`${formId}/FormVersion/${versionId}`,data,CONFIG)
};
//formVersion 相關的 API
const FormVersionAPI = {
  get: id=> formVersionRequest.get(`?id=${id}`,CONFIG)
}
//formGroup 相關的 API
const FormGroupAPI = {
  get: (companyId,groupId) =>formGroupRequest.get(`/FormGroup?companyId=${companyId}&groupId=${groupId}`, CONFIG)
};
//CompanyFormGroup 相關的 API
const CompanyFormGroupAPI = {
  get: id => CompanyFormGroupRequest.get(`${id}/FormGroup`, CONFIG)
};
//Flow 相關的 API
const FlowAPI = {
  get:() =>flowRequest.get("",CONFIG),
  getById:id=> flowRequest.get(`${id}`,CONFIG),
  create:(name)=>flowRequest.post(`?flowName=${name}`,JSON.stringify("{}"),CONFIG),
  delete: id => flowRequest.delete(`${id}`,CONFIG),
  updateName:(id,data)=>flowRequest.put(`${id}/Name`,data,CONFIG),
  appliedVersion:(flowId, versionId)=>flowRequest.put(`${flowId}/AppliedVersion/${versionId}`,JSON.stringify("{}"),CONFIG)
}
//FlowVersion 相關的 API
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

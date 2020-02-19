import axios from "axios";
import store from "./store";

const TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6Il9QSm5NVVNxZ3hWSDJXN2I5VElES2ciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE1ODIwOTQ4OTYsImV4cCI6MTU4MjA5ODQ5NiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5zeW5jb2JveC5jb20iLCJhdWQiOiJwYW5vOmFsbCIsImNsaWVudF9pZCI6InN5bmNvYm94LWFwaS1zd2FnZ2VyIiwic3ViIjoiNjY5ZGQwYWYtNmViMS00ZmM4LThlZmItOTY3MzhkYzcwNmRmIiwiYXV0aF90aW1lIjoxNTgyMDk0ODk2LCJpZHAiOiJsb2NhbCIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3R1c2VyIiwidW5pcXVlX25hbWUiOiJ0ZXN0dXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiNjY5ZGQwYWYtNmViMS00ZmM4LThlZmItOTY3MzhkYzcwNmRmIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InRlc3R1c2VyIiwiZW1haWwiOiJ0ZXN0dXNlckB3ZWJpbS5jb20udHciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoidGVzdHVzZXJAd2ViaW0uY29tLnR3Iiwic2NvcGUiOlsicGFubzphbGwiXSwiYW1yIjpbInB3ZCJdfQ.Wpb2vRDzZzz8Ng8xPi_jdh2017uKejTrZBMGuXzgz7rToFKibFiyMlhGcak5f53llNxPWDtoriM8ovTwGLaE2S1MaQ_eVZLeq1UnKWgdzbSijydzznXPrFCIlyPeaTeP7I5LilRqdgSivkp39j9KqexvT_jGl5uGnEzBSJNN1gd6vELFBEYz_rfmbNi8evlKsFu4JSbuAyxbtmBDmQ8QnY-qePuuxULgg2w6es5kM6qXhBSd8pcHm7B3nWZCnWmv-qLJ9i5Kz72Zk284tcOAqyC4-7JlT0v1DCODWbzlPnjI0Bx-PBbREIymXXsrSoMYCG9yKvCjoxx3DCcfHN5QHA";

const CONFIG = {
  headers: {
    Authorization: `bearer ${TOKEN}`,
    "Content-Type": "application/json"
  }
};

const BLOBCONFIG = {
  headers: {
    Authorization: `bearer ${TOKEN}`
  },
  responseType: "blob"
};

const api_base = "https://api.syncobox.com";
const api_base_test = `${api_base}/v1/Test`;
const api_base_pano = `${api_base}/Panorama`;
const api_base_map = `${api_base}/PanoramaMap`;
const api_base_panoVer = `${api_base}/PanoramaVersion`;

const api_base_form = `${api_base}/Form`;
const api_base_formFormVersion = `${api_base}/Form`;
const api_base_formVersion = `${api_base}/FormVersion`;
const api_base_formGroup = `${api_base}`;
const api_base_companyFormGroup = `${api_base}/Company`;
const api_base_company = `${api_base}/Company`;
const api_base_flow = `${api_base}/Flow`;
const api_base_flowVersion = `${api_base}/FlowVersion`;

// Panorama base api
const panoRequest = axios.create({
  baseURL: `${api_base_pano}`
});

// Map base api
const mapRequest = axios.create({
  baseURL: `${api_base_map}`
});

// Panorama Version base api
const panoVersionRequest = axios.create({
  baseURL: `${api_base_panoVer}`
});

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
});
// FormGroup base api
const formGroupRequest = axios.create({
  baseURL: `${api_base_formGroup}`
});
// CompanyFormGroup base api
const CompanyFormGroupRequest = axios.create({
  baseURL: `${api_base_companyFormGroup}`
});
//Company api
const companyRequest = axios.create({
    baseURL: `${api_base_company}`
});
// Flow base api
const flowRequest = axios.create({
  baseURL: `${api_base_flow}`
});
// FlowVersion base api
const flowVersionRequest = axios.create({
  baseURL: `${api_base_flowVersion}`
});

// pano 相關的 URL
const PanoAPIURL = {
  get: `${api_base_pano}`,
  updatePano: `${api_base_pano}`,
  delete: `${api_base_pano}`,
  getByProject: `${api_base_pano}/GetByProject`,
  getByUser: `${api_base_pano}/GetByUser`,
  getPanoFiles: `${api_base_pano}/GetPanoFiles`,
  getImage: `${api_base_pano}/GetImage`,
  updateVer: `${api_base_pano}/ApplyVersion`,
  add: `${api_base_pano}`,
  updateHotspots: `${api_base_pano}/UpdateHotspots/`
};

// pano 相關的 API
const PanoAPI = {
  get: id => panoRequest.get(`${id}`, CONFIG),
  updatePano: (id, data) => panoRequest.put(`${id}`, data, CONFIG),
  delete: id => panoRequest.delete(`${id}`, CONFIG),
  getByProject: (id, data) =>
    panoRequest.post(`/GetByProject/${id}`, data, CONFIG),
  getByUser: id => panoRequest.get(`/GetByUser/${id}`, CONFIG),
  getPanoFiles: id => panoRequest.get(`/GetPanoFiles/${id}`, CONFIG),
  getImage: (id, name) =>
    panoRequest.get(`/GetImage/${id}/${name}`, BLOBCONFIG),
  updateVersion: data => panoRequest.put(`/ApplyVersion`, data, CONFIG),
  add: (data, config) =>
    panoRequest.post("", data, {
      ...config,
      ...CONFIG
    }),
  updateHotspots: (id, data) =>
    panoRequest.post(`/UpdateHotspots/${id}`, data, CONFIG)
};

// Map 相關的 url
const MapAPIURL = {
  get: `${api_base_map}`,
  updateInfo: `${api_base_map}`,
  delete: `${api_base_map}`,
  getImage: `${api_base_map}/GetImage`,
  getThumb: `${api_base_map}/GetThumbnail`,
  getByProject: `${api_base_map}/GetByProject`,
  add: `${api_base_map}`,
  updateHotspots: `${api_base_map}/UpdateHotspots`,
  updateImage: `${api_base_map}/UpdateImage`
};

// Map 相關的 api
const MapAPI = {
  get: id => mapRequest.get(`${id}`, CONFIG),
  updateInfo: (id, data) => mapRequest.put(`${id}`, data, CONFIG),
  delete: id => mapRequest.delete(`${id}`, CONFIG),
  getImage: id => mapRequest.get(`/GetImage/${id}`, CONFIG),
  getThumb: id => mapRequest.get(`/GetThumbnail/${id}`, CONFIG),
  getByProject: (id, data) =>
    mapRequest.post(`/GetByProject/${id}`, data, CONFIG),
  add: (data, config) => mapRequest.post("", data, config, CONFIG),
  updateHotspots: (id, data) =>
    mapRequest.post(`/UpdateHotspots/${id}`, data, CONFIG),
  updateImage: (data, config) =>
    mapRequest.post(`/UpdateImage`, data, {
      ...config,
      ...CONFIG
    })
};

//pano版本api
const VersionAPI = {
  get: id => panoVersionRequest.get(`${id}`, CONFIG),
  delete: id => panoVersionRequest.delete(`${id}`, CONFIG),
  getList: (id, data) =>
    panoVersionRequest.post(`/GetByPano/${id}`, data, CONFIG),
  add: (data, config) =>
    panoVersionRequest.post("", data, {
      ...config,
      ...CONFIG
    })
};

//測試用api
const TestApis = {
  noauth: `${api_base_test}/noauth`,
  hasauth: `${api_base_test}/hasauth`
};

//Form 相關的 API
const FormAPI = {
  getAll: () => formRequest.get("", CONFIG),
  get: formId => formRequest.get(`${formId}`, CONFIG),
  add: name =>
    formRequest.post(`?formName=${name}`, JSON.stringify("{}"), CONFIG),
  updateName: (id, data) => formRequest.put(`${id}/Name`, data, CONFIG),
  delete: id => formRequest.delete(`${id}`, CONFIG)
};
//FormFormVersion 相關的 API
const FormFormVersionAPI = {
  get: id => formFormVersionRequest.get(`${id}/FormVersion`, CONFIG),
  post: (id, data) =>
    formFormVersionRequest.post(`${id}/FormVersion`, data, CONFIG),
  updateSchema: (formId, versionId, data) =>
    formFormVersionRequest.put(
      `${formId}/FormVersion/${versionId}`,
      data,
      CONFIG
    )
};
//formVersion 相關的 API
const FormVersionAPI = {
  get: id => formVersionRequest.get(`?id=${id}`, CONFIG)
};
//formGroup 相關的 API
const FormGroupAPI = {
  get: (companyId, groupId) =>
    formGroupRequest.get(
      `/FormGroup?companyId=${companyId}&groupId=${groupId}`,
      CONFIG
    ),
  post: (companyId, parentId) =>
    formgroupRequest.post(companyId, parentId, CONFIG),
  put: (formGroupId, parentId) =>
    formgroupRequest.put(formGroupId, parentId, CONFIG)
};
//CompanyFormGroup 相關的 API
const CompanyFormGroupAPI = {
  get: id => CompanyFormGroupRequest.get(`${id}/FormGroup`, CONFIG)
};
//Flow 相關的 API
const FlowAPI = {
  get: () => flowRequest.get("", CONFIG),
  getById: id => flowRequest.get(`${id}`, CONFIG),
  create: name =>
    flowRequest.post(`?flowName=${name}`, JSON.stringify("{}"), CONFIG),
  delete: id => flowRequest.delete(`${id}`, CONFIG),
  updateName: (id, data) => flowRequest.put(`${id}/Name`, data, CONFIG),
  appliedVersion: (flowId, versionId) =>
    flowRequest.put(
      `${flowId}/AppliedVersion/${versionId}`,
      JSON.stringify("{}"),
      CONFIG
    )
};
//FlowVersion 相關的 API
const FlowVersion = {
  getById: id => flowVersionRequest.get(`${id}`, CONFIG),
  delete: id => flowVersionRequest.delete(`${id},`, CONFIG),
  create: data => flowVersionRequest.post("", data, CONFIG),
  postUpdate: (id, data) => flowVersionRequest.post(`/UpdateSchema/${id}`, data, CONFIG)
};

const CompanyAPI = {
    get:()=>companyRequest.get("", CONFIG),
    get: companyId => CompanyFormGroupRequest.get(`${companyId}`, CONFIG),
}

//輸出
export default {
  cors: "",
  base: api_base,
  pano: PanoAPI,
  pano_url: PanoAPIURL,
  map: MapAPI,
  map_url: MapAPIURL,
  version: VersionAPI,
  test: TestApis,
  form: FormAPI,
  formVersion: FormVersionAPI,
  formFormVersion: FormFormVersionAPI,
  formGroup: FormGroupAPI,
  companyFormGroup: CompanyFormGroupAPI,
  company:CompanyAPI,
  flow: FlowAPI,
  flowVersion: FlowVersion //跟上一條flowVersion相同功能(其昌)
};

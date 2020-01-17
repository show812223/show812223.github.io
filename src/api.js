import axios from "axios";

const dev = false;

const TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6Il9QSm5NVVNxZ3hWSDJXN2I5VElES2ciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE1NzkyNTIwNTcsImV4cCI6MTU3OTI1NTY1NywiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5zeW5jb2JveC5jb20iLCJhdWQiOiJwYW5vOmFsbCIsImNsaWVudF9pZCI6InBvcnRhbC1zcGEiLCJzdWIiOiI2NjlkZDBhZi02ZWIxLTRmYzgtOGVmYi05NjczOGRjNzA2ZGYiLCJhdXRoX3RpbWUiOjE1NzkyNTIwNTEsImlkcCI6ImxvY2FsIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidGVzdHVzZXIiLCJ1bmlxdWVfbmFtZSI6InRlc3R1c2VyIiwiZW1haWwiOiJ0ZXN0dXNlckB3ZWJpbS5jb20udHciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwic2NvcGUiOlsicHJvZmlsZSIsIm9wZW5pZCIsInBhbm86YWxsIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.IitKvR4QtCQlnBQoIC7mcdxwstChGtvGpUf_yCbyrv5PFxNpQvsuhrT1PdlgpfeiQox6Nds71Kp1uYe6f5DXJ9wNhlgUPwPNSdv5mTnhZjj9V_rUWdLYlmLMlvIegIdV18JITomDcRZGyXfg1mmIrxDuEM4BA4ANgAjdH0coosN_VjZXVXe22FS9XwGh_wGdolgFdx4xWF1XpVOKN5NL_NipLBHpd7BoPlDaaGs3Dci-evNvDkyupkaHKLBkB87WwIElrmQg_ooSgUlHVuQgb0L83ffndHu7goIvVE4gCljvE7sEX3whnbl6tAIxVX35IPk8l_s8B5J0p7-2uTUyTA"
const CONFIG = dev
  ? {}
  : {
      headers: {
        Authorization: `bearer ${TOKEN}`
      }
    };

const cors = "http://localhost:5000/";
const api_base = dev
  ? `${cors}http://9358f2f6.ngrok.io`
  : "https://api.syncobox.com";
const api_base_pano = `${api_base}/Panorama`;
const api_base_map = `${api_base}/PanoramaMap`;
const api_base_panoVer = `${api_base}/PanoramaVersion`;

const api_base_form = `${api_base}/Form`;
const api_base_formFormVersion = `${api_base}/Form`;
const api_base_formGroup = `${api_base}/FormGroup`;
const api_base_companyFormGroup = `${api_base}/Company`;

// Form base api
const formRequest = axios.create({
  baseURL: `${api_base_form}`
});
const formFormVersionRequest = axios.create({
  baseURL: `${api_base_formFormVersion}`
});
// FormGroup base api
const formGroupRequest = axios.create({
  baseURL: `${api_base_formGroup}`
});
// Company base api
const CompanyFormGroupRequest = axios.create({
  baseURL: `${api_base_companyFormGroup}`
});

const FormAPI = {
  get: () => formRequest.get("", CONFIG)
};
const FormFormVersionAPI = {
  get: id => formFormVersionRequest.get(`${id}/FormVersion`, CONFIG),
  post: (id,data) => formFormVersionRequest.post(`${id}/FormVerson`,data,CONFIG)
};

const FormGroupAPI = {
  get: (companyId, groupId) =>
    formGroupRequest.get(`?companyId=${companyId}&groupId=${groupId}`, CONFIG)
};

const CompanyFormGroupAPI = {
  get: id => CompanyFormGroupRequest.get(`${id}/FormGroup`, CONFIG)
};

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

const PanoAPI = {
  get: id => panoRequest.get(`${id}`, CONFIG),
  updatePano: (id, data) => panoRequest.put(`${id}`, data, CONFIG),
  delete: id => panoRequest.delete(`${id}`, CONFIG),
  getByProject: (id, data) =>
    panoRequest.post(`/GetByProject/${id}`, data, CONFIG),
  getByUser: id => panoRequest.get(`/GetByUser/${id}`, CONFIG),
  getPanoFiles: id => panoRequest.get(`/GetPanoFiles/${id}`, CONFIG),
  getImage: (id, name) => panoRequest.get(`/GetImage/${id}/${name}`, CONFIG),
  updateVersion: data => panoRequest.put(`/ApplyVersion`, data, CONFIG),
  add: (data, config) =>
    panoRequest.post("", data, {
      ...config,
      ...CONFIG
    }),
  updateHotspots: (id, data) =>
    panoRequest.post(`/UpdateHotspots/${id}`, data, CONFIG)
};

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

export const API = {
  cors: cors,
  base: api_base,
  pano: PanoAPI,
  pano_url: PanoAPIURL,
  map: MapAPI,
  map_url: MapAPIURL,
  version: VersionAPI,
  form: FormAPI,
  formFormVersion:FormFormVersionAPI,
  formGroup: FormGroupAPI,
  companyFormGroup: CompanyFormGroupAPI
};

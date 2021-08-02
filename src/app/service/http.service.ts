import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  sprBootBaseUrl:string="http://10.97.86.155:9000";
  constructor(private httpClient: HttpClient) { }

  getPatientResourceByQueryParam(baseResource: string, queryParams: string) {
    return this.httpClient.get(environment.queryURI + '/' + baseResource +  queryParams).toPromise();
  }


  getObservationResourceByQueryParam(baseResource: string, queryParams: string) {
    return this.httpClient.get(environment.queryURI + '/' + baseResource +  queryParams).toPromise();
  }
   postDataToDoctors(patientId) {
     const baseURI="http://hapi.fhir.org/baseR4";
     const uri= this.sprBootBaseUrl+"/publish?baseURI="+baseURI+"&patientId="+patientId;
    // const uri="http://10.21.219.122:9000/publish?message=http://hapi.fhir.org/baseR4/Observation?patient=Patient/2438175";
    return this.httpClient.post(uri, null).toPromise();
  } 

  postDataQuestionaire(a:any) {
   const uri= this.sprBootBaseUrl+"/smartDiagnosis";
   return this.httpClient.post(uri, a).toPromise();
 } 


  getDataFromPatients(){
   return this.httpClient.get(this.sprBootBaseUrl+"/patient").toPromise();
  }
}

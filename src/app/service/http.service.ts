import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  getPatientResourceByQueryParam(baseResource: string, queryParams: string) {
    return this.httpClient.get(environment.queryURI + '/' + baseResource +  queryParams).toPromise();
  }


  getObservationResourceByQueryParam(baseResource: string, queryParams: string) {
    return this.httpClient.get(environment.queryURI + '/' + baseResource +  queryParams).toPromise();
  }
   postDataToDoctors(patientId) {
     const baseURI="http://hapi.fhir.org/baseR4";
     const uri= "http://10.21.80.181:9000/publish?baseURI="+baseURI+"&patientId="+patientId;
    // const uri="http://10.21.219.122:9000/publish?message=http://hapi.fhir.org/baseR4/Observation?patient=Patient/2438175";
    return this.httpClient.post(uri, null).toPromise();
  } 

  getDataFromPatients(){
  // return this.httpClient.get("http://10.21.80.181:9000/patient").toPromise();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://127.0.0.1:8001/api';

@Injectable({
  providedIn: 'root',
})
export class DemandeService {
  constructor(private http: HttpClient) {}

  getDemandes(): Observable<any> {
    return this.http.get<any>(`${AUTH_API}/demandes`);
  }

  createDemande(demandeData: any): Observable<any> {
    return this.http.post<any>(`${AUTH_API}/demandes`, demandeData);
  }

  getDemandeById(id: number): Observable<any> {
    return this.http.get<any>(`${AUTH_API}/demandes/${id}`);
  }

  updateDemande(id: number, demandeData: any): Observable<any> {
    return this.http.put<any>(`${AUTH_API}/demandes/${id}`, demandeData);
  }

  deleteDemande(id: number): Observable<any> {
    return this.http.delete<any>(`${AUTH_API}/demandes/${id}`);
  }

  updateDemandeEtat(id: number, etatData: { etat: boolean }): Observable<any> {
    return this.http.put<any>(
      `${AUTH_API}/demandes/${id}/updateEtat`,
      etatData
    );
  }

  

  postStockerConteneur(Id: number, body: any): Observable<any> {
    const url = `${AUTH_API}/stockerContainer/${Id}`; // Adjust endpoint as needed
    return this.http.put<any>(url, body);
  }

  postStockerConteneurTransformer(Id: number, body: any): Observable<any> {
    const url = `${AUTH_API}/StockerConteneurTransformer/${Id}`; // Adjust endpoint as needed
    return this.http.put<any>(url, body);
  }
}
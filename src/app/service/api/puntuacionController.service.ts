/**
 * Api Comprathor
 * Utilizacion Api Rest
 *
 * OpenAPI spec version: V1
 * Contact: www.naxer.es
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { Puntuacion } from '../model/puntuacion';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class PuntuacionControllerService {

    protected basePath = 'https://localhost:8080';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * crearPuntuacion
     *
     * @param puntuacion puntuacion
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public crearPuntuacionUsingPOST(puntuacion: Puntuacion, observe?: 'body', reportProgress?: boolean): Observable<Puntuacion>;
    public crearPuntuacionUsingPOST(puntuacion: Puntuacion, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Puntuacion>>;
    public crearPuntuacionUsingPOST(puntuacion: Puntuacion, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Puntuacion>>;
    public crearPuntuacionUsingPOST(puntuacion: Puntuacion, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (puntuacion === null || puntuacion === undefined) {
            throw new Error('Required parameter puntuacion was null or undefined when calling crearPuntuacionUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<Puntuacion>(`${this.basePath}/puntuacion`,
            puntuacion,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getAllPuntuacionPorID
     *
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllPuntuacionPorIDUsingGET(id: number, observe?: 'body', reportProgress?: boolean): Observable<Array<Puntuacion>>;
    public getAllPuntuacionPorIDUsingGET(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Puntuacion>>>;
    public getAllPuntuacionPorIDUsingGET(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Puntuacion>>>;
    public getAllPuntuacionPorIDUsingGET(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getAllPuntuacionPorIDUsingGET.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<Puntuacion>>(`${this.basePath}/puntuacion/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}

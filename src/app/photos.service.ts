import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(
    private http:HttpClient
  ) { }

  getPhotos(pageIndex,limit){
    return this.http.get(`${environment.jsonPlaceholderBaseUrl}/photos?_limit=${limit}&_page=${pageIndex}`);
  }
}

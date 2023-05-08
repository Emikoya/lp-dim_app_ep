import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Spell } from '../models/spell';

@Injectable()
export class SpellService {

  constructor(private http: HttpClient) { }


 get() : Observable<Spell[]>{
   return this.http.get<Spell[]>(environment.iutApiBaseUrl+"/spells");
 }

 delete(id: number): Observable<string>{
  return this.http.delete<string>(environment.iutApiBaseUrl+"/spells/"+id);
}

update(spell: Spell): Observable<string>{
  return this.http.put<string>(environment.iutApiBaseUrl+"/spells/"+spell.id, spell);
}

create(spell: Spell): Observable<string>{
  return this.http.post<string>(environment.iutApiBaseUrl+"/spells", spell);
}

getById(id:number): Observable<Spell>{
  return this.http.get<Spell>(environment.iutApiBaseUrl+"/spells/"+id);
}
}

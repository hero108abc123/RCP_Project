import { ICreateRoom, IFindPagingRoom, IUpdateRoom } from "@/models/rcp/room.models";
import { IBaseResponseWithData } from "@/shared/models/request-paging.base.models";
import { query } from "@angular/animations";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class RoomService{
    api = '/api/app/room';
    http = inject(HttpClient);

    create (body: ICreateRoom){
        return this.http.post<IBaseResponseWithData<any>>(`${this.api}`, body);
    }

    update (body: IUpdateRoom){
        return this.http.put<IBaseResponseWithData<any>>(`${this.api}`,body);
    }

    delete (id:number){
        return this.http.delete<IBaseResponseWithData<any>>(`${this.api}/${id}`)
    }

    findPaging (query: IFindPagingRoom){
        const params ={ 
            pageNumber: query.pageNumber,
            pageSize: query.pageSize,
            keyword: query.keyword || ''
        };
        return this.http.get<IBaseResponseWithData<any>> (`${this.api}`, {params});
    }

    findById (idCinema:number, id: number){
         return this.http.get<IBaseResponseWithData<any>>(`${this.api}/${id}/cinema/${idCinema}`)
    }
}


import { IAddPhim, IFindPagingLichChieu, IUpdateLichChieu } from "@/models/rcp/lich-chieu.models";

import { IBaseResponseWithData } from "@/shared/models/request-paging.base.models";
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class LichChieuService{
    api = '/api/app/lich-chieu';
    http = inject(HttpClient);
    addPhimToRoomRCP(body:IAddPhim){
        return this.http.post<IBaseResponseWithData<any>> (`${this.api}`, body);
    }
    
    updatePhimToRoomRCP(body:IUpdateLichChieu){
        return this.http.put<IBaseResponseWithData<any>> (`${this.api}`, body);
    }
    
    deletePhimToRoomRCP(id:number){
        return this.http.delete<IBaseResponseWithData<any>> (`${this.api}/${id}`);
    }
    
    findPagingPhimRoomRCP(query:IFindPagingLichChieu){
        const params: any = { 
            pageNumber: query.pageNumber,
            pageSize: query.pageSize,
            keyword: query.keyword || ''
        };
    
        if (query.idCinema) params.idCinema = query.idCinema;
        if (query.idRoom) params.idRoom = query.idRoom;
        if (query.idTheLoai) params.idTheLoai = query.idTheLoai;
        if (query.tuNgay) params.tuNgay = query.tuNgay;
        if (query.denNgay) params.denNgay = query.denNgay;

        return this.http.get<IBaseResponseWithData<any>>(`${this.api}`, { params  });
    }   
    getById(id:number){
         return this.http.get<IBaseResponseWithData<any>> (`${this.api}/${id}`);
    }
}
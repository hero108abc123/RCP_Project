import { IAddPhim, IDeletePhimByRoom, IFindPagingPhimByRoom, IUpdatePhimByRoom } from "@/models/rcp/movie.models";
import { ICreateRCP, IFindPagingRCP, IUpdateRCP } from "@/models/rcp/rcp.models";
import { IBaseResponsePaging, IBaseResponseWithData } from "@/shared/models/request-paging.base.models";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class RCPService {
    api = '/api/app/cinema';
    http = inject(HttpClient);

    create(body: ICreateRCP) {
        const formData = new FormData();
    
        if (body.name) formData.append('Name', body.name);
        if (body.location) formData.append('Location', body.location);
        if (body.city) formData.append('City', body.city);
        if (body.district) formData.append ('District', body.district);
        if (body.soLuongPhongChieu !== undefined) formData.append('SoLuongPhongChieu', body.soLuongPhongChieu.toString());
        if (body.fileAnhCinema) formData.append('FileAnhCinema', body.fileAnhCinema);

        return this.http.post<IBaseResponseWithData<any>>(`${this.api}`, formData);
    }

    update(body: IUpdateRCP){
        const formData = new FormData();
        if (body.id) formData.append('Id', body.id.toString());
        if (body.name) formData.append('Name', body.name);
        if (body.location) formData.append('Location', body.location);
        if (body.city) formData.append('City', body.city);
        if (body.district) formData.append ('District', body.district);
        if (body.soLuongPhongChieu !== undefined) formData.append('SoLuongPhongChieu', body.soLuongPhongChieu.toString());
        if (body.fileAnhCinema) formData.append('FileAnhCinema', body.fileAnhCinema);
        return this.http.put<IBaseResponseWithData<any>>(`${this.api}`, formData);
    }

    delete(id: number){
        return this.http.delete<IBaseResponseWithData<any>>(`${this.api}/${id}`);
    }

    findPaging(query: IFindPagingRCP){
        const params = { 
            pageNumber: query.pageNumber,
            pageSize: query.pageSize,
            keyword: query.keyword || ''
        };

        return this.http.get<IBaseResponseWithData<any>>(`${this.api}`, { params  });
    }

    findById (id:number){
        return this.http.get<IBaseResponseWithData<any>>(`${this.api}/${id}`);
    }

    addPhimToRoomRCP(body:IAddPhim){
        return this.http.post<IBaseResponseWithData<any>> (`${this.api}/phim-to-cinema`, body);
    }

    updatePhimToRoomRCP(body:IUpdatePhimByRoom){
        return this.http.put<IBaseResponseWithData<any>> (`${this.api}/phim-to-cinema`, body);
    }

    deletePhimToRoomRCP(id:number){
        return this.http.delete<IBaseResponseWithData<any>> (`${this.api}/phim-to-cinema/${id}`);
    }

    findPagingPhimRoomRCP(query:IFindPagingPhimByRoom){
        const params = { 
            idCinema : query.idCinema,
            idRoom:query.idRoom,
            pageNumber: query.pageNumber,
            pageSize: query.pageSize,
            keyword: query.keyword || ''
        };

        return this.http.get<IBaseResponseWithData<any>>(`${this.api}/phim-to-cinema`, { params  });
    }
    
    
}
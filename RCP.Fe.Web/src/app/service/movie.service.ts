import { IGetDropDownPhim } from "@/models/movie/movie.models";
import { IGetDropDownTheLoai } from "@/models/rcp/movie.models";

import { IBaseResponseWithData } from "@/shared/models/request-paging.base.models";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PhimService{
    api = '/api/app/phim';
    http = inject(HttpClient);

    getDropDown(){
        return this.http.get<IBaseResponseWithData<IGetDropDownPhim[]>>(`${this.api}/dropdown`);
    }

    getTheLoai(){
        return this.http.get<IBaseResponseWithData<IGetDropDownTheLoai[]>>(`${this.api}/the-loai/dropdown`);
    }
}


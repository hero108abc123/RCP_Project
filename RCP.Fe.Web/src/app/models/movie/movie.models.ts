export interface IGetDropDownPhim {
    id: number;
    tenPhim: string;
}

export interface IViewPhim {
    id: number;
    tenPhim: string;
    moTa?: string;
    daoDien?: string;
    dienVien?: string;
    thoiLuongPhut: number;
    ngayKhoiChieu: string;
    ngonNgu?: string;
    phanLoaiDoTuoi?: string;
}

export interface IUpdatePhim {
    id?: number;
    tenPhim?: string;
    moTa?: string;
    daoDien?: string;
    dienVien?: string;
    thoiLuongPhut?: number;
    ngayKhoiChieu?: Date;
    ngonNgu?: string;
    phanLoaiDoTuoi?: string;
    dangChieu?: boolean;
}

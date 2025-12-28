export interface IProvince {
    id: string;
    province_code: string;
    name: string;
    short_name: string;
    code: string;
    place_type: string;
    country: string;
    created_at: string | null;
    updated_at: string | null;
}

export interface IProvinceOptions {
    label: string;
    value: string;
    code: string;
}

export interface IWard {
    id: string;
    ward_code: string;
    name: string;
    province_code: string;
    created_at: string | null;
    updated_at: string | null;
}

export interface IDistrictOption {
    label: string;
    value: string;
}
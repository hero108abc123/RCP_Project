export class NgayStatuses {
    static NGAYTHUONG = 1;
    static CUOITUAN = 2;
    static NGAYLE = 3;

    static getLabel(status: number): string {
        switch (status) {
            case NgayStatuses.NGAYTHUONG:
                return 'Ngày Thường';
            case NgayStatuses.CUOITUAN:
                return 'Cuối tuần';
            case NgayStatuses.NGAYLE:
                return 'Ngày lễ';
            default:
                return 'Không xác định';
        }
    }
    

    static getSeverity(status: number): string {
        switch (status) {
            case NgayStatuses.NGAYTHUONG:
                return 'info';
            case NgayStatuses.CUOITUAN:
                return 'success';
            case NgayStatuses.NGAYLE:
                return 'secondary';
            default:
                return 'warn';
        }
    }
}
export class LoaiMonStatuses {
    static DON = 1;
    static COMBO = 2;

    static getLabel(loai: number): string {
        switch (loai) {
            case LoaiMonStatuses.DON:
                return 'Đơn';
            case LoaiMonStatuses.COMBO:
                return 'Combo';
            default:
                return 'Không xác định';
        }
    }

    static getSeverity(loai: number): string {
        switch (loai) {
            case LoaiMonStatuses.DON:
                return 'info';
            case LoaiMonStatuses.COMBO:
                return 'success';
            default:
                return 'contrast';
        }
    }

    static getAllLoai(): Array<{ value: number; label: string }> {
        return [
            { value: LoaiMonStatuses.DON, label: LoaiMonStatuses.getLabel(LoaiMonStatuses.DON) },
            { value: LoaiMonStatuses.COMBO, label: LoaiMonStatuses.getLabel(LoaiMonStatuses.COMBO) }
        ];
    }
}
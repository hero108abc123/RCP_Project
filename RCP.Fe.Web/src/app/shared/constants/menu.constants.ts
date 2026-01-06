export class MenuStatuses {
    static CON_HANG = 1;
    static HET_HANG = 2;

    static getLabel(trangThai: number): string {
        switch (trangThai) {
            case MenuStatuses.CON_HANG:
                return 'Còn hàng';
            case MenuStatuses.HET_HANG:
                return 'Hết hàng';
            default:
                return 'Không xác định';
        }
    }

    static getSeverity(trangThai: number): string {
        switch (trangThai) {
            case MenuStatuses.CON_HANG:
                return 'success';
            case MenuStatuses.HET_HANG:
                return 'danger';
            default:
                return 'contrast';
        }
    }

    static getAllTrangThai(): Array<{ value: number; label: string }> {
        return [
            { value: MenuStatuses.CON_HANG, label: MenuStatuses.getLabel(MenuStatuses.CON_HANG) },
            { value: MenuStatuses.HET_HANG, label: MenuStatuses.getLabel(MenuStatuses.HET_HANG) }
        ];
    }
}
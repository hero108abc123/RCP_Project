export class GheStatuses {
    static THUONG = 1;
    static DOI = 2;

    static getLabel(status: number): string {
        switch (status) {
            case GheStatuses.THUONG:
                return 'Thường';
            case GheStatuses.DOI:
                return 'Đôi';
            default:
                return 'Không xác định';
        }
    }

    static getSeverity(status: number): string {
        switch (status) {
            case GheStatuses.THUONG:
                return 'info';
            case GheStatuses.DOI:
                return 'success';
            default:
                return 'secondary';
        }
    }
}
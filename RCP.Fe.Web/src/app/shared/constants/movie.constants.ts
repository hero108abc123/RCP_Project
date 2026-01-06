export class PhanLoaiDoTuoiStatuses {
    static P = 'P';
    static K = 'K';
    static T13 = 'T13';
    static C13 = 'C13';
    static T16 = 'T16';
    static C16 = 'C16';
    static T18 = 'T18';
    static C18 = 'C18';
    static C = 'C';

    static getLabel(status: string): string {
        switch (status) {
            case PhanLoaiDoTuoiStatuses.P:
                return 'P - Mọi lứa tuổi';
            case PhanLoaiDoTuoiStatuses.K:
                return 'K - Trẻ em có phụ huynh';
            case PhanLoaiDoTuoiStatuses.T13:
                return 'T13 - Từ 13 tuổi';
            case PhanLoaiDoTuoiStatuses.C13:
                return 'C13 - Từ 13 tuổi';
            case PhanLoaiDoTuoiStatuses.T16:
                return 'T16 - Từ 16 tuổi';
            case PhanLoaiDoTuoiStatuses.C16:
                return 'C16 - Từ 16 tuổi';
            case PhanLoaiDoTuoiStatuses.T18:
                return 'T18 - Từ 18 tuổi';
            case PhanLoaiDoTuoiStatuses.C18:
                return 'C18 - Từ 18 tuổi';
            case PhanLoaiDoTuoiStatuses.C:
                return 'C - Cấm chiếu';
            default:
                return 'Không giới hạn';
        }
    }

    static getSeverity(status: string): string {
        switch (status) {
            case PhanLoaiDoTuoiStatuses.P:
                return 'success';
            case PhanLoaiDoTuoiStatuses.K:
                return 'info';
            case PhanLoaiDoTuoiStatuses.T13:
            case PhanLoaiDoTuoiStatuses.C13:
                return 'warning';
            case PhanLoaiDoTuoiStatuses.T16:
            case PhanLoaiDoTuoiStatuses.C16:
                return 'warn';
            case PhanLoaiDoTuoiStatuses.T18:
            case PhanLoaiDoTuoiStatuses.C18:
                return 'danger';
            case PhanLoaiDoTuoiStatuses.C:
                return 'secondary';
            default:
                return 'contrast';
        }
    }
}

export class DangChieuStatuses {
    static DACHIEU = 1;
    static CHUACHIEU = 2;
    static DANGCHIEU = 3;

    static getLabel(status: number): string {
        switch (status) {
            case DangChieuStatuses.DACHIEU:
                return 'Đã chiếu';
            case DangChieuStatuses.CHUACHIEU:
                return 'Chưa chiếu';
            case DangChieuStatuses.DANGCHIEU:
                return 'Đang chiếu';
            default:
                return 'Không xác định';
        }
    }

    static getSeverity(status: number): string {
        switch (status) {
            case DangChieuStatuses.DACHIEU:
                return 'secondary';
            case DangChieuStatuses.CHUACHIEU:
                return 'warn';
            case DangChieuStatuses.DANGCHIEU:
                return 'success';
            default:
                return 'contrast';
        }
    }

    
}
// constants/ngon-ngu.constants.ts
export class NgonNguStatuses {
    static VI = 'vi';
    static EN = 'en';
    static ZH = 'zh';
    static JA = 'ja';
    static KO = 'ko';
    static FR = 'fr';
    static DE = 'de';
    static ES = 'es';
    static IT = 'it';
    static RU = 'ru';
    static TH = 'th';
    static ID = 'id';
    static PT = 'pt';
    static AR = 'ar';
    static HI = 'hi';

    static getLabel(lang: string): string {
        switch (lang) {
            case NgonNguStatuses.VI:
                return 'Tiếng Việt';
            case NgonNguStatuses.EN:
                return 'English';
            case NgonNguStatuses.ZH:
                return '中文 (Chinese)';
            case NgonNguStatuses.JA:
                return '日本語 (Japanese)';
            case NgonNguStatuses.KO:
                return '한국어 (Korean)';
            case NgonNguStatuses.FR:
                return 'Français (French)';
            case NgonNguStatuses.DE:
                return 'Deutsch (German)';
            case NgonNguStatuses.ES:
                return 'Español (Spanish)';
            case NgonNguStatuses.IT:
                return 'Italiano (Italian)';
            case NgonNguStatuses.RU:
                return 'Русский (Russian)';
            case NgonNguStatuses.TH:
                return 'ไทย (Thai)';
            case NgonNguStatuses.ID:
                return 'Bahasa Indonesia';
            case NgonNguStatuses.PT:
                return 'Português (Portuguese)';
            case NgonNguStatuses.AR:
                return 'العربية (Arabic)';
            case NgonNguStatuses.HI:
                return 'हिन्दी (Hindi)';
            default:
                return 'Không xác định';
        }
    }

    static getAllLanguages(): Array<{ value: string; label: string }> {
        return [
            { value: NgonNguStatuses.VI, label: NgonNguStatuses.getLabel(NgonNguStatuses.VI) },
            { value: NgonNguStatuses.EN, label: NgonNguStatuses.getLabel(NgonNguStatuses.EN) },
            { value: NgonNguStatuses.ZH, label: NgonNguStatuses.getLabel(NgonNguStatuses.ZH) },
            { value: NgonNguStatuses.JA, label: NgonNguStatuses.getLabel(NgonNguStatuses.JA) },
            { value: NgonNguStatuses.KO, label: NgonNguStatuses.getLabel(NgonNguStatuses.KO) },
            { value: NgonNguStatuses.FR, label: NgonNguStatuses.getLabel(NgonNguStatuses.FR) },
            { value: NgonNguStatuses.DE, label: NgonNguStatuses.getLabel(NgonNguStatuses.DE) },
            { value: NgonNguStatuses.ES, label: NgonNguStatuses.getLabel(NgonNguStatuses.ES) },
            { value: NgonNguStatuses.IT, label: NgonNguStatuses.getLabel(NgonNguStatuses.IT) },
            { value: NgonNguStatuses.RU, label: NgonNguStatuses.getLabel(NgonNguStatuses.RU) },
            { value: NgonNguStatuses.TH, label: NgonNguStatuses.getLabel(NgonNguStatuses.TH) },
            { value: NgonNguStatuses.ID, label: NgonNguStatuses.getLabel(NgonNguStatuses.ID) },
            { value: NgonNguStatuses.PT, label: NgonNguStatuses.getLabel(NgonNguStatuses.PT) },
            { value: NgonNguStatuses.AR, label: NgonNguStatuses.getLabel(NgonNguStatuses.AR) },
            { value: NgonNguStatuses.HI, label: NgonNguStatuses.getLabel(NgonNguStatuses.HI) }
        ];
    }
}
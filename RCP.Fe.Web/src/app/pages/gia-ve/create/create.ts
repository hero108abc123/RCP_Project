import { ICreateGiaVe } from "@/models/rcp/gia-ve.models";
import { GiaVeService } from "@/service/gia-ve.service";
import { RoomService } from "@/service/room.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { GheStatuses } from "@/shared/constants/ghe.constants";
import { NgayStatuses } from "@/shared/constants/gia-ve.constants";
import { SharedImports } from "@/shared/import.shared";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { Select } from "primeng/select";

@Component({
    selector: 'app-create-rcp',
    imports: [SharedImports, Select],
    templateUrl: './create.html',
    styleUrl: './create.scss'
})
export class CreateGiaVe extends BaseComponent{
    private _ref = inject(DynamicDialogRef);
    private _roomService = inject(RoomService);
    private _giaVeService = inject(GiaVeService);

    override form: FormGroup = new FormGroup({
        giaNgayThuong: new FormControl(null, [Validators.required]),
        giaNgayLe: new FormControl(null, [Validators.required]),
        giaCuoiTuan: new FormControl(null, [Validators.required]),
        hangGhe: new FormControl(null, [Validators.required]),
        trangThaiNgay: new FormControl(null, [Validators.required]),
    });

    override ValidationMessages: Record<string, Record<string, string>> = {
        giaNgayThuong: {
            required: 'Không được bỏ trống'
        },
        giaNgayLe: {
            required: 'Không được bỏ trống'
        },
        giaCuoiTuan: {
            required: 'Không được bỏ trống'
        },
        hangGhe: {
            required: 'Không được bỏ trống'
        },
        trangThaiNgay: {
            required: 'Không được bỏ trống'
        },
    };

    hangGheOptions = [
        { label: GheStatuses.getLabel(GheStatuses.THUONG), value: GheStatuses.THUONG },
        { label: GheStatuses.getLabel(GheStatuses.DOI), value: GheStatuses.DOI }
    ];

    trangThaiNgayOptions = [
        { label: NgayStatuses.getLabel(NgayStatuses.NGAYTHUONG), value: NgayStatuses.NGAYTHUONG },
        { label: NgayStatuses.getLabel(NgayStatuses.CUOITUAN), value: NgayStatuses.CUOITUAN },
        { label: NgayStatuses.getLabel(NgayStatuses.NGAYLE), value: NgayStatuses.NGAYLE }
    ];

    override ngOnInit(): void {
    }

    onSubmit() {
        if (this.isFormInvalid()) {
            return;
        }
        this.onSubmitCreate();
    }

    onSubmitCreate() {
        const formValue = this.form.value;
        
        const body: ICreateGiaVe = {
            giaNgayThuong: String(formValue.giaNgayThuong || 0),
            giaNgayLe: String(formValue.giaNgayLe || 0),
            giaCuoiTuan: String(formValue.giaCuoiTuan || 0),
            hangGhe: Number(formValue.hangGhe) || 0,
            trangThaiNgay: Number(formValue.trangThaiNgay) || 0,
        };

        this.loading = true;
        this._giaVeService.create(body).subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res, true, 'Đã thêm giá vé thành công!')) {
                    this._ref?.close(true);
                }
            },
            error: (err) => {
                this.messageError(err?.message);
            },
            complete: () => {
                this.loading = false;
            }
        });
    }

    onCancel() {
        this._ref.close();
    }
}
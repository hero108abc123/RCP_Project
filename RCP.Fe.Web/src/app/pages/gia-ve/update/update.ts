import { ICreateGiaVe, IUpdateGiaVe, IViewGiaVe } from "@/models/rcp/gia-ve.models";
import { GiaVeService } from "@/service/gia-ve.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { GheStatuses } from "@/shared/constants/ghe.constants";
import { NgayStatuses } from "@/shared/constants/gia-ve.constants";
import { SharedImports } from "@/shared/import.shared";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";
import { Select } from "primeng/select";

@Component({
    selector: 'app-update-gia-ve',
    imports: [SharedImports,Select],
    templateUrl: './update.html',
    styleUrl: './update.scss'
})

export class UpdateGiaVe extends BaseComponent{
    private _ref = inject(DynamicDialogRef);
    private _config = inject(DynamicDialogConfig);
    private _giaVeService = inject(GiaVeService); 
    data: IViewGiaVe | undefined;
    idGiaVe : number = this._config.data?.data.id || 0;
    

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
            this.getById();
        }
    
        onSubmit() {
            if (this.isFormInvalid()) {
                return;
            }
            this.onSubmitUpdate();
        }
    
        onSubmitUpdate() {
            const formValue = this.form.value;
            
            const body: IUpdateGiaVe = {
                id: this.idGiaVe,
                giaNgayThuong: String(formValue.giaNgayThuong || 0),
                giaNgayLe: String(formValue.giaNgayLe || 0),
                giaCuoiTuan: String(formValue.giaCuoiTuan || 0),
                hangGhe: Number(formValue.hangGhe) || 0,
                trangThaiNgay: Number(formValue.trangThaiNgay) || 0,
            };
    
            this.loading = true;
            this._giaVeService.update(body).subscribe({
                next: (res) => {
                    if (this.isResponseSucceed(res, true, 'Đã cập nhật thông tin giá vé thành công!')) {
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

        getById(){
            this.loading = true;
            this._giaVeService.findById(this.idGiaVe).subscribe({
                next: (res) => {
                    if (this.isResponseSucceed(res, false)) {
                        this.data = res.data;
                        this.form.patchValue({
                            giaNgayThuong: this.data?.giaNgayThuong,
                            giaNgayLe: this.data?.giaNgayLe,
                            giaCuoiTuan: this.data?.giaCuoiTuan,
                            hangGhe: this.data?.hangGhe,
                            trangThaiNgay: this.data?.trangThaiNgay,

                        });
                    }
            },
            complete: () => {
                this.loading = false;
            }
        });
    }
            
        
    }
    

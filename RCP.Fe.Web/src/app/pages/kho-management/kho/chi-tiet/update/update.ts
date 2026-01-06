import { IUpdateHang, IViewHang } from "@/models/kho/hang.models";
import { IUpdateNhapHang } from "@/models/kho/kho.models";
import { HangService } from "@/service/hang.service";
import { KhoService } from "@/service/kho.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { SharedImports } from "@/shared/import.shared";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Select } from "primeng/select";

@Component({
    selector: 'app-update-hang-trong-kho',
    imports: [SharedImports,Select],
    templateUrl: './update.html',
    styleUrl: './update.scss'
})

export class UpdateNhapHang extends BaseComponent{
    private _ref = inject(DynamicDialogRef);
    private _khoService = inject(KhoService);
    private _hangService = inject(HangService);
    private _config = inject(DynamicDialogConfig);
    id: number = this._config.data?.data?.id || 0;
    idKho : number = this._config.data?.idKho || 0;
    listMatHang :IViewHang [] = []
    override form: FormGroup = new FormGroup({
        //idKho:new FormControl('', [Validators.required]),
        idMatHang: new FormControl('', [Validators.required]),
        soLuongNhap: new FormControl('', [Validators.required]),
        donGiaNhap: new FormControl('', [Validators.required]),
        
  
        
    });
    override ValidationMessages: Record<string, Record<string, string>> = {
       
        idMatHang: {
            required: 'Không được bỏ trống'
        },
        soLuongNhap: {
            required: 'Không được bỏ trống'
        },
        donGiaNhap: {
            required: 'Không được bỏ trống'
        }
        
    };
    override ngOnInit(): void {
        this.getById();
        this.getListDropDownMatHang();
        
    }onSubmit() {
                if (this.isFormInvalid()) {
                    return;
                }
        
                this.onSubmitUpdate();
        }
    onSubmitUpdate(){
        const body: IUpdateNhapHang= {
                                    id: this.id,
                                    idKho: this.idKho,
                                    idMatHang : this.form.value.idMatHang,
                                    soLuongNhap : this.form.value.soLuongNhap,
                                    donGiaNhap : this.form.value.donGiaNhap,
                                 
                                };
                                this.loading = true;
                                this._khoService.updateNhapHang(body).subscribe({
                                    next: (res) => {
                                        if (this.isResponseSucceed(res, true, 'Đã cập nhật thông tin mặt hàng trong kho  thành công!')) {
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
    getListDropDownMatHang(){
                this.loading = true;
                this._hangService.getDropDown().subscribe({
                    next: (res) => {
                        if (this.isResponseSucceed(res)) {
                            this.listMatHang = res.data || [];
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
    getById(){
        this.loading = true;
        this._khoService.getMatHangTrongKhoById(this.id).subscribe({
        next: (res) => {
            if (this.isResponseSucceed(res)) {
                const data = res.data;
     
                this.form.patchValue({
                    idKho: data.idKho,
                    idMatHang: data.idMatHang,
                    soLuongNhap: data.soLuongNhap,
                    donGiaNhap: data.donGiaNhap
                });
                

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
}
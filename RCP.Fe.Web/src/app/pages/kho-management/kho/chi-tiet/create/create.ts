import { IViewHang } from "@/models/kho/hang.models";
import { ICreateNhapHang } from "@/models/kho/kho.models";
import { HangService } from "@/service/hang.service";
import { KhoService } from "@/service/kho.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { SharedImports } from "@/shared/import.shared";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
    selector: 'app-create-nhap-hang',
    imports: [SharedImports],
    templateUrl: './create.html',
    styleUrl: './create.scss'
})

export class CreateNhapHang extends BaseComponent{
    private _ref = inject(DynamicDialogRef);
    private _khoService = inject(KhoService);
    private _hangService = inject (HangService);

    private _config = inject(DynamicDialogConfig);
    idKho: number = this._config.data?.idKho || 0;
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
        this.getListDropDownMatHang();
        
    }onSubmit() {
                if (this.isFormInvalid()) {
                    return;
                }
        
                this.onSubmitCreate();
        }
        onSubmitCreate() {
                        const body: ICreateNhapHang = {
    
                            idKho: this.idKho,
                            idMatHang : this.form.value.idMatHang,
                            soLuongNhap : this.form.value.soLuongNhap,
                            donGiaNhap : this.form.value.donGiaNhap,
                           
                        };
                        this.loading = true;
                        this._khoService.nhapHang(body).subscribe({
                            next: (res) => {
                                if (this.isResponseSucceed(res, true, 'Đã nhập thêm hàng vào kho thành công!')) {
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
        
    }
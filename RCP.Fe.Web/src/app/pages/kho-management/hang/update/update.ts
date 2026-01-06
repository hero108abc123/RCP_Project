import { IUpdateHang } from "@/models/kho/hang.models";
import { HangService } from "@/service/hang.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { SharedImports } from "@/shared/import.shared";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
    selector: 'app-update-hang',
    imports: [SharedImports],
    templateUrl: './update.html',
    styleUrl: './update.scss'
})

export class UpdateHang extends BaseComponent{
    private _ref = inject(DynamicDialogRef);
    private _config = inject(DynamicDialogConfig);
    private readonly _hangService = inject (HangService);
    id: number = this._config.data?.id || 0;
    override form: FormGroup = new FormGroup({
        tenMon:new FormControl('', [Validators.required]),
        moTa: new FormControl('', [Validators.required]),
        
  
        
    });
    override ValidationMessages: Record<string, Record<string, string>> = {
        tenMon: {
            required: 'Không được bỏ trống'
        }
       
    };
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
                            const body: IUpdateHang = {
                                tenMon: this.form.value.tenMon,
                                moTa: this.form.value.moTa,
                             
                            };
                            this.loading = true;
                            this._hangService.update(body).subscribe({
                                next: (res) => {
                                    if (this.isResponseSucceed(res, true, 'Đã cập nhật thông tin mặt hàng  thành công!')) {
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
    this._hangService.getById(this.id).subscribe({
        next: (res) => {
            if (this.isResponseSucceed(res)) {
                const data = res.data;
     
                this.form.patchValue({
                    tenMon: data.tenMon,
                    moTa: data.moTa,
                    
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

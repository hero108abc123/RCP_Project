import { ICreateHang } from "@/models/kho/hang.models";
import { HangService } from "@/service/hang.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { SharedImports } from "@/shared/import.shared";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
    selector: 'app-create-hang',
    imports: [SharedImports],
    templateUrl: './create.html',
    styleUrl: './create.scss'
})


export class CreateHang extends BaseComponent{
    private _hangService = inject(HangService);
    private _ref = inject(DynamicDialogRef);

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
 
            
        }
        onSubmit() {
                if (this.isFormInvalid()) {
                    return;
                }
        
                this.onSubmitCreate();
        }
        onSubmitCreate() {
                        const body: ICreateHang = {
    
                            tenMon: this.form.value.tenMon,
                            moTa : this.form.value.moTa,
                           
                        };
                        this.loading = true;
                        this._hangService.create(body).subscribe({
                            next: (res) => {
                                if (this.isResponseSucceed(res, true, 'Đã thêm mới hàng thành công!')) {
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

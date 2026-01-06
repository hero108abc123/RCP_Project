import { IAddMonVaoMenu } from "@/models/menu/menu.models";
import { IViewMon } from "@/models/menu/mon.models";
import { MenuService } from "@/service/menu.service";
import { MonService } from "@/service/mon.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { SharedImports } from "@/shared/import.shared";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
    selector: 'app-create-mon-vao-menu',
    imports: [SharedImports],
    templateUrl: './create.html',
    styleUrl: './create.scss'
})
export class CreateMonVaoMenu extends BaseComponent {
    private _ref = inject(DynamicDialogRef);
    private _menuService = inject(MenuService);
    private _monService = inject(MonService);
    private _config = inject(DynamicDialogConfig);
    
    idThucDon: number = this._config.data?.idThucDon || 0;
    listMons: IViewMon[] = [];

    override form: FormGroup = new FormGroup({
        idMon: new FormControl('', [Validators.required]),
        gia: new FormControl('', [Validators.required])
    });

    override ValidationMessages: Record<string, Record<string, string>> = {
        idMon: {
            required: 'Không được bỏ trống'
        },
        gia: {
            required: 'Không được bỏ trống'
        }
    };

    override ngOnInit(): void {
        this.getListDropDownMon();
    }

    onSubmit() {
        if (this.isFormInvalid()) {
            return;
        }
        this.onSubmitCreate();
    }

    onSubmitCreate() {
        const body: IAddMonVaoMenu = {
            idThucDon: this.idThucDon,
            idMon: this.form.value.idMon,
            gia: this.form.value.gia
        };

        this.loading = true;
        this._menuService.addMonVaoMenu(body).subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res, true, 'Đã thêm món vào thực đơn thành công!')) {
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

    getListDropDownMon() {
        this.loading = true;
        this._monService.getDropDown().subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res)) {
                    this.listMons = res.data || [];
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
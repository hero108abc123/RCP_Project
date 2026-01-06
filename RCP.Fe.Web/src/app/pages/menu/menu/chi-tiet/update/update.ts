import { IUpdateMonVao, IViewMon } from "@/models/menu/menu.models";
import { MenuService } from "@/service/menu.service";
import { MonService } from "@/service/mon.service"; // Giả sử bạn có MonService để lấy danh sách món
import { BaseComponent } from "@/shared/components/base/base-component";
import { SharedImports } from "@/shared/import.shared";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Select } from "primeng/select";
import { InputNumber } from "primeng/inputnumber";

@Component({
    selector: 'app-update-mon-vao-menu',
    imports: [SharedImports, Select, InputNumber],
    templateUrl: './update.html',
    styleUrl: './update.scss'
})
export class UpdateMonVaoMenu extends BaseComponent {
    private _ref = inject(DynamicDialogRef);
    private _menuService = inject(MenuService);
    private _monService = inject(MonService);
    private _config = inject(DynamicDialogConfig);
    
    id: number = this._config.data?.data?.id || 0;
    idThucDon: number = this._config.data?.idThucDon || 0;
    listMons: IViewMon[] = [];

    override form: FormGroup = new FormGroup({
        idMon: new FormControl('', [Validators.required]),
        gia: new FormControl('', [Validators.required]),
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
        this.getById();
        this.getListDropDownMon();
    }

    onSubmit() {
        if (this.isFormInvalid()) {
            return;
        }
        this.onSubmitUpdate();
    }

    onSubmitUpdate() {
        const body: IUpdateMonVao = {
            id: this.id,
            idThucDon: this.idThucDon,
            idMon: this.form.value.idMon,
            gia: this.form.value.gia,
        };

        this.loading = true;
        this._menuService.updateMonVaoMenu(body).subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res, true, 'Đã cập nhật món trong thực đơn thành công!')) {
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

    getById() {
        this.loading = true;
        this._menuService.getMonVaoMenuById(this.id).subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res)) {
                    const data = res.data;
                    this.form.patchValue({
                        idMon: data.idMon,
                        gia: data.gia
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
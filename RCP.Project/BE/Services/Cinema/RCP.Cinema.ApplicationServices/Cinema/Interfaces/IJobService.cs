using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Cinema.ApplicationServices.Cinema.Interfaces
{
    public interface IJobService
    {
        public void CronJobUpdateTrangThaiNgayGiaVe();
        public void CronJobUpdateTrangThaiPhim();
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Shared.ApplicationService.Database
{
    public static class DbSchemas
    {
        public const string TableMigrationsHistory = "__EFMigrationsHistory";
        public const string Default = "dbo";
        public const string Authentication = "auth";
        public const string Movie = "movie";
        public const string Cinema = "cinema";
        public const string Core = "core";
    }
}

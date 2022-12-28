
import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'megak_santa_gifts',
    port: 3305,                     //bez tego nie dziala
    namedPlaceholders: true,
    decimalNumbers: true
});

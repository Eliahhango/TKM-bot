const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaVB5VXdrZ0piRVFrZGdPanZCS0t2bmRxcW8yZDAzeS9SZHN3TTJZY3IwMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSHN0Y2hhejQ3L3Q1RU1RbHU4YVEreVpCdERacjZmZm5vQUpOaXdoTVJDWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHRngyUFlRWlJqSVNUVHdLMytDbzlVb3RieHFtdWtVMWZUaEdFaDFSemtNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrUVpsVVVHT2hzbzh1TW1NWng1NDZsVlR4VU1kNDJUb2hVTE05Rm1tdkdNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlLbXpFR2JuWnplUVE5dW4vckxUMnpuMnRJZnN1WTlYelVCTFdKaVVaSEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9hR3JoOVRTVGxjZlhtT3FMbWZvVW9UcTNKZ3d2MEY4VkxXV052RnYwV009In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUl1NXZZQjZlUXdwaVN2dHIxdnZGWC82THhZOWpCYzZ2bTVTTUpMMGJsVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiamhVN2U4NUZRVUR2a0llRWdsR09wa2lMTHA0VVVxdFlZZ0hKZ253aldpND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZNHB0VVhBWUVwT25DSnh1SHJHVk4ySHBGWXhDMk5lcSs5dFhtL3VsalpxY1MwUGM4bnc3bUp3Nlg1azVTSXduRW1obmVmNWFvTlNOeXJuWnVBM0J3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc1LCJhZHZTZWNyZXRLZXkiOiJEcXZ1VnovTTV5MWlaMmY5Yjg0SkJCSXRTRDhpbFRCajN2OXROSmFhN0RzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJQa3QyWEZIQ1RkS2xJZlhPYms3eFVBIiwicGhvbmVJZCI6IjFlMTY3YWIwLTAwNzMtNGIxNC04ODQxLWViZjZiODAyMTE0ZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxakhHZkoxNjVZVy9jaVM0dVlZbW9MaVRSRFk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidlFPeXNQaDZEdUdEM0FiMG5GOWlHMGhPYUhnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkpESDhBNzNEIiwibWUiOnsiaWQiOiIyNTU2ODgxNjQ1MTA6MjVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi2KXZhNmK2KrZitiq2LQg2YjZitiyLiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUDZWaktRSEVJaXU2N1FHR0JRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMUdvNjdzZmdscUVCSzdnb25nL3ZhWWYwZFBtcmhzZ1Q2UEhYUVQ4U0VHWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiQzZxTnBaWVFJRncrS0poOW8yRHllNGdRSzJ1bHFheEJrS29tSkI3YzBlOFV1aDFMUjFBdVYzODVTK1hOTWRsWUp3QTIwcDJ6Ynh4aHZ4V1FTTVNpQVE9PSIsImRldmljZVNpZ25hdHVyZSI6ImdwUjFld3V2dFBCd2x2cEpKbDlsREQ3WEJ6dVBNSkxRcU1mMUpjbmJEUXZUM0k5WWpaVWlLdHNQQVlncm9DR2NmNVRFSjN1ZXF0UVNnb2QvUWZqY0JBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1Njg4MTY0NTEwOjI1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmRScU91N0g0SmFoQVN1NEtKNFA3Mm1IOUhUNXE0YklFK2p4MTBFL0VoQm0ifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjE0MjM2Mzd9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Elitechwiz",
    NUMERO_OWNER : process.env.OWNER_NUM || "255688164510",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

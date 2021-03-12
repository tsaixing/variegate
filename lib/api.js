import {google} from "googleapis";

// CONSTS

const JWT = new google.auth.JWT(
  process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
  ["https://www.googleapis.com/auth/spreadsheets.readonly"]
);
const SHEETS = google.sheets({version: "v4", auth: JWT});

// SHOP

export async function getPlantListData() {
  try {
    const plantListData = await SHEETS.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Shop:List!A2:H",
    });

    const plantListRows = plantListData.data.values;

    if (plantListRows.length) {
      return plantListRows
        .map((row) => ({
          sheetInvStatus: row[0].trim(),
          plantId: row[1].trim(),
          plantKey: row[2].trim(),

          rootType: row[3].trim(),
          listedPrice: row[4].trim(),
          discountedPrice: row[5].trim(),
          listingUrl: row[6] != null ? row[6].trim() : "",
          listingNotes: row[7] != null ? row[7].trim() : "",
        }))
    }
  } catch (err) {
    console.log(err);

  }
  return [];
}

export async function getPlantKeyData() {
  try {
    const plantKeyData = await SHEETS.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "PlantKeys!A2:D",
    });

    const plantKeyMap = plantKeyData.data.values;
    if (plantKeyMap.length) {
      return plantKeyMap
        .map((row) => ({
          plantKey: row[0].trim(),
          commonName: row[1].trim(),
          latinName: row[2].trim(),
          typeImage: row[3].trim(),
        }))
        .reduce((acc, value) =>
            (acc[value.plantKey] = value, acc),
          {}
        )
    }
  } catch (err) {
    console.log(err);
  }

  return [];
}

export async function getStatusMapData() {
  try {
    const statusMapData = await SHEETS.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Mappings!A2:B",
    });

    const statusMap = statusMapData.data.values;

    if (statusMap.length) {
      return statusMap
        .map((row) => ({
          sheetInvStatus: row[0].trim(),
          siteInvStatus: row[1].trim(),
        }))
        .reduce((acc, value) => {
            acc[value.sheetInvStatus] = {siteInvStatus: value.siteInvStatus};
            return acc;
          },
          {}
        )
    }
  } catch (err) {
    console.log(err);
  }

  return [];
}
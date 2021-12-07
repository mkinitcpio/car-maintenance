import { CurrencyEnum } from "../components/settings/currency.enum";

export const currencies = {
  [CurrencyEnum.Rub]: "currency_ruble",
  [CurrencyEnum.Byn]: "BYN",
  [CurrencyEnum.Usd]: "attach_money",
  [CurrencyEnum.Eur]: "euro_symbol",

  // Backward compatibility with < v2.5
  [CurrencyEnum.by]: "BYN",
  [CurrencyEnum.ru]: "currency_ruble",
  [CurrencyEnum.us]: "attach_money",
};
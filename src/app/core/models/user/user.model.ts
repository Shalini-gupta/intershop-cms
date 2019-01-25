export interface User {
  firstName: string;
  lastName: string;
  email: string;
  preferredLanguage: string;

  title?: string;
  phoneHome?: string;
  phoneBusiness?: string;
  phoneMobile?: string;
  fax?: string;
  preferredInvoiceToAddressUrn?: string;
  preferredShipToAddressUrn?: string;
  birthday?: string;

  // Business User only
  businessPartnerNo?: string;
  department?: string;
}